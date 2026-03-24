"use client";

import { useState } from "react";
import { X, Download, FileText, Image as ImageIcon } from "lucide-react";

interface FilePreviewDialogProps {
  fileName: string;
  fileType: string;
  fileUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

export function FilePreviewDialog({
  fileName,
  fileType,
  fileUrl,
  isOpen,
  onClose,
}: FilePreviewDialogProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const isImage = fileType.startsWith("image/");
  const isPdf = fileType === "application/pdf" || fileName.endsWith(".pdf");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-[20px] max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            {isImage ? (
              <ImageIcon size={20} className="text-blue-400" />
            ) : (
              <FileText size={20} className="text-red-400" />
            )}
            <p className="font-semibold text-white truncate">{fileName}</p>
          </div>
          <div className="flex gap-2">
            <a
              href={fileUrl}
              download={fileName}
              className="p-2 hover:bg-slate-700 rounded-lg transition"
              title="İndir"
            >
              <Download size={20} />
            </a>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-700 rounded-lg transition"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 overflow-auto bg-slate-900 flex items-center justify-center p-4">
          {error ? (
            <div className="text-center">
              <p className="text-slate-400 mb-4">Önizleme yüklenemedi</p>
              <a
                href={fileUrl}
                download={fileName}
                className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition"
              >
                Dosyayı İndir
              </a>
            </div>
          ) : isImage ? (
            <img
              src={fileUrl}
              alt={fileName}
              onLoad={() => setLoading(false)}
              onError={() => {
                setLoading(false);
                setError(true);
              }}
              className={`max-w-full max-h-full ${loading ? "hidden" : ""}`}
            />
          ) : isPdf ? (
            <object
              data={fileUrl}
              type="application/pdf"
              width="100%"
              height="100%"
              onError={() => {
                setLoading(false);
                setError(true);
              }}
              onLoad={() => setLoading(false)}
              className={loading ? "hidden" : ""}
            >
              <p className="text-slate-400">
                PDF görüntülenemedi.{" "}
                <a href={fileUrl} download className="text-blue-400 hover:underline">
                  İndir
                </a>
              </p>
            </object>
          ) : (
            <div className="text-center">
              <FileText size={48} className="mx-auto text-slate-600 mb-4" />
              <p className="text-slate-400 mb-4">Bu dosya türü önizlenemiyor</p>
              <a
                href={fileUrl}
                download={fileName}
                className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition"
              >
                Dosyayı İndir
              </a>
            </div>
          )}

          {loading && !error && (
            <div className="animate-pulse text-slate-400">Yükleniyor...</div>
          )}
        </div>
      </div>
    </div>
  );
}
