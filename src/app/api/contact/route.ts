


// import { NextRequest, NextResponse } from "next/server";
// import nodemailer from "nodemailer";

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { name, email, phone = "", subject, message } = body;

//     if (
//       !name?.trim() ||
//       !email?.trim() ||
//       !subject?.trim() ||
//       !message?.trim()
//     ) {
//       return new Response(
//         JSON.stringify({ success: false, error: "Missing required fields" }),
//         { status: 400, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     const transporter = nodemailer.createTransport({
//       host: "smtp.zoho.in",
//       port: 465,
//       secure: true,
//       auth: {
//         user: process.env.ZOHO_EMAIL,
//         pass: process.env.ZOHO_PASSWORD,
//       },
//       tls: {
//         rejectUnauthorized: false,
//       },
//     });

//     /* ── 1. Internal inquiry notification ─────────────────────────── */
//     await transporter.sendMail({
//       from: `"Website Contact" <${process.env.ZOHO_EMAIL}>`,
//       to: process.env.ZOHO_EMAIL,
//       replyTo: email,
//       subject: `New Inquiry: ${subject}`,
//       html: `
//         <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f5f0e8;padding:30px;border-radius:12px;">
//           <h2 style="color:#1a1a2e;margin:0 0 20px;">New Contact Inquiry</h2>
//           <table style="width:100%;border-collapse:collapse;">
//             <tr><td style="padding:8px 0;color:#666;width:100px;">Name</td><td style="padding:8px 0;color:#1a1a2e;font-weight:bold;">${name}</td></tr>
//             <tr><td style="padding:8px 0;color:#666;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#e63946;">${email}</a></td></tr>
//             <tr><td style="padding:8px 0;color:#666;">Phone</td><td style="padding:8px 0;color:#1a1a2e;">${phone || "Not provided"}</td></tr>
//             <tr><td style="padding:8px 0;color:#666;">Subject</td><td style="padding:8px 0;color:#1a1a2e;font-weight:bold;">${subject}</td></tr>
//           </table>
//           <div style="margin-top:20px;padding:16px;background:#fff;border-radius:8px;border-left:4px solid #e63946;">
//             <p style="margin:0;color:#444;line-height:1.7;">${message.replace(/\n/g, "<br>")}</p>
//           </div>
//         </div>
//       `,
//     });

//     /* ── 2. Premium auto-reply to user ────────────────────────────── */
//     const year = new Date().getFullYear();

//     await transporter.sendMail({
//       from: `"Alwafa Fruits" <${process.env.ZOHO_EMAIL}>`,
//       to: email,
//       subject: `We've received your enquiry — Alwafa Fruits`,
//       // ✅ Inline attachment: logo fetched from URL and embedded via cid:alwafa_logo
//       attachments: [
//         {
//           filename: "logoo.png",
//           path: "https://www.alwafafruits.com/logoo.png",
//           cid: "alwafa_logo", // must match src="cid:alwafa_logo" in the HTML below
//         },
//       ],
//       html: `
// <!DOCTYPE html>
// <html lang="en" xmlns="http://www.w3.org/1999/xhtml">
// <head>
//   <meta charset="UTF-8" />
//   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//   <meta http-equiv="X-UA-Compatible" content="IE=edge" />
//   <title>Thank You — Alwafa Fruits</title>
//   <!--[if mso]>
//   <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
//   <![endif]-->
//   <style>
//     @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;500;600;700&display=swap');
//     * { box-sizing: border-box; margin: 0; padding: 0; }
//     body { margin: 0; padding: 0; background-color: #f0ebe0; -webkit-font-smoothing: antialiased; }
//     table { border-spacing: 0; border-collapse: collapse; }
//     td { padding: 0; }
//     img { border: 0; display: block; }
//     a { text-decoration: none; }
//     @media only screen and (max-width: 620px) {
//       .email-wrapper { width: 100% !important; padding: 12px !important; }
//       .main-card { border-radius: 16px !important; }
//       .hero-pad { padding: 36px 24px 32px !important; }
//       .body-pad { padding: 32px 24px !important; }
//       .footer-pad { padding: 24px 20px !important; }
//       .stat-cell { display: block !important; width: 100% !important; text-align: center !important; padding: 12px 0 !important; }
//       .stat-divider { display: none !important; }
//       .info-row td { display: block !important; width: 100% !important; padding-bottom: 12px !important; }
//     }
//   </style>
// </head>
// <body style="margin:0;padding:0;background-color:#f0ebe0;">

