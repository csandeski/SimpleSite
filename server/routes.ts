import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { pixService } from "./services/pixService";
import { z } from "zod";
import QRCode from "qrcode";

// Webhook authentication
const WEBHOOK_SECRET = process.env.PIX_WEBHOOK_SECRET || 'default_webhook_secret_change_in_production';

// Validation schemas
const createPaymentSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(10),
  document: z.string().min(11),
  items: z.array(z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    price: z.number(),
    quantity: z.number(),
  })),
  totalAmount: z.number(),
  utmParams: z.record(z.string()).optional(), // UTM parameters from Facebook/Google ads
});

export async function registerRoutes(app: Express): Promise<Server> {
  // PIX Payment endpoints
  
  // Create a new PIX payment
  app.post("/api/pix/create-payment", async (req, res) => {
    try {
      // Validate request body
      const validatedData = createPaymentSchema.parse(req.body);
      
      // Generate external ID
      const externalId = pixService.generateExternalId();
      
      // Get client IP (take first IP if multiple)
      const forwardedIps = req.headers['x-forwarded-for'] as string || '';
      const clientIp = forwardedIps.split(',')[0].trim() || req.socket.remoteAddress || '127.0.0.1';
      
      // Prepare customer object with UTM parameters
      const customer: any = {
        name: validatedData.fullName,
        email: validatedData.email,
        phone: validatedData.phone.replace(/\D/g, ''),
        document_type: pixService.determineDocumentType(validatedData.document),
        document: pixService.formatCPF(validatedData.document),
      };
      
      // Add UTM parameters to customer object if they exist
      if (validatedData.utmParams && Object.keys(validatedData.utmParams).length > 0) {
        // Map UTM parameters to LiraPay expected format
        if (validatedData.utmParams.utm_source) customer.utm_source = validatedData.utmParams.utm_source;
        if (validatedData.utmParams.utm_medium) customer.utm_medium = validatedData.utmParams.utm_medium;
        if (validatedData.utmParams.utm_campaign) customer.utm_campaign = validatedData.utmParams.utm_campaign;
        if (validatedData.utmParams.utm_content) customer.utm_content = validatedData.utmParams.utm_content;
        if (validatedData.utmParams.utm_term) customer.utm_term = validatedData.utmParams.utm_term;
        
        console.log('UTM Parameters being sent to LiraPay (in customer object):', {
          utm_source: customer.utm_source,
          utm_medium: customer.utm_medium,
          utm_campaign: customer.utm_campaign,
          utm_content: customer.utm_content,
          utm_term: customer.utm_term,
        });
      }
      
      // Prepare PIX API request
      const pixRequest = {
        external_id: externalId,
        total_amount: validatedData.totalAmount,
        payment_method: "PIX" as const,
        webhook_url: `${process.env.APP_URL || 'https://webhook.site/unique-id'}/api/pix/webhook`,
        items: validatedData.items.map(item => ({
          ...item,
          is_physical: false,
        })),
        ip: clientIp,
        customer: customer,
      };

      // Create transaction in PIX API
      const pixResponse = await pixService.createTransaction(pixRequest);
      
      // Generate QR Code from PIX payload
      let pixQrCode = null;
      if (pixResponse.pix?.payload) {
        try {
          pixQrCode = await QRCode.toDataURL(pixResponse.pix.payload, {
            width: 300,
            margin: 1,
            color: {
              dark: '#000000',
              light: '#FFFFFF'
            }
          });
        } catch (error) {
          console.error("Error generating QR Code:", error);
        }
      }

      // Store transaction in our database with UTM parameters
      const transaction = await storage.createTransaction({
        external_id: externalId,
        api_transaction_id: pixResponse.id,
        status: pixResponse.status || "PENDING",
        total_amount: String(validatedData.totalAmount),
        pix_payload: pixResponse.pix?.payload || null,
        customer_name: validatedData.fullName,
        customer_email: validatedData.email,
        customer_phone: validatedData.phone,
        customer_document: validatedData.document,
        items: JSON.stringify(validatedData.items),
        utm_params: validatedData.utmParams ? JSON.stringify(validatedData.utmParams) : null,
      });

      res.json({
        success: true,
        transaction: {
          id: transaction.id,
          externalId: transaction.external_id,
          status: transaction.status,
          pixPayload: transaction.pix_payload,
          pixQrCode: pixQrCode,
          totalAmount: transaction.total_amount,
        },
      });
    } catch (error: any) {
      console.error("Error creating PIX payment:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: "Invalid request data",
          details: error.errors,
        });
      }
      
      res.status(500).json({
        success: false,
        error: error.message || "Failed to create payment",
      });
    }
  });

  // Get transaction status
  app.get("/api/pix/transaction/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      // Try to get from our database first
      const transaction = await storage.getTransaction(id);
      
      if (!transaction) {
        return res.status(404).json({
          success: false,
          error: "Transaction not found",
        });
      }

      // If we have an API transaction ID, fetch latest status from PIX API
      if (transaction.api_transaction_id) {
        try {
          const pixTransaction = await pixService.getTransaction(transaction.api_transaction_id);
          
          // Update our database with latest status
          if (pixTransaction.status !== transaction.status) {
            await storage.updateTransaction(id, {
              status: pixTransaction.status,
            });
            transaction.status = pixTransaction.status;
          }
        } catch (apiError) {
          console.error("Error fetching from PIX API:", apiError);
          // Continue with cached data if API fails
        }
      }

      // Generate QR Code from PIX payload
      let pixQrCode = null;
      if (transaction.pix_payload) {
        try {
          pixQrCode = await QRCode.toDataURL(transaction.pix_payload, {
            width: 300,
            margin: 1,
            color: {
              dark: '#000000',
              light: '#FFFFFF'
            }
          });
        } catch (error) {
          console.error("Error generating QR Code:", error);
        }
      }

      res.json({
        success: true,
        transaction: {
          id: transaction.id,
          externalId: transaction.external_id,
          status: transaction.status,
          pixPayload: transaction.pix_payload,
          pixQrCode: pixQrCode,
          totalAmount: transaction.total_amount,
          createdAt: transaction.created_at,
        },
      });
    } catch (error: any) {
      console.error("Error getting transaction:", error);
      res.status(500).json({
        success: false,
        error: error.message || "Failed to get transaction",
      });
    }
  });

  // Webhook endpoint for payment status updates
  app.post("/api/pix/webhook", async (req, res) => {
    try {
      // Validate webhook secret
      const providedSecret = req.headers['x-webhook-secret'] as string;
      if (providedSecret !== WEBHOOK_SECRET) {
        console.error("Invalid webhook secret provided");
        return res.status(401).json({
          success: false,
          error: "Unauthorized",
        });
      }

      console.log("Webhook received:", req.body);
      
      const { external_id, status, transaction_id } = req.body;
      
      if (!external_id || !status) {
        return res.status(400).json({
          success: false,
          error: "Missing required webhook data",
        });
      }

      // Find transaction by external ID
      const transaction = await storage.getTransactionByExternalId(external_id);
      
      if (!transaction) {
        console.error("Transaction not found for external ID:", external_id);
        return res.status(404).json({
          success: false,
          error: "Transaction not found",
        });
      }

      // Update transaction status
      await storage.updateTransaction(transaction.id, {
        status,
        api_transaction_id: transaction_id || transaction.api_transaction_id,
      });

      console.log(`Transaction ${transaction.id} updated to status: ${status}`);
      
      res.json({
        success: true,
        message: "Webhook processed successfully",
      });
    } catch (error: any) {
      console.error("Error processing webhook:", error);
      res.status(500).json({
        success: false,
        error: error.message || "Failed to process webhook",
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
