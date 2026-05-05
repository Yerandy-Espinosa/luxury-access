// ─── Provider Types ──────────────────────────────────────────────
export type ProviderCategory = "chef" | "villa";
export type ProviderStatus = "invited" | "submitted" | "under_review" | "approved" | "rejected" | "suspended";

export interface Provider {
  id: string;
  name: string;
  category: ProviderCategory;
  tagline: string;
  description: string;
  destinations: string[];
  tags: string[];
  capacity: number;
  priceFrom: number;
  priceCurrency: string;
  availability: "available" | "limited" | "booked";
  status: ProviderStatus;
  imageUrl: string;
  galleryImages: string[];
  cuisineStyle?: string;
  beachfront?: boolean;
  bedrooms?: number;
  staffIncluded?: boolean;
  luxuryTier?: "luxury" | "ultra-luxury" | "ultra-premium";
  rating?: number;
  completedServices?: number;
  responseTime?: string;
}

// ─── Request Types ───────────────────────────────────────────────
export type RequestCategory = "chef" | "villa";
export type RequestStatus =
  | "draft" | "submitted" | "matching" | "awaiting_provider_responses"
  | "options_ready" | "selected" | "awaiting_payment" | "paid"
  | "contact_released" | "completed" | "cancelled";

export interface ServiceRequest {
  id: string;
  clientId: string;
  clientName: string;
  category: RequestCategory;
  destination: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  budget: string;
  notes: string;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
  selectedProviderId?: string;
  // Chef-specific
  meals?: string[];
  cuisinePreference?: string;
  dietaryRestrictions?: string;
  occasion?: string;
  // Villa-specific
  bedrooms?: number;
  beachfront?: boolean;
  staffPreference?: boolean;
  luxuryTier?: string;
  // Provider responses
  responses?: ProviderResponse[];
}

// ─── Provider Response Types ─────────────────────────────────────
export type ProviderResponseStatus =
  | "pending" | "accepted" | "declined" | "expired" | "selected" | "not_selected";

export interface ProviderResponse {
  id: string;
  requestId: string;
  providerId: string;
  providerName: string;
  status: ProviderResponseStatus;
  proposedPrice: number;
  message: string;
  createdAt: string;
  confirmedAt?: string;
}

// ─── Transaction Types ───────────────────────────────────────────
export type TransactionStatus = "pending" | "paid" | "failed" | "refunded";

export interface Transaction {
  id: string;
  requestId: string;
  providerId: string;
  providerName: string;
  clientId: string;
  clientName: string;
  amount: number;
  platformFee: number;
  currency: string;
  status: TransactionStatus;
  paidAt?: string;
  createdAt: string;
  contactReleased: boolean;
}

// ─── Contact Info Types ──────────────────────────────────────────
export interface ContactInfo {
  phone: string;
  email: string;
  whatsapp?: string;
  instagram?: string;
  website?: string;
}

// ─── Theme ───────────────────────────────────────────────────────
export type Theme = "dark" | "light";

// ─── Admin Log ───────────────────────────────────────────────────
export interface AuditLog {
  id: string;
  event: string;
  requestId?: string;
  providerId?: string;
  clientId?: string;
  timestamp: string;
  actor: string;
}