//   <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0ebe0;">
//     <tr>
//       <td class="email-wrapper" align="center" style="padding:32px 16px;">

//         <table class="main-card" role="presentation" width="100%" style="max-width:600px;background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 8px 48px rgba(26,26,46,0.12);">

//           <!-- ── HERO HEADER ─────────────────────────────────────────── -->
//           <tr>
//             <td class="hero-pad" style="background:linear-gradient(145deg,#1a1a2e 0%,#12122a 60%,#0e0e22 100%);padding:48px 40px 40px;text-align:center;">

//               <div style="width:60px;height:3px;background:#e63946;border-radius:2px;margin:0 auto 28px;"></div>

//               <!-- ✅ Logo using cid: inline attachment — works in all major email clients -->
//               <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 20px;">
//                 <tr>
//                   <td style="background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);border-radius:16px;padding:14px 24px;text-align:center;">
//                     <img
//                       src="cid:alwafa_logo"
//                       alt="Alwafa Fruits"
//                       width="140"
//                       height="auto"
//                       style="display:block;height:auto;max-width:140px;min-width:80px;"
//                     />
//                   </td>
//                 </tr>
//               </table>

//               <p style="font-family:'Inter',Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.3em;text-transform:uppercase;color:#e63946;margin:0 0 14px;">
//                 · Message Received ·
//               </p>

//               <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:32px;font-weight:900;color:#ffffff;line-height:1.2;margin:0 0 12px;">
//                 Thank you,<br /><em style="color:#e8d5b0;">${name.split(" ")[0]}.</em>
//               </h1>

//               <p style="font-family:'Inter',Arial,sans-serif;font-size:14px;color:rgba(255,255,255,0.55);line-height:1.7;margin:0 auto;max-width:380px;">
//                 We've received your enquiry and our team will be in touch with you personally — usually within a few hours.
//               </p>

//               <div style="margin-top:36px;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent);"></div>
//             </td>
//           </tr>

//           <!-- ── ENQUIRY SUMMARY BOX ─────────────────────────────────── -->
//           <tr>
//             <td style="padding:0 40px;">
//               <table role="presentation" width="100%">
//                 <tr>
//                   <td style="background:#f8f4ed;border:1px solid #e8e0d4;border-top:0;border-radius:0 0 16px 16px;padding:24px 28px;">
//                     <p style="font-family:'Inter',Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;color:#9a9aaa;margin:0 0 14px;">
//                       Your Enquiry
//                     </p>
//                     <table class="info-row" role="presentation" width="100%" cellpadding="0" cellspacing="0">
//                       <tr>
//                         <td style="font-family:'Inter',Arial,sans-serif;font-size:12px;color:#9a9aaa;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;padding:5px 0;width:90px;">Subject</td>
//                         <td style="font-family:'Inter',Arial,sans-serif;font-size:14px;color:#1a1a2e;font-weight:700;padding:5px 0;">${subject}</td>
//                       </tr>
//                       ${
//                         phone
//                           ? `
//                       <tr>
//                         <td style="font-family:'Inter',Arial,sans-serif;font-size:12px;color:#9a9aaa;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;padding:5px 0;">Phone</td>
//                         <td style="font-family:'Inter',Arial,sans-serif;font-size:14px;color:#1a1a2e;padding:5px 0;">${phone}</td>
//                       </tr>`
//                           : ""
//                       }
//                       <tr>
//                         <td style="font-family:'Inter',Arial,sans-serif;font-size:12px;color:#9a9aaa;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;padding:5px 0;">Reply to</td>
//                         <td style="font-family:'Inter',Arial,sans-serif;font-size:14px;color:#e63946;padding:5px 0;">${email}</td>
//                       </tr>
//                     </table>
//                   </td>
//                 </tr>
//               </table>
//             </td>
//           </tr>

