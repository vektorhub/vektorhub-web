import nodemailer from "nodemailer";

interface EmailOptions {
  to: string;
  subject: string;
  type: "message" | "status_change" | "document_added" | "request_received";
  data: Record<string, string>;
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const emailTemplates = {
  message: (data: Record<string, string>) => `
    <html dir="ltr">
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 5px; }
          .content { background: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 5px; }
          .cta { display: inline-block; background: #667eea; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; }
          .footer { font-size: 12px; color: #999; border-top: 1px solid #ddd; padding-top: 20px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Yeni Mesaj Alındı</h2>
          </div>
          <div class="content">
            <p>Merhaba <strong>${data.customerName}</strong>,</p>
            <p>Talep <strong>#${data.referenceNumber}</strong> üzerine yeni bir mesaj alındı:</p>
            <blockquote style="background: white; padding: 15px; border-left: 4px solid #667eea; margin: 15px 0;">
              <strong>${data.senderName}:</strong><br/>
              ${data.message}
            </blockquote>
            <p>
              <a href="${data.portalUrl}" class="cta">Panelde Görüntüle</a>
            </p>
          </div>
          <div class="footer">
            <p>Vektörhub Müşteri Portalı tarafından gönderilen otomatik bildirimdir.</p>
          </div>
        </div>
      </body>
    </html>
  `,

  status_change: (data: Record<string, string>) => `
    <html dir="ltr">
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 20px; border-radius: 5px; }
          .content { background: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 5px; }
          .status-badge { display: inline-block; background: #f5576c; color: white; padding: 5px 10px; border-radius: 3px; font-weight: bold; }
          .cta { display: inline-block; background: #f5576c; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Talep Durumu Değiştirildi</h2>
          </div>
          <div class="content">
            <p>Merhaba <strong>${data.customerName}</strong>,</p>
            <p>Talep <strong>#${data.referenceNumber}</strong> durumu güncellenmiştir:</p>
            <p style="margin: 15px 0;">
              Yeni Durum: <span class="status-badge">${data.newStatus}</span>
            </p>
            <p>${data.reason || "Durumunuz hakkında daha fazla bilgi için paneli ziyaret edin."}</p>
            <p>
              <a href="${data.portalUrl}" class="cta">Detayları Görüntüle</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `,

  document_added: (data: Record<string, string>) => `
    <html dir="ltr">
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 20px; border-radius: 5px; }
          .content { background: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 5px; }
          .document-box { background: white; border: 1px solid #ddd; padding: 10px; border-radius: 5px; margin: 10px 0; }
          .cta { display: inline-block; background: #00f2fe; color: #333; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Yeni Doküman Eklendi</h2>
          </div>
          <div class="content">
            <p>Merhaba <strong>${data.customerName}</strong>,</p>
            <p>Talep <strong>#${data.referenceNumber}</strong> için yeni bir doküman eklendi:</p>
            <div class="document-box">
              <strong>📄 ${data.fileName}</strong><br/>
              Tür: ${data.docType}
            </div>
            <p>
              <a href="${data.portalUrl}" class="cta">Dokümanı İndir</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `,

  request_received: (data: Record<string, string>) => `
    <html dir="ltr">
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); color: white; padding: 20px; border-radius: 5px; }
          .content { background: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 5px; }
          .cta { display: inline-block; background: #fa709a; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Talebin Alındı</h2>
          </div>
          <div class="content">
            <p>Merhaba <strong>${data.customerName}</strong>,</p>
            <p>Talep <strong>#${data.referenceNumber}</strong> hakkında gönderdiğiniz istek alınmıştır.</p>
            <p><strong>Talep Türü:</strong> ${data.requestType}</p>
            <p><strong>Durum:</strong> Ekibimiz tarafından incelenmektedir.</p>
            <p>En kısa zamanda yanıt alacaksınız.</p>
            <p>
              <a href="${data.portalUrl}" class="cta">Panel'de Takip Et</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `,
};

export async function sendNotificationEmail(options: EmailOptions) {
  try {
    // Validate environment variables
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log("[Email] SMTP config missing, skipping email (dev mode)");
      return { success: false, message: "SMTP not configured" };
    }

    const template = emailTemplates[options.type];
    if (!template) {
      throw new Error(`Unknown email type: ${options.type}`);
    }

    const htmlContent = template(options.data);

    const mailOptions = {
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: options.to,
      subject: options.subject,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log(`[Email] Sent to ${options.to}: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("[Email Error]", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

// Schedule notification for specific events
export async function notifyCustomerOnMessage(
  customerEmail: string,
  customerName: string,
  referenceNumber: string,
  senderName: string,
  message: string,
  portalUrl: string
) {
  return sendNotificationEmail({
    to: customerEmail,
    subject: `Yeni Mesaj: Talep #${referenceNumber}`,
    type: "message",
    data: {
      customerName,
      referenceNumber,
      senderName,
      message,
      portalUrl,
    },
  });
}

export async function notifyCustomerOnStatusChange(
  customerEmail: string,
  customerName: string,
  referenceNumber: string,
  newStatus: string,
  reason: string,
  portalUrl: string
) {
  return sendNotificationEmail({
    to: customerEmail,
    subject: `Talep Durumu Güncellendi: #${referenceNumber}`,
    type: "status_change",
    data: {
      customerName,
      referenceNumber,
      newStatus,
      reason,
      portalUrl,
    },
  });
}

export async function notifyCustomerOnDocumentAdded(
  customerEmail: string,
  customerName: string,
  referenceNumber: string,
  fileName: string,
  docType: string,
  portalUrl: string
) {
  return sendNotificationEmail({
    to: customerEmail,
    subject: `Yeni Doküman: Talep #${referenceNumber}`,
    type: "document_added",
    data: {
      customerName,
      referenceNumber,
      fileName,
      docType,
      portalUrl,
    },
  });
}

export async function notifyCustomerOnRequestReceived(
  customerEmail: string,
  customerName: string,
  referenceNumber: string,
  requestType: string,
  portalUrl: string
) {
  return sendNotificationEmail({
    to: customerEmail,
    subject: `Talebin Alındı: #${referenceNumber}`,
    type: "request_received",
    data: {
      customerName,
      referenceNumber,
      requestType,
      portalUrl,
    },
  });
}
