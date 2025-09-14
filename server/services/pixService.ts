import type { Transaction, InsertTransaction } from "@shared/schema";

// PIX API configuration
const PIX_API_URL = process.env.PIX_API_URL || "https://api.lirapaybr.com";

// Check for PIX_API_SECRET - warn if not set
if (!process.env.PIX_API_SECRET) {
  console.warn("⚠️  WARNING: PIX_API_SECRET environment variable is not set.");
  console.warn("⚠️  The PIX payment integration will not work without it.");
  console.warn("⚠️  Please set PIX_API_SECRET in your environment variables.");
}
const PIX_API_SECRET = process.env.PIX_API_SECRET || "";

interface PIXItem {
  id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  is_physical: boolean;
}

interface PIXCustomer {
  name: string;
  email: string;
  phone: string;
  document_type: "CPF" | "CNPJ";
  document: string;
}

interface CreatePIXPaymentRequest {
  external_id: string;
  total_amount: number;
  payment_method: "PIX";
  webhook_url: string;
  items: PIXItem[];
  ip?: string;
  customer: PIXCustomer;
}

interface PIXPaymentResponse {
  id: string;
  external_id: string;
  status: string;
  pix?: {
    payload: string;
  };
  error?: string;
}

export class PIXService {
  private apiUrl: string;
  private apiSecret: string;

  constructor() {
    this.apiUrl = PIX_API_URL;
    this.apiSecret = PIX_API_SECRET;
    
    // Verify API secret is set when service is instantiated
    if (!this.apiSecret) {
      console.error("❌ PIX_API_SECRET is not configured. Payment processing will fail.");
    }
  }

  private async makeRequest(endpoint: string, method: string = "GET", body?: any): Promise<any> {
    // Check if API secret is configured
    if (!this.apiSecret) {
      throw new Error("PIX_API_SECRET is not configured. Please set it in your environment variables.");
    }
    
    try {
      const response = await fetch(`${this.apiUrl}${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          "api-secret": this.apiSecret,
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `API Error: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error("PIX API Error:", error);
      throw error;
    }
  }

  async createTransaction(request: CreatePIXPaymentRequest): Promise<PIXPaymentResponse> {
    try {
      const response = await this.makeRequest("/v1/transactions", "POST", request);
      return response;
    } catch (error) {
      console.error("Error creating PIX transaction:", error);
      throw error;
    }
  }

  async getTransaction(transactionId: string): Promise<PIXPaymentResponse> {
    try {
      const response = await this.makeRequest(`/v1/transactions/${transactionId}`, "GET");
      return response;
    } catch (error) {
      console.error("Error fetching PIX transaction:", error);
      throw error;
    }
  }

  formatCPF(cpf: string): string {
    // Remove all non-numeric characters
    const numbers = cpf.replace(/\D/g, "");
    return numbers;
  }

  determineDocumentType(document: string): "CPF" | "CNPJ" {
    const numbers = document.replace(/\D/g, "");
    return numbers.length <= 11 ? "CPF" : "CNPJ";
  }

  generateExternalId(): string {
    return `order_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  }
}

export const pixService = new PIXService();