//           <!-- ── BODY CONTENT ───────────────────────────────────────── -->
//           <tr>
//             <td class="body-pad" style="padding:40px 40px 32px;">

//               <p style="font-family:'Inter',Arial,sans-serif;font-size:16px;color:#3a3a4a;line-height:1.8;margin:0 0 20px;">
//                 Dear <strong style="color:#1a1a2e;">${name}</strong>,
//               </p>
//               <p style="font-family:'Inter',Arial,sans-serif;font-size:15px;color:#5a5a6a;line-height:1.85;margin:0 0 20px;">
//                 We've received your message and it's already with the right person on our team. At Alwafa Fruits, every enquiry matters — whether you're looking for a wholesale supply agreement, exploring our cold-chain logistics, or discovering something seasonal and rare.
//               </p>
//               <p style="font-family:'Inter',Arial,sans-serif;font-size:15px;color:#5a5a6a;line-height:1.85;margin:0 0 32px;">
//                 You can expect a personal response from us — not a template — tailored to exactly what you've asked. We'll be in touch very shortly.
//               </p>

//               <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 32px;">
//                 <tr><td style="height:1px;background:linear-gradient(90deg,transparent,#e8e0d4,transparent);"></td></tr>
//               </table>

//               <p style="font-family:'Inter',Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;color:#9a9aaa;margin:0 0 18px;">
//                 What Happens Next
//               </p>

//               <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
//                 <tr>
//                   <td style="width:36px;vertical-align:top;padding-top:2px;">
//                     <div style="width:28px;height:28px;background:#1a1a2e;border-radius:50%;text-align:center;line-height:28px;font-family:'Inter',Arial,sans-serif;font-size:11px;font-weight:800;color:#e63946;">01</div>
//                   </td>
//                   <td style="padding:0 0 20px 12px;">
//                     <p style="font-family:'Inter',Arial,sans-serif;font-size:14px;font-weight:700;color:#1a1a2e;margin:0 0 3px;">Our team reviews your message</p>
//                     <p style="font-family:'Inter',Arial,sans-serif;font-size:13px;color:#7a7a8a;line-height:1.6;margin:0;">We read every enquiry personally and match it to the right specialist.</p>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style="width:36px;vertical-align:top;padding-top:2px;">
//                     <div style="width:28px;height:28px;background:#e63946;border-radius:50%;text-align:center;line-height:28px;font-family:'Inter',Arial,sans-serif;font-size:11px;font-weight:800;color:#ffffff;">02</div>
//                   </td>
//                   <td style="padding:0 0 20px 12px;">
//                     <p style="font-family:'Inter',Arial,sans-serif;font-size:14px;font-weight:700;color:#1a1a2e;margin:0 0 3px;">You receive a personal response</p>
//                     <p style="font-family:'Inter',Arial,sans-serif;font-size:13px;color:#7a7a8a;line-height:1.6;margin:0;">A dedicated response to your specific enquiry — typically within 2–4 business hours.</p>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style="width:36px;vertical-align:top;padding-top:2px;">
//                     <div style="width:28px;height:28px;background:#1a1a2e;border-radius:50%;text-align:center;line-height:28px;font-family:'Inter',Arial,sans-serif;font-size:11px;font-weight:800;color:#e63946;">03</div>
//                   </td>
//                   <td style="padding:0 0 8px 12px;">
//                     <p style="font-family:'Inter',Arial,sans-serif;font-size:14px;font-weight:700;color:#1a1a2e;margin:0 0 3px;">We get to work</p>
//                     <p style="font-family:'Inter',Arial,sans-serif;font-size:13px;color:#7a7a8a;line-height:1.6;margin:0;">From sourcing to scheduling, we make the next step as smooth as possible for you.</p>
//                   </td>
//                 </tr>
//               </table>

//               <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:32px 0;">
//                 <tr><td style="height:1px;background:linear-gradient(90deg,transparent,#e8e0d4,transparent);"></td></tr>
//               </table>

