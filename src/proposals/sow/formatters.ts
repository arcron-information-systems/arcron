import type { Contact, Money } from "./types";

export function money(value?: Money): string {
  if (!value) return "";
  const currency = value.currency ?? "USD";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value.amount);
}

export function contactLine(contact: Contact): string {
  const parts = [contact.name, contact.title, contact.email, contact.phone].filter(
    Boolean,
  ) as string[];
  return parts.join(" • ");
}
