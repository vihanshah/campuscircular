import { BRAND_COLORS } from "./theme";

export type RequestStatus =
  | "PENDING"
  | "ACCEPTED"
  | "AGREEMENT"
  | "HANDOVER"
  | "REJECTED"
  | "CANCELLED"
  | "EXPIRED"
  | "COMPLETED";

export interface RequestLifecycleStep {
  stage: string;
  label: string;
  isCompleted: boolean;
  isCurrent: boolean;
  timestamp?: string;
}

export interface CampusRequest {
  id: string;
  resourceName: string;
  category: "Photography" | "Electronics" | "Books" | "Music" | "Events" | "Sports";
  cardColor: string;
  status: RequestStatus;
  statusText: string;
  statusBg: string;
  statusTextColor: string;
  
  // Owner info
  ownerName: string;
  ownerAvatar: string;
  isOwnerVerified: boolean;
  ownerTrustScore: number;
  
  // Dates & Locations
  requestedDates: string;
  requestDate: string;
  handoverLocation: string;
  handoverTime?: string;
  distanceKm: number;

  // Financials
  pricePerDay: number;
  priceDisplay: string;
  depositDisplay: string;
  platformFeeDisplay: string;
  totalDisplay: string;

  // Smart Matching
  matchPct: number;
  matchReasons: string[];

  // UX Next Step
  nextStepText: string;
  purposeNotes: string;
  
  // Timeline
  lifecycle: RequestLifecycleStep[];
}