//               <!-- Stats strip -->
//               <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8f4ed;border-radius:14px;overflow:hidden;">
//                 <tr>
//                   <td class="stat-cell" align="center" style="padding:20px 0;width:33.333%;">
//                     <p style="font-family:'Playfair Display',Georgia,serif;font-size:26px;font-weight:900;color:#e63946;margin:0 0 4px;">300+</p>
//                     <p style="font-family:'Inter',Arial,sans-serif;font-size:11px;font-weight:600;color:#9a9aaa;text-transform:uppercase;letter-spacing:0.12em;margin:0;">Premium Products</p>
//                   </td>
//                   <td class="stat-divider" style="width:1px;background:#e8e0d4;padding:0;"></td>
//                   <td class="stat-cell" align="center" style="padding:20px 0;width:33.333%;">
//                     <p style="font-family:'Playfair Display',Georgia,serif;font-size:26px;font-weight:900;color:#e63946;margin:0 0 4px;">25+</p>
//                     <p style="font-family:'Inter',Arial,sans-serif;font-size:11px;font-weight:600;color:#9a9aaa;text-transform:uppercase;letter-spacing:0.12em;margin:0;">Source Countries</p>
//                   </td>
//                   <td class="stat-divider" style="width:1px;background:#e8e0d4;padding:0;"></td>
//                   <td class="stat-cell" align="center" style="padding:20px 0;width:33.333%;">
//                     <p style="font-family:'Playfair Display',Georgia,serif;font-size:26px;font-weight:900;color:#e63946;margin:0 0 4px;">24h</p>
//                     <p style="font-family:'Inter',Arial,sans-serif;font-size:11px;font-weight:600;color:#9a9aaa;text-transform:uppercase;letter-spacing:0.12em;margin:0;">Delivery Standard</p>
//                   </td>
//                 </tr>
//               </table>

//             </td>
//           </tr>

//           <!-- ── SIGNATURE CARD ──────────────────────────────────────── -->
//           <tr>
//             <td style="padding:0 40px 40px;">
//               <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#1a1a2e;border-radius:16px;overflow:hidden;">
//                 <tr>
//                   <td style="padding:28px 28px 24px;">

//                     <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
//                       <tr>
//                         <td style="vertical-align:top;">
//                           <p style="font-family:'Playfair Display',Georgia,serif;font-size:18px;font-weight:700;color:#ffffff;margin:0 0 3px;">Azeez Ahmed</p>
//                           <p style="font-family:'Inter',Arial,sans-serif;font-size:12px;color:#8a8aaa;margin:0 0 2px;">General Manager</p>
//                           <p style="font-family:'Inter',Arial,sans-serif;font-size:12px;font-weight:700;color:#e63946;letter-spacing:0.05em;text-transform:uppercase;margin:0;">Alwafa Fruits · Dubai, UAE</p>
//                         </td>
//                         <td style="vertical-align:top;text-align:right;width:48px;">
//                           <div style="width:40px;height:40px;background:rgba(230,57,70,0.15);border:1px solid rgba(230,57,70,0.3);border-radius:10px;text-align:center;line-height:40px;font-family:'Playfair Display',Georgia,serif;font-size:16px;font-weight:900;color:#e63946;">A</div>
//                         </td>
//                       </tr>
//                     </table>

//                     <div style="height:1px;background:rgba(255,255,255,0.07);margin:18px 0;"></div>

//                     <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
//                       <tr>
//                         <td style="padding:4px 0;">
//                           <a href="tel:+971526995266" style="font-family:'Inter',Arial,sans-serif;font-size:13px;color:rgba(255,255,255,0.6);text-decoration:none;">
//                             <span style="color:#e63946;margin-right:8px;">📞</span>+971 52 699 5266
//                           </a>
//                         </td>
//                         <td style="padding:4px 0;text-align:right;">
//                           <a href="tel:+971553316210" style="font-family:'Inter',Arial,sans-serif;font-size:13px;color:rgba(255,255,255,0.6);text-decoration:none;">
//                             <span style="color:#e63946;margin-right:8px;">📞</span>+971 55 331 6210
//                           </a>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td style="padding:4px 0;" colspan="2">
//                           <a href="mailto:hello@alwafafruits.com" style="font-family:'Inter',Arial,sans-serif;font-size:13px;color:rgba(255,255,255,0.6);text-decoration:none;">
//                             <span style="color:#e63946;margin-right:8px;">✉️</span>hello@alwafafruits.com
//                           </a>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td style="padding:4px 0;" colspan="2">
//                           <p style="font-family:'Inter',Arial,sans-serif;font-size:13px;color:rgba(255,255,255,0.4);margin:0;">
//                             <span style="color:#e63946;margin-right:8px;">📍</span>Citadel Tower, Business Bay, Plot No.62 Office 2105-E-505, Dubai, United Arab Emirates
//                           </p>
//                         </td>
//                       </tr>
//                     </table>

