import nodemailer from "nodemailer";

type VerificationMailInput = {
  to: string;
  fullName: string;
  verificationCode: string;
  verificationUrl: string;
  expiresAt: string;
  serviceArea: string;
};

let cachedTransporter: nodemailer.Transporter | null = null;

function getMailConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.MAIL_FROM;

  return {
    host,
    port,
    user,
    pass,
    from,
    secure: port === 465,
  };
}

export function isMailConfigured() {
  const config = getMailConfig();
  return Boolean(config.host && config.port && config.user && config.pass && config.from);
}

function getTransporter() {
  if (cachedTransporter) {
    return cachedTransporter;
  }

  const config = getMailConfig();
  if (!isMailConfigured()) {
    throw new Error("E-posta gönderimi yapılandırılmamış. SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM değişkenlerini ekleyin.");
  }

  cachedTransporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  return cachedTransporter;
}

export async function sendApplicationVerificationMail(input: VerificationMailInput) {
  const config = getMailConfig();
  const transporter = getTransporter();
  const expiresAtText = new Date(input.expiresAt).toLocaleString("tr-TR");

  await transporter.sendMail({
    from: config.from,
    to: input.to,
    subject: "VektörHUB başvuru e-posta doğrulama",
    text: [
      `Merhaba ${input.fullName},`,
      "",
      "Başvurunuzu tamamlamak için aşağıdaki bağlantıya tıklayarak e-posta adresinizi doğrulayın:",
      input.verificationUrl,
      "",
      `Doğrulama kodu: ${input.verificationCode}`,
      "",
      `Hizmet alanı: ${input.serviceArea}`,
      `Bağlantı son geçerlilik zamanı: ${expiresAtText}`,
      "",
      "Bu işlemi siz yapmadıysanız bu e-postayı dikkate almayın.",
    ].join("\n"),
    html: `
      <div style="font-family:Arial,sans-serif;background:#0b1220;color:#ffffff;padding:32px;line-height:1.6;">
        <div style="max-width:640px;margin:0 auto;background:#111827;border:1px solid rgba(255,255,255,0.08);border-radius:24px;padding:32px;">
          <div style="font-size:12px;letter-spacing:0.28em;text-transform:uppercase;color:#fdba74;font-weight:700;">VektörHUB</div>
          <h1 style="margin:16px 0 8px;font-size:28px;line-height:1.2;">E-posta adresinizi doğrulayın</h1>
          <p style="margin:0 0 16px;color:rgba(255,255,255,0.74);">Merhaba ${input.fullName}, başvurunuzu sisteme güvenli biçimde almak için e-posta doğrulaması gerekiyor.</p>
          <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:18px;margin:18px 0;">
            <div style="font-size:12px;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:0.18em;">Hizmet alanı</div>
            <div style="margin-top:8px;font-size:18px;font-weight:700;">${input.serviceArea}</div>
            <div style="margin-top:14px;font-size:12px;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:0.18em;">Doğrulama kodu</div>
            <div style="margin-top:8px;font-size:28px;letter-spacing:0.16em;font-weight:800;color:#ffffff;">${input.verificationCode}</div>
            <div style="margin-top:12px;font-size:13px;color:rgba(255,255,255,0.62);">Bağlantı son geçerlilik zamanı: ${expiresAtText}</div>
          </div>
          <a href="${input.verificationUrl}" style="display:inline-block;margin-top:8px;background:#f97316;color:#ffffff;text-decoration:none;padding:14px 22px;border-radius:16px;font-weight:700;">E-postayı Doğrula</a>
          <p style="margin:18px 0 0;color:rgba(255,255,255,0.54);font-size:13px;">Buton çalışmazsa bu bağlantıyı tarayıcıya yapıştırın:</p>
          <p style="word-break:break-all;font-size:13px;color:#fdba74;">${input.verificationUrl}</p>
        </div>
      </div>
    `,
  });
}

type CustomerInviteMailInput = {
  to: string;
  fullName: string;
  inviteUrl: string;
  expiresAt: string;
};

type ApplicationDeletedMailInput = {
  to: string;
  fullName: string;
  referenceNo: string;
  reason: string;
};