export const MOCK_REQUESTS: CampusRequest[] = [
  {
    id: "req-sony-camera",
    resourceName: "Sony Alpha A7 IV Camera Kit",
    category: "Photography",
    cardColor: BRAND_COLORS.pastelLavender,
    status: "HANDOVER",
    statusText: "✓ Accepted · Handover Scheduled",
    statusBg: "#D7F3EB",
    statusTextColor: "#15803D",
    ownerName: "Arjun Sharma",
    ownerAvatar: "A",
    isOwnerVerified: true,
    ownerTrustScore: 98,
    requestedDates: "Aug 28 → Aug 30, 2026",
    requestDate: "Aug 27, 2026",
    handoverLocation: "Media Lab · TSEC Main Campus",
    handoverTime: "Tomorrow · 2:00 PM",
    distanceKm: 0.8,
    pricePerDay: 120,
    priceDisplay: "₹120/day",
    depositDisplay: "₹500 deposit",
    platformFeeDisplay: "₹0 (Free for verified students)",
    totalDisplay: "₹740 total (₹240 rental + ₹500 refundable deposit)",
    matchPct: 96,
    matchReasons: [
      "Available on requested dates",
      "0.8 km away",
      "Excellent condition",
      "Trusted owner (28 loans)"
    ],
    nextStepText: "Your handover is scheduled for tomorrow at 2:00 PM at Media Lab.",
    purposeNotes: "Film Club short documentary shoot around TSEC campus.",
    lifecycle: [
      { stage: "REQUESTED", label: "Request Sent", isCompleted: true, isCurrent: false, timestamp: "Aug 27, 09:30 AM" },
      { stage: "ACCEPTED", label: "Owner Review", isCompleted: true, isCurrent: false, timestamp: "Aug 27, 11:15 AM" },
      { stage: "AGREEMENT", label: "Agreement Signed", isCompleted: true, isCurrent: false, timestamp: "Aug 27, 01:40 PM" },
      { stage: "HANDOVER", label: "Handover Scheduled", isCompleted: true, isCurrent: true, timestamp: "Tomorrow, 02:00 PM" },
      { stage: "BORROWED", label: "Active Loan", isCompleted: false, isCurrent: false },
    ],
  },
  {
    id: "req-shure-mic",
    resourceName: "Shure SM7B Studio Podcast Mic",
    category: "Photography",
    cardColor: BRAND_COLORS.pastelLavender,
    status: "AGREEMENT",
    statusText: "● Agreement Pending",
    statusBg: "#E8DEF8",
    statusTextColor: "#6B21A8",
    ownerName: "Maya Lin",
    ownerAvatar: "M",
    isOwnerVerified: true,
    ownerTrustScore: 99,
    requestedDates: "Sep 01 → Sep 03, 2026",
    requestDate: "Aug 27, 2026",
    handoverLocation: "Campus Radio Station",
    distanceKm: 1.4,
    pricePerDay: 200,
    priceDisplay: "₹200/day",
    depositDisplay: "₹500 deposit",
    platformFeeDisplay: "₹0",
    totalDisplay: "₹900 total",
    matchPct: 94,
    matchReasons: [
      "Broadcast quality mic",
      "Includes Cloudlifter",
      "1.4 km away"
    ],
    nextStepText: "Review and confirm the borrowing agreement before handover.",
    purposeNotes: "Recording Episode 12 of Campus Pulse Podcast.",
    lifecycle: [
      { stage: "REQUESTED", label: "Request Sent", isCompleted: true, isCurrent: false, timestamp: "Aug 27, 10:00 AM" },
      { stage: "ACCEPTED", label: "Owner Accepted", isCompleted: true, isCurrent: false, timestamp: "Aug 27, 12:45 PM" },
      { stage: "AGREEMENT", label: "Agreement Pending", isCompleted: false, isCurrent: true },
      { stage: "HANDOVER", label: "Handover", isCompleted: false, isCurrent: false },
      { stage: "BORROWED", label: "Active Loan", isCompleted: false, isCurrent: false },
    ],
  },
  {
    id: "req-projector",
    resourceName: "HD 4K Portable Cinema Projector",
    category: "Events",
    cardColor: BRAND_COLORS.pastelLime,
    status: "PENDING",
    statusText: "● Awaiting Approval",
    statusBg: "#FDF0A6",
    statusTextColor: "#854D0E",
    ownerName: "Film Guild Exec",
    ownerAvatar: "F",
    isOwnerVerified: true,
    ownerTrustScore: 97,
    requestedDates: "Sep 05 → Sep 06, 2026",
    requestDate: "Aug 27, 2026",
    handoverLocation: "Student Center · Room 104",
    distanceKm: 1.2,
    pricePerDay: 150,
    priceDisplay: "₹150/day",
    depositDisplay: "₹300 deposit",
    platformFeeDisplay: "₹0",
    totalDisplay: "₹450 total",
    matchPct: 92,
    matchReasons: [
      "Available for weekend screening",
      "Includes 84-inch folding screen"
    ],
    nextStepText: "Waiting for Film Guild Exec to approve your request.",
    purposeNotes: "Outdoor anime screening at Dorm B quad.",
    lifecycle: [
      { stage: "REQUESTED", label: "Request Sent", isCompleted: true, isCurrent: false, timestamp: "Aug 27, 02:20 PM" },
      { stage: "ACCEPTED", label: "Owner Review", isCompleted: false, isCurrent: true },
      { stage: "AGREEMENT", label: "Agreement", isCompleted: false, isCurrent: false },
      { stage: "HANDOVER", label: "Handover", isCompleted: false, isCurrent: false },
      { stage: "BORROWED", label: "Active Loan", isCompleted: false, isCurrent: false },
    ],
  },
  {
    id: "req-macbook",
    resourceName: "MacBook Pro M2 (16GB RAM)",
    category: "Electronics",
    cardColor: BRAND_COLORS.pastelYellow,
    status: "REJECTED",
    statusText: "✕ Request Declined",
    statusBg: "#FEE2E2",
    statusTextColor: "#991B1B",
    ownerName: "Dev Patel",
    ownerAvatar: "D",
    isOwnerVerified: true,
    ownerTrustScore: 100,
    requestedDates: "Aug 29 → Aug 31, 2026",
    requestDate: "Aug 26, 2026",
    handoverLocation: "CS Tech Hub",
    distanceKm: 0.4,
    pricePerDay: 0,
    priceDisplay: "Free",
    depositDisplay: "Free with ID",
    platformFeeDisplay: "₹0",
    totalDisplay: "₹0",
    matchPct: 88,
    matchReasons: [
      "0.4 km away",
      "Free student loan"
    ],
    nextStepText: "Owner is using the laptop for hackathon. Try recommended alternatives below.",
    purposeNotes: "Need high RAM machine for deep learning assignment.",
    lifecycle: [
      { stage: "REQUESTED", label: "Request Sent", isCompleted: true, isCurrent: false, timestamp: "Aug 26, 03:00 PM" },
      { stage: "ACCEPTED", label: "Declined by Owner", isCompleted: false, isCurrent: true, timestamp: "Aug 26, 04:30 PM" },
    ],
  },
];

export function getStoredRequests(): CampusRequest[] {
  try {
    const raw = localStorage.getItem("campus_circular_requests");
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Failed to read stored requests", e);
  }
  return MOCK_REQUESTS;
}

export function saveNewRequest(newReq: CampusRequest): CampusRequest[] {
  const current = getStoredRequests();
  const updated = [newReq, ...current];
  try {
    localStorage.setItem("campus_circular_requests", JSON.stringify(updated));
  } catch (e) {
    console.error("Failed to save new request", e);
  }
  return updated;
}
