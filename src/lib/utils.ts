import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency, minimumFractionDigits: 0 }).format(amount);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export function formatDateShort(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function calculateNights(from: string, to: string): number {
  const d1 = new Date(from);
  const d2 = new Date(to);
  return Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
}

export function maskEmail(email: string): string {
  const [user, domain] = email.split("@");
  return `${"●".repeat(user.length)}@${domain}`;
}

export function maskPhone(phone: string): string {
  return phone.replace(/\d(?=\d{4})/g, "●");
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    draft: "Draft",
    submitted: "Submitted",
    matching: "Matching",
    awaiting_provider_responses: "Awaiting Responses",
    options_ready: "Options Ready",
    selected: "Provider Selected",
    awaiting_payment: "Awaiting Payment",
    paid: "Paid",
    contact_released: "Contact Released",
    completed: "Completed",
    cancelled: "Cancelled",
    pending: "Pending",
    accepted: "Accepted",
    declined: "Declined",
    expired: "Expired",
    not_selected: "Not Selected",
    failed: "Failed",
    refunded: "Refunded",
    invited: "Invited",
    under_review: "Under Review",
    approved: "Approved",
    rejected: "Rejected",
    suspended: "Suspended",
    available: "Available",
    limited: "Limited",
    booked: "Fully Booked",
  };
  return labels[status] ?? status;
}

export function getStatusBadgeClass(status: string): string {
  const map: Record<string, string> = {
    approved: "badge-success",
    paid: "badge-success",
    contact_released: "badge-success",
    completed: "badge-success",
    accepted: "badge-success",
    available: "badge-success",
    submitted: "badge-gold",
    options_ready: "badge-gold",
    awaiting_payment: "badge-gold",
    selected: "badge-gold",
    matching: "badge-gold",
    awaiting_provider_responses: "badge-gold",
    pending: "badge-gold",
    under_review: "badge-warning",
    limited: "badge-warning",
    invited: "badge-muted",
    draft: "badge-muted",
    cancelled: "badge-error",
    declined: "badge-error",
    rejected: "badge-error",
    suspended: "badge-error",
    failed: "badge-error",
    booked: "badge-error",
    expired: "badge-muted",
    not_selected: "badge-muted",
    refunded: "badge-muted",
  };
  return map[status] ?? "badge-muted";
}

export function getAvailabilityColor(availability: string): string {
  const map: Record<string, string> = {
    available: "#4a7c59",
    limited: "#c4a265",
    booked: "#8b3a3a",
  };
  return map[availability] ?? "#7a7268";
}

export function slugify(str: string): string {
  return str.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

export function platformFee(amount: number): number {
  return Math.round(amount * 0.1);
}
