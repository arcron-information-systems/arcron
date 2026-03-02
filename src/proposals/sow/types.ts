export type Money = { amount: number; currency?: "USD" };

export type Contact = {
  name: string;
  title?: string;
  email?: string;
  phone?: string;
  company?: string;
};

export type Phase = {
  name: string;
  duration?: string;
  goal?: string;
  activities?: string[];
  deliverables?: string[];
  fee?: Money;
};

export type SOWData = {
  sowNumber?: string;
  version?: string;
  date: string;
  projectName: string;
  clientName: string;
  arcron: {
    companyName: string;
    website: string;
    addressLine?: string;
    primaryContact: Contact;
  };
  client: {
    legalName: string;
    addressLine?: string;
    primaryContacts: Contact[];
  };
  engagement: {
    startDate?: string;
    targetEndDate?: string;
    estimatedDuration?: string;
  };
  intro: {
    summary: string;
  };
  objective: {
    objective: string;
    successLooksLike: string[];
  };
  phases: Phase[];
  scope: {
    sections: { title: string; bullets: string[] }[];
  };
  deliverables: {
    summary: string[];
    acceptanceCriteria: string[];
  };
  outOfScope: string[];
  clientAssumptions: string[];
  arcronAssumptions: string[];
  pricing: {
    model: "fixed_by_phase" | "time_and_materials" | "retainer";
    fixedTotal?: Money;
    hourlyRate?: Money;
    rateLabel?: string;
    estimatedHours?: { min: number; max: number };
    invoiceCadence?: string;
    paymentTerms?: string;
    passThroughCosts?: { item: string; estimate?: Money; notes?: string }[];
  };
  changeManagement: {
    text?: string;
  };
  communication: {
    cadenceBullets: string[];
    artifactsBullets: string[];
  };
  legal: {
    governedByMsa?: boolean;
    msaName?: string;
    notes?: string[];
  };
  signatures: {
    clientSigner?: Contact;
    arcronSigner?: Contact;
  };
};
