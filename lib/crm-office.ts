import { getAdminDb } from "@/lib/firebase-admin";

const CRM_CUSTOMERS_COLLECTION = "office_crm_customers";
const CRM_NOTES_COLLECTION = "office_crm_notes";
const CRM_TASKS_COLLECTION = "office_crm_tasks";

export type OfficeCrmCustomerRecord = {
  id: string;
  source: string;
  sourceId: string | null;
  fullName: string;
  companyName: string;
  legalCompanyName: string;
  email: string;
  billingEmail: string;
  phone: string;
  contactTitle: string;
  taxOffice: string;
  taxNumber: string;
  address: string;
  status: string;
  lifecycleStage: string;
  assignedTo: string;
  tags: string[];
  notesSummary: string;
  websiteUrl: string;
  lastContactedAt: string | null;
  nextFollowUpAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OfficeCrmNoteRecord = {
  id: string;
  customerId: string;
  noteType: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type OfficeCrmTaskRecord = {
  id: string;
  customerId: string;
  title: string;
  status: string;
  priority: string;
  dueOn: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OfficeCrmSyncPayload = {
  customers?: OfficeCrmCustomerRecord[];
  notes?: OfficeCrmNoteRecord[];
  tasks?: OfficeCrmTaskRecord[];
};

function sanitizeCustomer(input: OfficeCrmCustomerRecord): OfficeCrmCustomerRecord {
  return {
    id: input.id.trim(),
    source: input.source.trim() || "manual",
    sourceId: input.sourceId?.trim() || null,
    fullName: input.fullName.trim(),
    companyName: input.companyName.trim(),
    legalCompanyName: input.legalCompanyName.trim(),
    email: input.email.trim(),
    billingEmail: input.billingEmail.trim(),
    phone: input.phone.trim(),
    contactTitle: input.contactTitle.trim(),
    taxOffice: input.taxOffice.trim(),
    taxNumber: input.taxNumber.trim(),
    address: input.address.trim(),
    status: input.status.trim() || "active",
    lifecycleStage: input.lifecycleStage.trim() || "customer",
    assignedTo: input.assignedTo.trim(),
    tags: Array.isArray(input.tags)
      ? input.tags.map((tag) => `${tag}`.trim()).filter(Boolean)
      : [],
    notesSummary: input.notesSummary.trim(),
    websiteUrl: input.websiteUrl.trim(),
    lastContactedAt: input.lastContactedAt?.trim() || null,
    nextFollowUpAt: input.nextFollowUpAt?.trim() || null,
    createdAt: input.createdAt,
    updatedAt: input.updatedAt,
  };
}

function sanitizeNote(input: OfficeCrmNoteRecord): OfficeCrmNoteRecord {
  return {
    id: input.id.trim(),
    customerId: input.customerId.trim(),
    noteType: input.noteType.trim() || "general",
    content: input.content.trim(),
    createdAt: input.createdAt,
    updatedAt: input.updatedAt,
  };
}

function sanitizeTask(input: OfficeCrmTaskRecord): OfficeCrmTaskRecord {
  return {
    id: input.id.trim(),
    customerId: input.customerId.trim(),
    title: input.title.trim(),
    status: input.status.trim() || "open",
    priority: input.priority.trim() || "medium",
    dueOn: input.dueOn?.trim() || null,
    createdAt: input.createdAt,
    updatedAt: input.updatedAt,
  };
}

async function writeChunk(
  collectionName: string,
  items: Array<Record<string, unknown> & { id: string }>
) {
  if (items.length === 0) {
    return;
  }

  const db = getAdminDb();
  for (let index = 0; index < items.length; index += 400) {
    const chunk = items.slice(index, index + 400);
    const batch = db.batch();
    for (const item of chunk) {
      batch.set(db.collection(collectionName).doc(item.id), item, { merge: true });
    }
    await batch.commit();
  }
}

export async function pullOfficeCrmSnapshot() {
  const db = getAdminDb();
  const [customersSnap, notesSnap, tasksSnap] = await Promise.all([
    db.collection(CRM_CUSTOMERS_COLLECTION).get(),
    db.collection(CRM_NOTES_COLLECTION).get(),
    db.collection(CRM_TASKS_COLLECTION).get(),
  ]);

  const customers = customersSnap.docs
    .map((doc) => sanitizeCustomer(doc.data() as OfficeCrmCustomerRecord))
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  const notes = notesSnap.docs
    .map((doc) => sanitizeNote(doc.data() as OfficeCrmNoteRecord))
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  const tasks = tasksSnap.docs
    .map((doc) => sanitizeTask(doc.data() as OfficeCrmTaskRecord))
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  return { customers, notes, tasks };
}

export async function pushOfficeCrmSnapshot(payload: OfficeCrmSyncPayload) {
  const customers = (payload.customers ?? []).map(sanitizeCustomer).filter((item) => item.id);
  const notes = (payload.notes ?? []).map(sanitizeNote).filter((item) => item.id);
  const tasks = (payload.tasks ?? []).map(sanitizeTask).filter((item) => item.id);

  await Promise.all([
    writeChunk(CRM_CUSTOMERS_COLLECTION, customers),
    writeChunk(CRM_NOTES_COLLECTION, notes),
    writeChunk(CRM_TASKS_COLLECTION, tasks),
  ]);

  return {
    customerCount: customers.length,
    noteCount: notes.length,
    taskCount: tasks.length,
  };
}