//                     <div style="margin-top:20px;text-align:center;">
//                       <a href="https://alwafafruits.com" style="display:inline-block;padding:12px 32px;background:#e63946;color:#ffffff;font-family:'Inter',Arial,sans-serif;font-size:13px;font-weight:700;border-radius:50px;text-decoration:none;letter-spacing:0.05em;">
//                         Visit alwafafruits.com →
//                       </a>
//                     </div>

//                   </td>
//                 </tr>
//               </table>
//             </td>
//           </tr>

//           <!-- ── FOOTER ─────────────────────────────────────────────── -->
//           <tr>
//             <td class="footer-pad" style="background:#f8f4ed;border-top:1px solid #e8e0d4;padding:28px 40px;text-align:center;">
//               <div style="height:1px;background:#e8e0d4;margin:0 0 16px;"></div>
//               <p style="font-family:'Inter',Arial,sans-serif;font-size:11px;color:#b0b0b8;line-height:1.7;margin:0 0 6px;">
//                 © ${year} Rooh Al Wafa Trading LLC. All rights reserved.
//               </p>
//               <p style="font-family:'Inter',Arial,sans-serif;font-size:11px;color:#c8bfb2;font-style:italic;margin:0;">
//                 Farm-fresh produce, delivered with care — across Dubai and beyond.
//               </p>
//             </td>
//           </tr>

//         </table>

//       </td>
//     </tr>
//   </table>

// </body>
// </html>
//       `,
//     });

//     return new Response(JSON.stringify({ success: true }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     const message =
//       error instanceof Error ? error.message : "Failed to send email";
//     console.error("Contact API Error:", message);
//     return new Response(JSON.stringify({ success: false, error: message }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }



