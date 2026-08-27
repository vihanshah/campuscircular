import { Router, Request, Response } from "express";
import { Resend } from "resend";
import twilio from "twilio";

const router = Router();

// ─── Resend Email Endpoint ──────────────────────────────────────────────────
router.post("/send-email", async (req: Request, res: Response) => {
  try {
    const { to, studentName, studentId, email, password, setupLink } = req.body;

    if (!to || !studentName || !studentId) {
      res.status(400).json({ success: false, error: "Missing required fields: to, studentName, studentId" });
      return;
    }

    const apiKey = process.env.RESEND_API_KEY || process.env.VITE_RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL || "Campus Circular <onboarding@resend.dev>";

    if (!apiKey || apiKey === "re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx") {
      res.status(500).json({ success: false, error: "RESEND_API_KEY not configured in .env" });
      return;
    }

    const resend = new Resend(apiKey);

    const htmlContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 520px; margin: 0 auto; background: #FFFDF7; border: 1px solid #e5e2d9; border-radius: 24px; overflow: hidden;">
        <!-- Header -->
        <div style="background: #151515; padding: 28px 32px; text-align: center;">
          <div style="display: inline-block; background: #FFD928; width: 44px; height: 44px; border-radius: 14px; line-height: 44px; font-size: 20px; font-weight: 900; color: #151515; margin-bottom: 12px;">♻</div>
          <h1 style="margin: 0; color: #FFFDF7; font-size: 22px; font-weight: 900; letter-spacing: -0.5px;">CAMPUS CIRCULAR</h1>
          <p style="margin: 4px 0 0; color: #FFFDF7; opacity: 0.6; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;">Trusted Resource Sharing</p>
        </div>

        <!-- Body -->
        <div style="padding: 32px;">
          <h2 style="margin: 0 0 8px; font-size: 20px; font-weight: 900; color: #151515;">Welcome to Campus Circular!</h2>
          <p style="margin: 0 0 20px; font-size: 14px; color: #151515; opacity: 0.7; line-height: 1.6;">
            Hi <strong>${studentName}</strong>, your campus account has been created by your administrator. Here are your login credentials:
          </p>

          <!-- Credentials Card -->
          <div style="background: #F3EFE6; border: 1px solid rgba(21,21,21,0.08); border-radius: 16px; padding: 20px; margin-bottom: 20px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
              <tr>
                <td style="padding: 6px 0; color: #151515; opacity: 0.6; font-weight: 700;">Student ID</td>
                <td style="padding: 6px 0; color: #151515; font-weight: 900; text-align: right; font-family: monospace;">${studentId}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #151515; opacity: 0.6; font-weight: 700;">Email</td>
                <td style="padding: 6px 0; color: #151515; font-weight: 900; text-align: right;">${email}</td>
              </tr>
              ${password ? `
              <tr>
                <td style="padding: 6px 0; color: #151515; opacity: 0.6; font-weight: 700;">Password</td>
                <td style="padding: 6px 0; color: #151515; font-weight: 900; text-align: right; font-family: monospace; letter-spacing: 1px;">${password}</td>
              </tr>
              ` : ""}
            </table>
          </div>

          ${setupLink ? `
          <a href="${setupLink}" style="display: block; text-align: center; background: #FFD928; color: #151515; font-size: 14px; font-weight: 900; text-decoration: none; padding: 14px 24px; border-radius: 16px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 20px;">
            Set Up Your Account →
          </a>
          ` : `
          <a href="#" style="display: block; text-align: center; background: #FFD928; color: #151515; font-size: 14px; font-weight: 900; text-decoration: none; padding: 14px 24px; border-radius: 16px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 20px;">
            Sign In Now →
          </a>
          `}

          <p style="margin: 0; font-size: 12px; color: #151515; opacity: 0.5; line-height: 1.5;">
            Please change your password after your first login. If you did not expect this email, contact your campus administrator.
          </p>
        </div>

        <!-- Footer -->
        <div style="background: #F3EFE6; padding: 16px 32px; text-align: center; border-top: 1px solid rgba(21,21,21,0.06);">
          <p style="margin: 0; font-size: 11px; color: #151515; opacity: 0.4; font-weight: 600;">
            Campus Circular — Zero Waste, Verified Trust
          </p>
        </div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [to],
      subject: `Your Campus Circular Account — ${studentName}`,
      html: htmlContent,
    });

    if (error) {
      console.error("[Resend Error]", error);
      res.status(400).json({ success: false, error: error.message || "Failed to send email via Resend" });
      return;
    }

    console.log(`[Resend] Email sent to ${to} — ID: ${data?.id}`);
    res.json({ success: true, emailId: data?.id });
  } catch (err: any) {
    console.error("[Resend Exception]", err);
    res.status(500).json({ success: false, error: err.message || "Internal server error" });
  }
});

// ─── Twilio SMS Endpoint ────────────────────────────────────────────────────
router.post("/send-sms", async (req: Request, res: Response) => {
  try {
    const { to, studentName, studentId, password } = req.body;

    if (!to || !studentName || !studentId) {
      res.status(400).json({ success: false, error: "Missing required fields: to, studentName, studentId" });
      return;
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID || process.env.VITE_TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN || process.env.VITE_TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_FROM_NUMBER || process.env.VITE_TWILIO_FROM_NUMBER;

    if (!accountSid || accountSid === "your_sid_here" || !authToken || authToken === "your_token_here") {
      res.status(500).json({ success: false, error: "TWILIO credentials not configured in .env" });
      return;
    }

    if (!fromNumber || fromNumber === "+1XXXXXXXXXX") {
      res.status(500).json({ success: false, error: "TWILIO_FROM_NUMBER not configured in .env" });
      return;
    }

    // Auto-format E.164 phone number
    let formattedPhone = to.toString().trim().replace(/[^\d+]/g, "");
    if (!formattedPhone.startsWith("+")) {
      if (formattedPhone.length === 10) {
        formattedPhone = `+91${formattedPhone}`; // Default to India country code (+91) for 10-digit numbers
      } else {
        formattedPhone = `+${formattedPhone}`;
      }
    }

    const client = twilio(accountSid, authToken);

    const messageBody = [
      `Campus Circular — Welcome, ${studentName}!`,
      ``,
      `Your account has been created.`,
      `Student ID: ${studentId}`,
      password ? `Password: ${password}` : "",
      ``,
      `Sign in at your campus portal to get started.`,
      `Change your password after first login.`,
    ]
      .filter(Boolean)
      .join("\n");

    const message = await client.messages.create({
      body: messageBody,
      from: fromNumber,
      to: formattedPhone,
    });

    console.log(`[Twilio] SMS sent to ${formattedPhone} — SID: ${message.sid}`);
    res.json({ success: true, messageSid: message.sid });
  } catch (err: any) {
    console.error("[Twilio Exception]", err);
    res.status(400).json({ success: false, error: err.message || err.moreInfo || "Failed to send SMS via Twilio" });
  }
});

export default router;
