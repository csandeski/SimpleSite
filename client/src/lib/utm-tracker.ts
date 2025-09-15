// UTM tracking utilities
export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  utm_id?: string;
  fbclid?: string; // Facebook Click ID
  gclid?: string; // Google Click ID
  [key: string]: string | undefined; // Allow any other tracking parameters
}

const UTM_STORAGE_KEY = 'utm_params';
const UTM_EXPIRY_HOURS = 24; // Store UTMs for 24 hours

// Capture UTMs from current URL and store them
export function captureUTMs(): UTMParams {
  const urlParams = new URLSearchParams(window.location.search);
  const utms: UTMParams = {};
  
  // Capture all parameters that start with utm_ or are tracking IDs
  urlParams.forEach((value, key) => {
    if (key.startsWith('utm_') || 
        key === 'fbclid' || 
        key === 'gclid' || 
        key.includes('_id') ||
        key.includes('_source')) {
      utms[key] = value;
    }
  });
  
  // Only store if we have UTMs
  if (Object.keys(utms).length > 0) {
    const storageData = {
      params: utms,
      timestamp: Date.now()
    };
    
    try {
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(storageData));
      localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(storageData));
    } catch (error) {
      console.error('Error storing UTMs:', error);
    }
  }
  
  return utms;
}

// Get stored UTMs (from session or local storage)
export function getStoredUTMs(): UTMParams {
  try {
    // Try session storage first (current session)
    let storageData = sessionStorage.getItem(UTM_STORAGE_KEY);
    
    // Fallback to local storage
    if (!storageData) {
      storageData = localStorage.getItem(UTM_STORAGE_KEY);
    }
    
    if (storageData) {
      const parsed = JSON.parse(storageData);
      
      // Check if UTMs are still valid (not expired)
      const expiryTime = UTM_EXPIRY_HOURS * 60 * 60 * 1000;
      if (Date.now() - parsed.timestamp < expiryTime) {
        return parsed.params || {};
      } else {
        // Clear expired UTMs
        clearStoredUTMs();
      }
    }
  } catch (error) {
    console.error('Error retrieving UTMs:', error);
  }
  
  return {};
}

// Clear stored UTMs
export function clearStoredUTMs(): void {
  try {
    sessionStorage.removeItem(UTM_STORAGE_KEY);
    localStorage.removeItem(UTM_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing UTMs:', error);
  }
}

// Format UTMs for API submission
export function formatUTMsForAPI(): Record<string, string> {
  const utms = getStoredUTMs();
  const formatted: Record<string, string> = {};
  
  // Convert all UTM parameters to API format
  Object.keys(utms).forEach(key => {
    const value = utms[key];
    if (value) {
      formatted[key] = value;
    }
  });
  
  return formatted;
}

// Initialize UTM tracking on app load
export function initializeUTMTracking(): void {
  // Capture UTMs from current URL
  const currentUTMs = captureUTMs();
  
  // If no UTMs in URL, check if we have stored ones
  if (Object.keys(currentUTMs).length === 0) {
    const storedUTMs = getStoredUTMs();
    if (Object.keys(storedUTMs).length > 0) {
      console.log('Using stored UTMs:', storedUTMs);
    }
  } else {
    console.log('Captured new UTMs:', currentUTMs);
  }
}