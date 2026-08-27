/**
 * Notification API client — calls server-side /api routes for Resend email and Twilio SMS
 */

interface SendEmailParams {
  to: string;
  studentName: string;
  studentId: string;
  email: string;
  password?: string;
  setupLink?: string;
}

interface SendSmsParams {
  to: string;
  studentName: string;
  studentId: string;
  password?: string;
}

interface ApiResponse {
  success: boolean;
  error?: string;
  emailId?: string;
  messageSid?: string;
}

export async function sendWelcomeEmail(params: SendEmailParams): Promise<ApiResponse> {
  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });

    const data = await response.json();
    return data as ApiResponse;
  } catch (err: any) {
    return { success: false, error: err.message || "Network error — is the API server running?" };
  }
}

export async function sendWelcomeSms(params: SendSmsParams): Promise<ApiResponse> {
  try {
    const response = await fetch("/api/send-sms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });

    const data = await response.json();
    return data as ApiResponse;
  } catch (err: any) {
    return { success: false, error: err.message || "Network error — is the API server running?" };
  }
}
