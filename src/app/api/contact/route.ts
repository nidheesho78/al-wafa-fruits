



import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ─────────────────────────────────────────────────────────────────────────────
// LOGO NOTE:
// Replace LOGO_URL below with a publicly accessible URL, e.g.:
//   • Vercel:     "https://<your-domain>/alwafa.png"   ← put file in /public
//   • Cloudinary: "https://res.cloudinary.com/<cloud>/image/upload/alwafa.png"
//   • ImgBB:       direct link from imgbb.com
//
// OR convert the PNG to base64 and use:
//   src="data:image/png;base64,<base64string>"
// ─────────────────────────────────────────────────────────────────────────────
const LOGO_URL = "https://alwafafruits.com/alwafa.png"; // ← swap this

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone = "", subject, message } = body;

    if (
      !name?.trim() ||
      !email?.trim() ||
      !subject?.trim() ||
      !message?.trim()
    ) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.in",
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZOHO_EMAIL,
        pass: process.env.ZOHO_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    /* ── 1. Internal inquiry notification ─────────────────────────── */
    await transporter.sendMail({
      from: `"Website Contact" <${process.env.ZOHO_EMAIL}>`,
      to: process.env.ZOHO_EMAIL,
      replyTo: email,
      subject: `New Inquiry: ${subject}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f5f0e8;padding:30px;border-radius:12px;">
          <h2 style="color:#1a1a2e;margin:0 0 20px;">New Contact Inquiry</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#666;width:100px;">Name</td><td style="padding:8px 0;color:#1a1a2e;font-weight:bold;">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#666;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#e63946;">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#666;">Phone</td><td style="padding:8px 0;color:#1a1a2e;">${phone || "Not provided"}</td></tr>
            <tr><td style="padding:8px 0;color:#666;">Subject</td><td style="padding:8px 0;color:#1a1a2e;font-weight:bold;">${subject}</td></tr>
          </table>
          <div style="margin-top:20px;padding:16px;background:#fff;border-radius:8px;border-left:4px solid #e63946;">
            <p style="margin:0;color:#444;line-height:1.7;">${message.replace(/\n/g, "<br>")}</p>
          </div>
        </div>
      `,
    });

    /* ── 2. Premium auto-reply to user ────────────────────────────── */
    const year = new Date().getFullYear();

    await transporter.sendMail({
      from: `"Alwafa Fruits" <${process.env.ZOHO_EMAIL}>`,
      to: email,
      subject: `We've received your enquiry — Alwafa Fruits`,
      html: `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Thank You — Alwafa Fruits</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;500;600;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { margin: 0; padding: 0; background-color: #f0ebe0; -webkit-font-smoothing: antialiased; }
    table { border-spacing: 0; border-collapse: collapse; }
    td { padding: 0; }
    img { border: 0; display: block; }
    a { text-decoration: none; }
    @media only screen and (max-width: 620px) {
      .email-wrapper { width: 100% !important; padding: 12px !important; }
      .main-card { border-radius: 16px !important; }
      .hero-pad { padding: 36px 24px 32px !important; }
      .body-pad { padding: 32px 24px !important; }
      .footer-pad { padding: 24px 20px !important; }
      .stat-cell { display: block !important; width: 100% !important; text-align: center !important; padding: 12px 0 !important; }
      .stat-divider { display: none !important; }
      .info-row td { display: block !important; width: 100% !important; padding-bottom: 12px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f0ebe0;">

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0ebe0;">
    <tr>
      <td class="email-wrapper" align="center" style="padding:32px 16px;">

        <table class="main-card" role="presentation" width="100%" style="max-width:600px;background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 8px 48px rgba(26,26,46,0.12);">

          <!-- ── HERO HEADER ─────────────────────────────────────────── -->
          <tr>
            <td class="hero-pad" style="background:linear-gradient(145deg,#1a1a2e 0%,#12122a 60%,#0e0e22 100%);padding:48px 40px 40px;text-align:center;">

              <div style="width:60px;height:3px;background:#e63946;border-radius:2px;margin:0 auto 28px;"></div>

              <!-- Logo container with text fallback -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 20px;">
                <tr>
                  <td style="background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);border-radius:16px;padding:14px 24px;text-align:center;">
                    <!--[if !mso]><!-->
                    <img
                      src="${LOGO_URL}"
                      alt="Alwafa Fruits"
                      width="140"
                      height="auto"
                      style="display:block;height:auto;max-width:140px;min-width:80px;"
                      onerror="this.style.display='none';this.nextElementSibling.style.display='block';"
                    />
                    <!--<![endif]-->
                    <!-- Fallback text logo shown if image fails -->
                    <div style="display:none;font-family:'Playfair Display',Georgia,serif;font-size:22px;font-weight:900;color:#ffffff;letter-spacing:0.04em;white-space:nowrap;">
                      <span style="color:#e63946;">✦</span> Alwafa Fruits
                    </div>
                  </td>
                </tr>
              </table>

              <p style="font-family:'Inter',Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.3em;text-transform:uppercase;color:#e63946;margin:0 0 14px;">
                · Message Received ·
              </p>

              <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:32px;font-weight:900;color:#ffffff;line-height:1.2;margin:0 0 12px;">
                Thank you,<br /><em style="color:#e8d5b0;">${name.split(" ")[0]}.</em>
              </h1>

              <p style="font-family:'Inter',Arial,sans-serif;font-size:14px;color:rgba(255,255,255,0.55);line-height:1.7;margin:0 auto;max-width:380px;">
                We've received your enquiry and our team will be in touch with you personally — usually within a few hours.
              </p>

              <div style="margin-top:36px;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent);"></div>
            </td>
          </tr>

          <!-- ── ENQUIRY SUMMARY BOX ─────────────────────────────────── -->
          <tr>
            <td style="padding:0 40px;">
              <table role="presentation" width="100%">
                <tr>
                  <td style="background:#f8f4ed;border:1px solid #e8e0d4;border-top:0;border-radius:0 0 16px 16px;padding:24px 28px;">
                    <p style="font-family:'Inter',Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;color:#9a9aaa;margin:0 0 14px;">
                      Your Enquiry
                    </p>
                    <table class="info-row" role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-family:'Inter',Arial,sans-serif;font-size:12px;color:#9a9aaa;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;padding:5px 0;width:90px;">Subject</td>
                        <td style="font-family:'Inter',Arial,sans-serif;font-size:14px;color:#1a1a2e;font-weight:700;padding:5px 0;">${subject}</td>
                      </tr>
                      ${
                        phone
                          ? `
                      <tr>
                        <td style="font-family:'Inter',Arial,sans-serif;font-size:12px;color:#9a9aaa;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;padding:5px 0;">Phone</td>
                        <td style="font-family:'Inter',Arial,sans-serif;font-size:14px;color:#1a1a2e;padding:5px 0;">${phone}</td>
                      </tr>`
                          : ""
                      }
                      <tr>
                        <td style="font-family:'Inter',Arial,sans-serif;font-size:12px;color:#9a9aaa;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;padding:5px 0;">Reply to</td>
                        <td style="font-family:'Inter',Arial,sans-serif;font-size:14px;color:#e63946;padding:5px 0;">${email}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── BODY CONTENT ───────────────────────────────────────── -->
          <tr>
            <td class="body-pad" style="padding:40px 40px 32px;">

              <p style="font-family:'Inter',Arial,sans-serif;font-size:16px;color:#3a3a4a;line-height:1.8;margin:0 0 20px;">
                Dear <strong style="color:#1a1a2e;">${name}</strong>,
              </p>
              <p style="font-family:'Inter',Arial,sans-serif;font-size:15px;color:#5a5a6a;line-height:1.85;margin:0 0 20px;">
                We've received your message and it's already with the right person on our team. At Alwafa Fruits, every enquiry matters — whether you're looking for a wholesale supply agreement, exploring our cold-chain logistics, or discovering something seasonal and rare.
              </p>
              <p style="font-family:'Inter',Arial,sans-serif;font-size:15px;color:#5a5a6a;line-height:1.85;margin:0 0 32px;">
                You can expect a personal response from us — not a template — tailored to exactly what you've asked. We'll be in touch very shortly.
              </p>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 32px;">
                <tr><td style="height:1px;background:linear-gradient(90deg,transparent,#e8e0d4,transparent);"></td></tr>
              </table>

              <p style="font-family:'Inter',Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;color:#9a9aaa;margin:0 0 18px;">
                What Happens Next
              </p>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="width:36px;vertical-align:top;padding-top:2px;">
                    <div style="width:28px;height:28px;background:#1a1a2e;border-radius:50%;text-align:center;line-height:28px;font-family:'Inter',Arial,sans-serif;font-size:11px;font-weight:800;color:#e63946;">01</div>
                  </td>
                  <td style="padding:0 0 20px 12px;">
                    <p style="font-family:'Inter',Arial,sans-serif;font-size:14px;font-weight:700;color:#1a1a2e;margin:0 0 3px;">Our team reviews your message</p>
                    <p style="font-family:'Inter',Arial,sans-serif;font-size:13px;color:#7a7a8a;line-height:1.6;margin:0;">We read every enquiry personally and match it to the right specialist.</p>
                  </td>
                </tr>
                <tr>
                  <td style="width:36px;vertical-align:top;padding-top:2px;">
                    <div style="width:28px;height:28px;background:#e63946;border-radius:50%;text-align:center;line-height:28px;font-family:'Inter',Arial,sans-serif;font-size:11px;font-weight:800;color:#ffffff;">02</div>
                  </td>
                  <td style="padding:0 0 20px 12px;">
                    <p style="font-family:'Inter',Arial,sans-serif;font-size:14px;font-weight:700;color:#1a1a2e;margin:0 0 3px;">You receive a personal response</p>
                    <p style="font-family:'Inter',Arial,sans-serif;font-size:13px;color:#7a7a8a;line-height:1.6;margin:0;">A dedicated response to your specific enquiry — typically within 2–4 business hours.</p>
                  </td>
                </tr>
                <tr>
                  <td style="width:36px;vertical-align:top;padding-top:2px;">
                    <div style="width:28px;height:28px;background:#1a1a2e;border-radius:50%;text-align:center;line-height:28px;font-family:'Inter',Arial,sans-serif;font-size:11px;font-weight:800;color:#e63946;">03</div>
                  </td>
                  <td style="padding:0 0 8px 12px;">
                    <p style="font-family:'Inter',Arial,sans-serif;font-size:14px;font-weight:700;color:#1a1a2e;margin:0 0 3px;">We get to work</p>
                    <p style="font-family:'Inter',Arial,sans-serif;font-size:13px;color:#7a7a8a;line-height:1.6;margin:0;">From sourcing to scheduling, we make the next step as smooth as possible for you.</p>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:32px 0;">
                <tr><td style="height:1px;background:linear-gradient(90deg,transparent,#e8e0d4,transparent);"></td></tr>
              </table>

              <!-- Stats strip -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8f4ed;border-radius:14px;overflow:hidden;">
                <tr>
                  <td class="stat-cell" align="center" style="padding:20px 0;width:33.333%;">
                    <p style="font-family:'Playfair Display',Georgia,serif;font-size:26px;font-weight:900;color:#e63946;margin:0 0 4px;">300+</p>
                    <p style="font-family:'Inter',Arial,sans-serif;font-size:11px;font-weight:600;color:#9a9aaa;text-transform:uppercase;letter-spacing:0.12em;margin:0;">Premium Products</p>
                  </td>
                  <td class="stat-divider" style="width:1px;background:#e8e0d4;padding:0;"></td>
                  <td class="stat-cell" align="center" style="padding:20px 0;width:33.333%;">
                    <p style="font-family:'Playfair Display',Georgia,serif;font-size:26px;font-weight:900;color:#e63946;margin:0 0 4px;">25+</p>
                    <p style="font-family:'Inter',Arial,sans-serif;font-size:11px;font-weight:600;color:#9a9aaa;text-transform:uppercase;letter-spacing:0.12em;margin:0;">Source Countries</p>
                  </td>
                  <td class="stat-divider" style="width:1px;background:#e8e0d4;padding:0;"></td>
                  <td class="stat-cell" align="center" style="padding:20px 0;width:33.333%;">
                    <p style="font-family:'Playfair Display',Georgia,serif;font-size:26px;font-weight:900;color:#e63946;margin:0 0 4px;">24h</p>
                    <p style="font-family:'Inter',Arial,sans-serif;font-size:11px;font-weight:600;color:#9a9aaa;text-transform:uppercase;letter-spacing:0.12em;margin:0;">Delivery Standard</p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ── SIGNATURE CARD ──────────────────────────────────────── -->
          <tr>
            <td style="padding:0 40px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#1a1a2e;border-radius:16px;overflow:hidden;">
                <tr>
                  <td style="padding:28px 28px 24px;">

                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="vertical-align:top;">
                          <p style="font-family:'Playfair Display',Georgia,serif;font-size:18px;font-weight:700;color:#ffffff;margin:0 0 3px;">Azeez Ahmed</p>
                          <p style="font-family:'Inter',Arial,sans-serif;font-size:12px;color:#8a8aaa;margin:0 0 2px;">General Manager</p>
                          <p style="font-family:'Inter',Arial,sans-serif;font-size:12px;font-weight:700;color:#e63946;letter-spacing:0.05em;text-transform:uppercase;margin:0;">Alwafa Fruits · Dubai, UAE</p>
                        </td>
                        <td style="vertical-align:top;text-align:right;width:48px;">
                          <div style="width:40px;height:40px;background:rgba(230,57,70,0.15);border:1px solid rgba(230,57,70,0.3);border-radius:10px;text-align:center;line-height:40px;font-family:'Playfair Display',Georgia,serif;font-size:16px;font-weight:900;color:#e63946;">A</div>
                        </td>
                      </tr>
                    </table>

                    <div style="height:1px;background:rgba(255,255,255,0.07);margin:18px 0;"></div>

                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:4px 0;">
                          <a href="tel:+971526995266" style="font-family:'Inter',Arial,sans-serif;font-size:13px;color:rgba(255,255,255,0.6);text-decoration:none;">
                            <span style="color:#e63946;margin-right:8px;">📞</span>+971 52 699 5266
                          </a>
                        </td>
                        <td style="padding:4px 0;text-align:right;">
                          <a href="tel:+971553316210" style="font-family:'Inter',Arial,sans-serif;font-size:13px;color:rgba(255,255,255,0.6);text-decoration:none;">
                            <span style="color:#e63946;margin-right:8px;">📞</span>+971 55 331 6210
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:4px 0;" colspan="2">
                          <a href="mailto:hello@alwafafruits.com" style="font-family:'Inter',Arial,sans-serif;font-size:13px;color:rgba(255,255,255,0.6);text-decoration:none;">
                            <span style="color:#e63946;margin-right:8px;">✉️</span>hello@alwafafruits.com
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:4px 0;" colspan="2">
                          <p style="font-family:'Inter',Arial,sans-serif;font-size:13px;color:rgba(255,255,255,0.4);margin:0;">
                            <span style="color:#e63946;margin-right:8px;">📍</span>Citadel Tower, Business Bay, Plot No.62 Office 2105-E-505, Dubai, United Arab Emirates
                          </p>
                        </td>
                      </tr>
                    </table>

                    <div style="margin-top:20px;text-align:center;">
                      <a href="https://alwafafruits.com" style="display:inline-block;padding:12px 32px;background:#e63946;color:#ffffff;font-family:'Inter',Arial,sans-serif;font-size:13px;font-weight:700;border-radius:50px;text-decoration:none;letter-spacing:0.05em;">
                        Visit alwafafruits.com →
                      </a>
                    </div>

                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── FOOTER ─────────────────────────────────────────────── -->
          <tr>
            <td class="footer-pad" style="background:#f8f4ed;border-top:1px solid #e8e0d4;padding:28px 40px;text-align:center;">
              <div style="height:1px;background:#e8e0d4;margin:0 0 16px;"></div>
              <p style="font-family:'Inter',Arial,sans-serif;font-size:11px;color:#b0b0b8;line-height:1.7;margin:0 0 6px;">
                © ${year} Rooh Al Wafa Foodstuff Trading LLC. All rights reserved.
              </p>
              <p style="font-family:'Inter',Arial,sans-serif;font-size:11px;color:#c8bfb2;font-style:italic;margin:0;">
                Farm-fresh produce, delivered with care — across Dubai and beyond.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to send email";
    console.error("Contact API Error:", message);
    return new Response(JSON.stringify({ success: false, error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}