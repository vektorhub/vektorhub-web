"use client";

import { FileDown } from "lucide-react";

interface ApplicationPDFExportProps {
  application: {
    id: string;
    referenceNumber: string;
    customerName: string;
    customerEmail: string;
    serviceArea: string;
    status: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
  messages: Array<{
    id: string;
    senderName: string;
    senderType: string;
    text: string;
    createdAt: string;
  }>;
  documents: Array<{
    id: string;
    fileName: string;
    fileSize: number;
    uploadedAt: string;
  }>;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function generatePrintHTML(data: ApplicationPDFExportProps): string {
  const { application, messages, documents } = data;

  const messagesHTML =
    messages.length > 0
      ? `
    <div class="section">
      <div class="section-title">💬 Mesajlar (${messages.length})</div>
      ${messages
        .map(
          (msg) =>
            `<div class="message">
        <div class="message-author">${msg.senderName} - ${formatDate(msg.createdAt)}</div>
        <div class="message-text">${msg.text}</div>
      </div>`
        )
        .join("")}
    </div>
  `
      : "";

  const documentsHTML =
    documents.length > 0
      ? `
    <div class="section">
      <div class="section-title">📁 Dokümanlar (${documents.length})</div>
      ${documents
        .map(
          (doc) =>
            `<div class="document">
        <div class="document-icon">📄</div>
        <div class="document-info">
          <div class="document-name">${doc.fileName}</div>
          <div class="document-size">${(doc.fileSize / 1024 / 1024).toFixed(2)} MB • ${formatDate(doc.uploadedAt)}</div>
        </div>
      </div>`
        )
        .join("")}
    </div>
  `
      : "";

  return `
    <!DOCTYPE html>
    <html dir="ltr" lang="tr">
      <head>
        <meta charset="UTF-8">
        <title>Talep #${application.referenceNumber}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            background: white;
          }
          .container { 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 40px 20px;
          }
          .header { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: white; 
            padding: 30px; 
            border-radius: 8px;
            margin-bottom: 30px;
          }
          .header h1 { font-size: 28px; margin-bottom: 5px; }
          .header p { opacity: 0.9; }
          .section { 
            margin-bottom: 30px; 
          }
          .section-title { 
            font-size: 16px; 
            font-weight: 700; 
            background: #f0f0f0; 
            padding: 12px 15px; 
            border-radius: 5px;
            margin-bottom: 15px;
            border-left: 4px solid #667eea;
          }
          .row { 
            display: flex; 
            padding: 10px 0; 
            border-bottom: 1px solid #eee;
          }
          .row:last-child { border-bottom: none; }
          .label { 
            font-weight: 600; 
            color: #666; 
            width: 30%;
          }
          .value { 
            width: 70%;
          }
          .message { 
            background: #f9f9f9; 
            padding: 15px; 
            border-left: 4px solid #667eea;
            margin-bottom: 12px;
            border-radius: 5px;
          }
          .message-author { 
            font-weight: 600; 
            font-size: 13px; 
            color: #667eea;
            margin-bottom: 5px;
          }
          .message-text { 
            font-size: 14px; 
            line-height: 1.5;
          }
          .document { 
            display: flex; 
            align-items: center; 
            padding: 10px 0;
            border-bottom: 1px solid #eee;
          }
          .document-icon { 
            margin-right: 10px; 
            font-size: 18px;
          }
          .document-info { 
            flex: 1;
          }
          .document-name { 
            font-weight: 600;
          }
          .document-size { 
            font-size: 12px; 
            color: #999;
          }
          .footer { 
            margin-top: 40px; 
            padding-top: 20px; 
            border-top: 1px solid #ddd; 
            font-size: 12px; 
            color: #999;
          }
          @media print {
            body { background: white; }
            .container { padding: 20px; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Talep #${application.referenceNumber}</h1>
            <p>Vektörhub Müşteri Portalı | ${formatDate(new Date().toISOString())}</p>
          </div>

          <div class="section">
            <div class="section-title">📋 Müşteri Bilgileri</div>
            <div class="row">
              <div class="label">Ad Soyad:</div>
              <div class="value">${application.customerName}</div>
            </div>
            <div class="row">
              <div class="label">Email:</div>
              <div class="value">${application.customerEmail}</div>
            </div>
            <div class="row">
              <div class="label">Hizmet:</div>
              <div class="value">${application.serviceArea}</div>
            </div>
            <div class="row">
              <div class="label">Durum:</div>
              <div class="value"><strong>${application.status}</strong></div>
            </div>
            <div class="row">
              <div class="label">Başvuru Tarihi:</div>
              <div class="value">${formatDate(application.createdAt)}</div>
            </div>
            <div class="row">
              <div class="label">Son Güncelleme:</div>
              <div class="value">${formatDate(application.updatedAt)}</div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">📝 Açıklama</div>
            <p>${application.description}</p>
          </div>

          ${messagesHTML}
          ${documentsHTML}

          <div class="footer">
            <p>Bu belge Vektörhub Müşteri Portalı tarafından otomatik olarak oluşturulmuştur.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function ExportPDFButton(data: ApplicationPDFExportProps) {
  const handleExport = () => {
    const htmlContent = generatePrintHTML(data);
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    
    const printWindow = window.open(url, "_blank");
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition"
    >
      <FileDown size={20} />
      PDF Olarak İndir
    </button>
  );
}