import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone = "", subject, message } = body;

    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
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
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f1f8e9;padding:30px;border-radius:12px;">
          <h2 style="color:#1b5e20;margin:0 0 20px;">New Contact Inquiry</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#666;width:100px;">Name</td><td style="padding:8px 0;color:#1a1a1a;font-weight:bold;">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#666;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#388e3c;">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#666;">Phone</td><td style="padding:8px 0;color:#1a1a1a;">${phone || "Not provided"}</td></tr>
            <tr><td style="padding:8px 0;color:#666;">Subject</td><td style="padding:8px 0;color:#1a1a1a;font-weight:bold;">${subject}</td></tr>
          </table>
          <div style="margin-top:20px;padding:16px;background:#fff;border-radius:8px;border-left:4px solid #7cb342;">
            <p style="margin:0;color:#444;line-height:1.7;">${message.replace(/\n/g, "<br>")}</p>
          </div>
        </div>
      `,
    });

    /* ── 2. Premium auto-reply to user ────────────────────────────── */
    const year = new Date().getFullYear();
    const firstName = name.split(" ")[0];

    await transporter.sendMail({
      from: `"Alwafa Fruits" <${process.env.ZOHO_EMAIL}>`,
      to: email,
      subject: `We've received your enquiry — Alwafa Fruits`,
      attachments: [
        {
          filename: "logoo.png",
          path: "https://www.alwafafruits.com/logoo.png",
          cid: "alwafa_logo",
        },
      ],
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
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,600;0,800;1,300;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { margin: 0; padding: 0; background-color: #eef5ec; -webkit-font-smoothing: antialiased; }
    table { border-spacing: 0; border-collapse: collapse; }
    td { padding: 0; }
    img { border: 0; display: block; }
    a { text-decoration: none; }
    @media only screen and (max-width: 620px) {
      .email-wrapper { padding: 12px !important; }
      .hero-pad { padding: 36px 24px 32px !important; }
      .body-pad { padding: 28px 24px !important; }
      .summary-pad { padding: 0 24px !important; }
      .sig-wrap-pad { padding: 0 24px 28px !important; }
      .footer-pad { padding: 20px 24px !important; }
      .fruit-strip-pad { padding: 18px 24px !important; }
      .stat-cell { display: block !important; width: 100% !important; text-align: center !important; }
      .stat-divider { display: none !important; }
      .summary-cell { display: block !important; width: 100% !important; border-left: none !important; border-top: 1px solid #dcedc8 !important; }
      .summary-cell:first-child { border-top: none !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#eef5ec;">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eef5ec;">
  <tr>
    <td class="email-wrapper" align="center" style="padding:32px 16px;">

      <table role="presentation" width="100%" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 40px rgba(0,0,0,0.08);">

        <!-- ── HERO ──────────────────────────────────────────────────── -->
        <tr>
          <td class="hero-pad" style="background:linear-gradient(135deg,#1b5e20 0%,#2e7d32 40%,#388e3c 70%,#43a047 100%);padding:52px 44px 44px;position:relative;">

            <!-- Gradient accent bar -->
            <div style="position:absolute;top:0;left:0;width:100%;height:4px;background:linear-gradient(90deg,#ffb300,#ff6f00,#e53935,#ffb300);"></div>

            <!-- Logo -->
            <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 32px;">
              <tr>
                <td style="background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.25);border-radius:12px;padding:10px 18px;">
                  <img
                    src="cid:alwafa_logo"
                    alt="Alwafa Fruits"
                    width="140"
                    height="auto"
                    style="display:block;height:auto;max-width:140px;"
                  />
                </td>
              </tr>
            </table>

            <!-- Badge -->
            <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 18px;">
              <tr>
                <td style="background:rgba(255,179,0,0.2);border:1px solid rgba(255,179,0,0.4);border-radius:20px;padding:5px 14px;">
                  <p style="font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:11px;font-weight:500;letter-spacing:0.12em;text-transform:uppercase;color:#ffe082;margin:0;">
                    ● &nbsp;Enquiry Received
                  </p>
                </td>
              </tr>
            </table>

            <!-- Headline -->
            <h1 style="font-family:'Fraunces',Georgia,serif;font-size:40px;font-weight:800;color:#ffffff;line-height:1.15;margin:0 0 10px;">
              Thank you,<br /><em style="font-style:italic;color:#a5d6a7;">${firstName}.</em>
            </h1>

            <p style="font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:14px;font-weight:300;color:rgba(255,255,255,0.72);line-height:1.75;margin:0;max-width:380px;">
              Your message is with us. We'll be in touch personally — usually within a few hours.
            </p>

          </td>
        </tr>

        <!-- ── SUMMARY BAND ───────────────────────────────────────────── -->
        <tr>
          <td class="summary-pad" style="background:#f1f8e9;border-top:3px solid #7cb342;padding:0 44px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #dcedc8;border-top:none;border-radius:0 0 12px 12px;overflow:hidden;">
              <tr>
                <td class="summary-cell" style="padding:18px 16px;border-right:1px solid #dcedc8;width:33.333%;">
                  <p style="font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:10px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:#8bc34a;margin:0 0 5px;">Subject</p>
                  <p style="font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:13px;font-weight:500;color:#1b5e20;margin:0;">${subject}</p>
                </td>
                <td class="summary-cell" style="padding:18px 16px;border-right:1px solid #dcedc8;width:33.333%;">
                  <p style="font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:10px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:#8bc34a;margin:0 0 5px;">Reply to</p>
                  <p style="font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:13px;font-weight:500;color:#388e3c;margin:0;">${email}</p>
                </td>
                <td class="summary-cell" style="padding:18px 16px;width:33.333%;">
                  <p style="font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:10px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:#8bc34a;margin:0 0 5px;">Phone</p>
                  <p style="font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:13px;font-weight:500;color:#1b5e20;margin:0;">${phone || "Not provided"}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ── BODY ───────────────────────────────────────────────────── -->
        <tr>
          <td class="body-pad" style="padding:40px 44px 32px;">

            <p style="font-family:'Fraunces',Georgia,serif;font-size:22px;font-weight:600;color:#1a1a1a;margin:0 0 14px;">Dear ${name},</p>

            <p style="font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:14px;font-weight:300;color:#555555;line-height:1.85;margin:0 0 14px;">
              We've received your message and it's already with the right person on our team. At <strong style="font-weight:600;color:#1b5e20;">Alwafa Fruits</strong>, every enquiry matters — whether you're exploring a wholesale supply agreement, our cold-chain logistics, or something seasonal and rare.
            </p>
            <p style="font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:14px;font-weight:300;color:#555555;line-height:1.85;margin:0 0 28px;">
              You can expect a personal response — not a template — tailored to exactly what you've asked. We'll be in touch very shortly.
            </p>

            <!-- Divider -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
              <tr><td style="height:1px;background:linear-gradient(90deg,transparent,#dcedc8,transparent);"></td></tr>
            </table>

            <!-- Steps label -->
            <p style="font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:10px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:#8bc34a;margin:0 0 20px;">
              What Happens Next
            </p>

            <!-- Step 01 -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 18px;">
              <tr>
                <td style="width:34px;vertical-align:top;">
                  <div style="width:34px;height:34px;background:#e8f5e9;border-radius:8px;text-align:center;line-height:34px;font-family:'Fraunces',Georgia,serif;font-size:14px;font-weight:700;color:#2e7d32;">01</div>
                </td>
                <td style="padding-left:14px;">
                  <p style="font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:14px;font-weight:600;color:#1a1a1a;margin:0 0 3px;">Our team reviews your message</p>
                  <p style="font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:13px;font-weight:300;color:#888888;line-height:1.6;margin:0;">We read every enquiry personally and route it to the right specialist.</p>
                </td>
              </tr>
            </table>

            <!-- Step 02 -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 18px;">
              <tr>
                <td style="width:34px;vertical-align:top;">
                  <div style="width:34px;height:34px;background:#fff3e0;border-radius:8px;text-align:center;line-height:34px;font-family:'Fraunces',Georgia,serif;font-size:14px;font-weight:700;color:#e65100;">02</div>
                </td>
                <td style="padding-left:14px;">
                  <p style="font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:14px;font-weight:600;color:#1a1a1a;margin:0 0 3px;">You receive a personal response</p>
                  <p style="font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:13px;font-weight:300;color:#888888;line-height:1.6;margin:0;">A dedicated reply tailored to your enquiry — typically within 2–4 business hours.</p>
                </td>
              </tr>
            </table>

            <!-- Step 03 -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
              <tr>
                <td style="width:34px;vertical-align:top;">
                  <div style="width:34px;height:34px;background:#fce4ec;border-radius:8px;text-align:center;line-height:34px;font-family:'Fraunces',Georgia,serif;font-size:14px;font-weight:700;color:#c62828;">03</div>
                </td>
                <td style="padding-left:14px;">
                  <p style="font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:14px;font-weight:600;color:#1a1a1a;margin:0 0 3px;">We get to work</p>
                  <p style="font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:13px;font-weight:300;color:#888888;line-height:1.6;margin:0;">From sourcing to scheduling, we make every next step smooth for you.</p>
                </td>
              </tr>
            </table>

            <!-- Divider -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 0;">
              <tr><td style="height:1px;background:linear-gradient(90deg,transparent,#dcedc8,transparent);"></td></tr>
            </table>

            <!-- Stats strip -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0 0;border:1px solid #dcedc8;border-radius:12px;overflow:hidden;">
              <tr>
                <td class="stat-cell" align="center" style="padding:20px 8px;background:#f1f8e9;width:33.333%;border-right:1px solid #dcedc8;">
                  <p style="font-family:'Fraunces',Georgia,serif;font-size:28px;font-weight:800;color:#1b5e20;margin:0 0 5px;">300+</p>
                  <p style="font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:10px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#999999;margin:0;">Products</p>
                </td>
                <td class="stat-divider" style="width:1px;background:#dcedc8;padding:0;"></td>
                <td class="stat-cell" align="center" style="padding:20px 8px;background:#fff8e1;width:33.333%;border-right:1px solid #dcedc8;">
                  <p style="font-family:'Fraunces',Georgia,serif;font-size:28px;font-weight:800;color:#e65100;margin:0 0 5px;">25+</p>
                  <p style="font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:10px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#999999;margin:0;">Countries</p>
                </td>
                <td class="stat-divider" style="width:1px;background:#dcedc8;padding:0;"></td>
                <td class="stat-cell" align="center" style="padding:20px 8px;background:#fce4ec;width:33.333%;">
                  <p style="font-family:'Fraunces',Georgia,serif;font-size:28px;font-weight:800;color:#c62828;margin:0 0 5px;">24h</p>
                  <p style="font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:10px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#999999;margin:0;">Delivery</p>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- ── FRUIT STRIP ─────────────────────────────────────────────── -->
        <tr>
          <td class="fruit-strip-pad" style="background:linear-gradient(135deg,#ffb300 0%,#ff6f00 35%,#e53935 70%,#c62828 100%);padding:20px 44px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="font-family:'Fraunces',Georgia,serif;font-size:18px;font-weight:600;color:#ffffff;font-style:italic;">
                  Fresh from farm to your door
                </td>
                <td align="right" style="font-size:22px;letter-spacing:6px;">
                  🍊🍇🥭🍓
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ── SIGNATURE ───────────────────────────────────────────────── -->
        <tr>
          <td class="sig-wrap-pad" style="padding:28px 44px 36px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#1b5e20;border-radius:14px;overflow:hidden;">

              <tr>
                <td style="padding:24px 28px 18px;">
                  <p style="font-family:'Fraunces',Georgia,serif;font-size:20px;font-weight:700;color:#ffffff;margin:0 0 2px;">Azeez Ahmed</p>
                  <p style="font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:12px;font-weight:300;color:rgba(255,255,255,0.6);margin:0 0 1px;">General Manager</p>
                  <p style="font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#a5d6a7;margin:0;">Alwafa Fruits · Dubai, UAE</p>
                </td>
              </tr>

              <tr>
                <td style="height:1px;background:rgba(255,255,255,0.1);"></td>
              </tr>

              <tr>
                <td style="padding:18px 28px 22px;">
                  <p style="font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:12px;font-weight:300;color:rgba(255,255,255,0.65);margin:0 0 6px;">
                    <span style="color:#81c784;margin-right:8px;">✆</span>+971 52 699 5266 &nbsp;&nbsp;
                    <span style="color:#81c784;margin-right:8px;">✆</span>+971 55 331 6210
                  </p>
                  <p style="font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:12px;font-weight:300;color:rgba(255,255,255,0.65);margin:0 0 6px;">
                    <span style="color:#81c784;margin-right:8px;">✉</span>hello@alwafafruits.com
                  </p>
                  <p style="font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:12px;font-weight:300;color:rgba(255,255,255,0.65);margin:0 0 18px;">
                    <span style="color:#81c784;margin-right:8px;">⌖</span>Citadel Tower, Business Bay, Office 2105-E-505, Dubai, UAE
                  </p>
                  <table role="presentation" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="background:#ffb300;border-radius:8px;">
                        <a href="https://alwafafruits.com" style="display:inline-block;padding:13px 36px;font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#1b5e20;text-decoration:none;">
                          Visit alwafafruits.com →
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

            </table>
          </td>
        </tr>

        <!-- ── FOOTER ──────────────────────────────────────────────────── -->
        <tr>
          <td class="footer-pad" style="background:#f9fbe7;border-top:1px solid #dcedc8;padding:22px 44px;text-align:center;">
            <p style="font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:11px;font-weight:300;color:#aaaaaa;line-height:1.7;margin:0 0 4px;">
              © ${year} Rooh Al Wafa Trading LLC. All rights reserved.
            </p>
            <p style="font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:11px;font-weight:300;color:#aaaaaa;line-height:1.7;font-style:italic;margin:0;">
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
    const message = error instanceof Error ? error.message : "Failed to send email";
    console.error("Contact API Error:", message);
    return new Response(JSON.stringify({ success: false, error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}