export async function sendCustomerInviteMail(input: CustomerInviteMailInput) {
  const config = getMailConfig();
  const transporter = getTransporter();
  const expiresAtText = new Date(input.expiresAt).toLocaleString("tr-TR");

  await transporter.sendMail({
    from: config.from,
    to: input.to,
    subject: "VektörHUB müşteri paneli daveti",
    text: [
      `Merhaba ${input.fullName},`,
      "",
      "Müşteri paneline erişiminiz açıldı.",
      "Aşağıdaki bağlantıdan şifrenizi belirleyerek hesabınızı aktive edin:",
      input.inviteUrl,
      "",
      `Bağlantı son geçerlilik zamanı: ${expiresAtText}`,
    ].join("\n"),
    html: `
      <div style="font-family:Arial,sans-serif;background:#0b1220;color:#ffffff;padding:32px;line-height:1.6;">
        <div style="max-width:640px;margin:0 auto;background:#111827;border:1px solid rgba(255,255,255,0.08);border-radius:24px;padding:32px;">
          <div style="font-size:12px;letter-spacing:0.28em;text-transform:uppercase;color:#fdba74;font-weight:700;">VektörHUB</div>
          <h1 style="margin:16px 0 8px;font-size:28px;line-height:1.2;">Müşteri paneli davetiniz hazır</h1>
          <p style="margin:0 0 16px;color:rgba(255,255,255,0.74);">Merhaba ${input.fullName}, hesabınızı aktive etmek için aşağıdaki bağlantıyı kullanın.</p>
          <a href="${input.inviteUrl}" style="display:inline-block;margin-top:8px;background:#f97316;color:#ffffff;text-decoration:none;padding:14px 22px;border-radius:16px;font-weight:700;">Hesabı Aktive Et</a>
          <p style="margin:14px 0 0;font-size:13px;color:rgba(255,255,255,0.62);">Bağlantı son geçerlilik zamanı: ${expiresAtText}</p>
          <p style="margin:18px 0 0;color:rgba(255,255,255,0.54);font-size:13px;">Buton çalışmazsa bu bağlantıyı tarayıcıya yapıştırın:</p>
          <p style="word-break:break-all;font-size:13px;color:#fdba74;">${input.inviteUrl}</p>
        </div>
      </div>
    `,
  });
}

export async function sendApplicationDeletedMail(input: ApplicationDeletedMailInput) {
  const config = getMailConfig();
  const transporter = getTransporter();

  await transporter.sendMail({
    from: config.from,
    to: input.to,
    subject: `VektörHUB talep kaydı kaldırıldı: ${input.referenceNo}`,
    text: [
      `Merhaba ${input.fullName},`,
      "",
      `Takip numarası ${input.referenceNo} olan talebiniz yönetim tarafından kaldırılmıştır.`,
      "",
      "Silinme açıklaması:",
      input.reason,
      "",
      "Detay veya yeniden başvuru için bizimle iletişime geçebilirsiniz.",
    ].join("\n"),
    html: `
      <div style="font-family:Arial,sans-serif;background:#0b1220;color:#ffffff;padding:32px;line-height:1.6;">
        <div style="max-width:640px;margin:0 auto;background:#111827;border:1px solid rgba(255,255,255,0.08);border-radius:24px;padding:32px;">
          <div style="font-size:12px;letter-spacing:0.28em;text-transform:uppercase;color:#fdba74;font-weight:700;">VektörHUB</div>
          <h1 style="margin:16px 0 8px;font-size:28px;line-height:1.2;">Talep kaydı kaldırıldı</h1>
          <p style="margin:0 0 16px;color:rgba(255,255,255,0.74);">Merhaba ${input.fullName}, takip numarası <strong>${input.referenceNo}</strong> olan talebiniz yönetim tarafından kaldırılmıştır.</p>
          <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:18px;margin:18px 0;">
            <div style="font-size:12px;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:0.18em;">Silinme açıklaması</div>
            <p style="margin-top:10px;font-size:15px;color:#ffffff;word-break:break-word;">${input.reason}</p>
          </div>
          <p style="margin:0;color:rgba(255,255,255,0.62);font-size:13px;">Detay veya yeniden başvuru için bizimle iletişime geçebilirsiniz.</p>
        </div>
      </div>
    `,
  });
}