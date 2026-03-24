import { getAdminDb } from "./firebase-admin";

type CustomerMessage = {
  id: string;
  applicationId: string;
  senderType: "admin" | "customer";
  senderName: string;
  text: string;
  createdAt: string;
  readAt: string | null;
};

type CustomerDocument = {
  id: string;
  applicationId: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  docType: "teklif" | "taraf" | "diger";
  url: string;
  uploadedBy: "admin" | "customer";
  uploadedAt: string;
  expiresAt: string | null;
};

type CustomerAction = {
  id: string;
  applicationId: string;
  type: "note_added" | "status_changed" | "document_added" | "message_sent" | "message_read";
  actor: string;
  details: Record<string, string>;
  createdAt: string;
};

export async function createMessage(
  applicationId: string,
  senderType: "admin" | "customer",
  senderName: string,
  text: string
): Promise<CustomerMessage> {
  const db = getAdminDb();
  const messageRef = db
    .collection("customer_applications")
    .doc(applicationId)
    .collection("messages")
    .doc();

  const message: CustomerMessage = {
    id: messageRef.id,
    applicationId,
    senderType,
    senderName,
    text,
    createdAt: new Date().toISOString(),
    readAt: null,
  };

  await messageRef.set(message);
  
  // Log action
  await logAction(applicationId, "message_sent", senderName, {
    messageId: message.id,
  });

  return message;
}

export async function getMessages(
  applicationId: string,
  limit: number = 50
): Promise<CustomerMessage[]> {
  const db = getAdminDb();
  const snapshot = await db
    .collection("customer_applications")
    .doc(applicationId)
    .collection("messages")
    .orderBy("createdAt", "desc")
    .limit(limit)
    .get();

  return snapshot.docs.map((doc) => doc.data() as CustomerMessage).reverse();
}

export async function markMessageAsRead(
  applicationId: string,
  messageId: string
): Promise<void> {
  const db = getAdminDb();
  await db
    .collection("customer_applications")
    .doc(applicationId)
    .collection("messages")
    .doc(messageId)
    .update({
      readAt: new Date().toISOString(),
    });
}

export async function uploadDocument(
  applicationId: string,
  fileName: string,
  fileSize: number,
  fileType: string,
  docType: "teklif" | "taraf" | "diger",
  url: string,
  uploadedBy: "admin" | "customer"
): Promise<CustomerDocument> {
  const db = getAdminDb();
  const docRef = db
    .collection("customer_applications")
    .doc(applicationId)
    .collection("documents")
    .doc();

  const document: CustomerDocument = {
    id: docRef.id,
    applicationId,
    fileName,
    fileSize,
    fileType,
    docType,
    url,
    uploadedBy,
    uploadedAt: new Date().toISOString(),
    expiresAt: null,
  };

  await docRef.set(document);

  // Log action
  await logAction(applicationId, "document_added", uploadedBy, {
    documentId: document.id,
    fileName,
    docType,
  });

  return document;
}

export async function getDocuments(
  applicationId: string
): Promise<CustomerDocument[]> {
  const db = getAdminDb();
  const snapshot = await db
    .collection("customer_applications")
    .doc(applicationId)
    .collection("documents")
    .orderBy("uploadedAt", "desc")
    .get();

  return snapshot.docs.map((doc) => doc.data() as CustomerDocument);
}

export async function deleteDocument(
  applicationId: string,
  documentId: string
): Promise<void> {
  const db = getAdminDb();
  const docSnap = await db
    .collection("customer_applications")
    .doc(applicationId)
    .collection("documents")
    .doc(documentId)
    .get();

  if (!docSnap.exists) {
    throw new Error("Doküman bulunamadı.");
  }

  await db
    .collection("customer_applications")
    .doc(applicationId)
    .collection("documents")
    .doc(documentId)
    .delete();
}

export async function logAction(
  applicationId: string,
  type: CustomerAction["type"],
  actor: string,
  details: Record<string, string>
): Promise<void> {
  const db = getAdminDb();
  await db
    .collection("customer_applications")
    .doc(applicationId)
    .collection("activity_log")
    .add({
      type,
      actor,
      details,
      createdAt: new Date().toISOString(),
    });
}

export async function getActivityLog(
  applicationId: string,
  limit: number = 20
): Promise<CustomerAction[]> {
  const db = getAdminDb();
  const snapshot = await db
    .collection("customer_applications")
    .doc(applicationId)
    .collection("activity_log")
    .orderBy("createdAt", "desc")
    .limit(limit)
    .get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  } as CustomerAction));
}
