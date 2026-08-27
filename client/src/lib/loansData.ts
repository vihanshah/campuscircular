import { BRAND_COLORS } from "./theme";

export type LifecycleStage =
  | "REQUESTED"
  | "ACCEPTED"
  | "HANDOVER"
  | "BORROWED"
  | "RETURN_DUE"
  | "RETURNED"
  | "INSPECTION"
  | "SETTLEMENT"
  | "RATED";

export interface LoanLifecycleStep {
  stage: LifecycleStage;
  label: string;
  isCompleted: boolean;
  isCurrent: boolean;
  timestamp?: string;
}

export interface CampusLoan {
  id: string;
  resourceName: string;
  category: "Photography" | "Electronics" | "Books" | "Music" | "Events" | "Sports";
  cardColor: string;
  status: "Borrowed" | "Due Soon" | "Overdue" | "Returned" | "Inspection" | "Completed";
  statusColor: string;
  
  // Owner Details
  ownerName: string;
  ownerAvatar: string;
  ownerTrustScore: number;
  ownerRating: number;
  isOwnerVerified: boolean;
  
  // Location & Dates
  locationName: string;
  distanceKm: number;
  borrowedDate: string;
  dueDate: string;
  dueDaysRemaining: number;
  isOverdue: boolean;
  overdueDays?: number;

  // Financial Breakdown
  pricePerDay: number;
  priceDisplay: string;
  depositAmount: number;
  depositDisplay: string;
  platformFeeDisplay: string;
  totalPaidDisplay: string;

  // Condition & Handover
  conditionAtHandover: "New" | "Excellent" | "Good";
  conditionNotes: string[];
  includedAccessories: string[];

  // Timeline
  lifecycle: LoanLifecycleStep[];

  // Rating (if completed)
  ratingGiven?: number;
}

export const MOCK_LOANS: CampusLoan[] = [
  {
    id: "loan-sony-camera",
    resourceName: "Sony Alpha A7 IV Camera Kit",
    category: "Photography",
    cardColor: BRAND_COLORS.pastelLavender,
    status: "Borrowed",
    statusColor: "#E8DEF8",
    ownerName: "Arjun Sharma",
    ownerAvatar: "A",
    ownerTrustScore: 98,
    ownerRating: 4.9,
    isOwnerVerified: true,
    locationName: "Media Lab · TSEC Campus",
    distanceKm: 0.8,
    borrowedDate: "Aug 25, 2026",
    dueDate: "Aug 29, 2026",
    dueDaysRemaining: 2,
    isOverdue: false,
    pricePerDay: 120,
    priceDisplay: "₹120/day",
    depositAmount: 500,
    depositDisplay: "₹500 refundable deposit",
    platformFeeDisplay: "₹0 (Free for verified students)",
    totalPaidDisplay: "₹980 total (₹480 rental + ₹500 deposit)",
    conditionAtHandover: "Excellent",
    conditionNotes: [
      "No visible scratches on lens elements",
      "Sensor cleaned prior to handover",
      "2 batteries tested at 100% capacity"
    ],
    includedAccessories: [
      "Sony FE 24-70mm f/2.8 GM Lens",
      "2 NP-FZ100 Rechargeable Batteries",
      "Dual Battery Charger + USB-C Cable",
      "SanDisk 128GB Extreme Pro SD Card",
      "Padded Shoulder Carrying Bag"
    ],
    lifecycle: [
      { stage: "REQUESTED", label: "Requested", isCompleted: true, isCurrent: false, timestamp: "Aug 24, 10:15 AM" },
      { stage: "ACCEPTED", label: "Accepted", isCompleted: true, isCurrent: false, timestamp: "Aug 24, 11:30 AM" },
      { stage: "HANDOVER", label: "Handover", isCompleted: true, isCurrent: false, timestamp: "Aug 25, 02:00 PM" },
      { stage: "BORROWED", label: "Borrowed", isCompleted: true, isCurrent: true, timestamp: "Aug 25, 02:15 PM" },
      { stage: "RETURN_DUE", label: "Return Due", isCompleted: false, isCurrent: false, timestamp: "Aug 29, 06:00 PM" },
      { stage: "RETURNED", label: "Returned", isCompleted: false, isCurrent: false },
      { stage: "INSPECTION", label: "Inspection", isCompleted: false, isCurrent: false },
      { stage: "SETTLEMENT", label: "Settlement", isCompleted: false, isCurrent: false },
      { stage: "RATED", label: "Rated", isCompleted: false, isCurrent: false },
    ],
  },
  {
    id: "loan-casio-calc",
    resourceName: "Casio FX-991EX & AI Textbooks",
    category: "Books",
    cardColor: BRAND_COLORS.pastelMint,
    status: "Due Soon",
    statusColor: "#FDF0A6",
    ownerName: "Sarah Mehta",
    ownerAvatar: "S",
    ownerTrustScore: 95,
    ownerRating: 4.8,
    isOwnerVerified: true,
    locationName: "Engineering Block B",
    distanceKm: 0.6,
    borrowedDate: "Aug 20, 2026",
    dueDate: "Aug 28, 2026",
    dueDaysRemaining: 1,
    isOverdue: false,
    pricePerDay: 0,
    priceDisplay: "Free",
    depositAmount: 0,
    depositDisplay: "Free with ID",
    platformFeeDisplay: "₹0",
    totalPaidDisplay: "₹0 (Free student loan)",
    conditionAtHandover: "Excellent",
    conditionNotes: [
      "Calculator solar panel fully functional",
      "3 AI Textbooks with clean pages"
    ],
    includedAccessories: [
      "Hard protective cover for calculator",
      "Artificial Intelligence: A Modern Approach (4th Ed)",
      "Data Structures Reference Notes"
    ],
    lifecycle: [
      { stage: "REQUESTED", label: "Requested", isCompleted: true, isCurrent: false, timestamp: "Aug 19, 04:00 PM" },
      { stage: "ACCEPTED", label: "Accepted", isCompleted: true, isCurrent: false, timestamp: "Aug 19, 05:20 PM" },
      { stage: "HANDOVER", label: "Handover", isCompleted: true, isCurrent: false, timestamp: "Aug 20, 10:00 AM" },
      { stage: "BORROWED", label: "Borrowed", isCompleted: true, isCurrent: false, timestamp: "Aug 20, 10:10 AM" },
      { stage: "RETURN_DUE", label: "Return Due", isCompleted: false, isCurrent: true, timestamp: "Aug 28, 05:00 PM" },
      { stage: "RETURNED", label: "Returned", isCompleted: false, isCurrent: false },
      { stage: "INSPECTION", label: "Inspection", isCompleted: false, isCurrent: false },
      { stage: "SETTLEMENT", label: "Settlement", isCompleted: false, isCurrent: false },
      { stage: "RATED", label: "Rated", isCompleted: false, isCurrent: false },
    ],
  },
  {
    id: "loan-projector-4k",
    resourceName: "HD 4K Portable Cinema Projector",
    category: "Events",
    cardColor: BRAND_COLORS.pastelLime,
    status: "Borrowed",
    statusColor: "#E2F1D0",
    ownerName: "Film Guild Exec",
    ownerAvatar: "F",
    ownerTrustScore: 99,
    ownerRating: 5.0,
    isOwnerVerified: true,
    locationName: "Student Center · Room 104",
    distanceKm: 1.2,
    borrowedDate: "Aug 26, 2026",
    dueDate: "Aug 31, 2026",
    dueDaysRemaining: 4,
    isOverdue: false,
    pricePerDay: 150,
    priceDisplay: "₹150/day",
    depositAmount: 300,
    depositDisplay: "₹300 deposit",
    platformFeeDisplay: "₹0",
    totalPaidDisplay: "₹1,050 total (₹750 rental + ₹300 deposit)",
    conditionAtHandover: "New",
    conditionNotes: [
      "Projection lens spotless",
      "Harmon Kardon speakers tested",
      "HDMI & USB-C cables included"
    ],
    includedAccessories: [
      "4K Projector Unit",
      "Power Adapter & 5m Extension Cord",
      "HDMI to USB-C Braided Cable",
      "Remote Control + AAA Batteries",
      "84-Inch Folding Screen"
    ],
    lifecycle: [
      { stage: "REQUESTED", label: "Requested", isCompleted: true, isCurrent: false, timestamp: "Aug 25, 08:00 PM" },
      { stage: "ACCEPTED", label: "Accepted", isCompleted: true, isCurrent: false, timestamp: "Aug 26, 09:00 AM" },
      { stage: "HANDOVER", label: "Handover", isCompleted: true, isCurrent: false, timestamp: "Aug 26, 11:30 AM" },
      { stage: "BORROWED", label: "Borrowed", isCompleted: true, isCurrent: true, timestamp: "Aug 26, 11:35 AM" },
      { stage: "RETURN_DUE", label: "Return Due", isCompleted: false, isCurrent: false },
      { stage: "RETURNED", label: "Returned", isCompleted: false, isCurrent: false },
      { stage: "INSPECTION", label: "Inspection", isCompleted: false, isCurrent: false },
      { stage: "SETTLEMENT", label: "Settlement", isCompleted: false, isCurrent: false },
      { stage: "RATED", label: "Rated", isCompleted: false, isCurrent: false },
    ],
  },
];

export const MOCK_COMPLETED_LOANS: CampusLoan[] = [
  {
    id: "loan-macbook-completed",
    resourceName: "MacBook Pro M2 (16GB RAM)",
    category: "Electronics",
    cardColor: BRAND_COLORS.pastelYellow,
    status: "Completed",
    statusColor: "#DCFCE7",
    ownerName: "Dev Patel",
    ownerAvatar: "D",
    ownerTrustScore: 100,
    ownerRating: 5.0,
    isOwnerVerified: true,
    locationName: "CS Tech Hub",
    distanceKm: 0.4,
    borrowedDate: "Aug 10, 2026",
    dueDate: "Aug 15, 2026",
    dueDaysRemaining: 0,
    isOverdue: false,
    pricePerDay: 0,
    priceDisplay: "Free",
    depositAmount: 0,
    depositDisplay: "Free with ID",
    platformFeeDisplay: "₹0",
    totalPaidDisplay: "₹0 (Returned on time)",
    conditionAtHandover: "Excellent",
    conditionNotes: ["Returned clean in original sleeve"],
    includedAccessories: ["67W MagSafe Charger", "Neoprene Sleeve"],
    ratingGiven: 5.0,
    lifecycle: [
      { stage: "REQUESTED", label: "Requested", isCompleted: true, isCurrent: false },
      { stage: "ACCEPTED", label: "Accepted", isCompleted: true, isCurrent: false },
      { stage: "HANDOVER", label: "Handover", isCompleted: true, isCurrent: false },
      { stage: "BORROWED", label: "Borrowed", isCompleted: true, isCurrent: false },
      { stage: "RETURN_DUE", label: "Return Due", isCompleted: true, isCurrent: false },
      { stage: "RETURNED", label: "Returned", isCompleted: true, isCurrent: false },
      { stage: "INSPECTION", label: "Inspection", isCompleted: true, isCurrent: false },
      { stage: "SETTLEMENT", label: "Settlement", isCompleted: true, isCurrent: false },
      { stage: "RATED", label: "Rated", isCompleted: true, isCurrent: true },
    ],
  },
  {
    id: "loan-guitar-completed",
    resourceName: "Yamaha F310 Acoustic Guitar",
    category: "Music",
    cardColor: BRAND_COLORS.pastelCoral,
    status: "Completed",
    statusColor: "#DCFCE7",
    ownerName: "Chris Fernandez",
    ownerAvatar: "C",
    ownerTrustScore: 96,
    ownerRating: 4.8,
    isOwnerVerified: true,
    locationName: "Dorm B Music Room",
    distanceKm: 1.8,
    borrowedDate: "Jul 20, 2026",
    dueDate: "Jul 24, 2026",
    dueDaysRemaining: 0,
    isOverdue: false,
    pricePerDay: 80,
    priceDisplay: "₹80/day",
    depositAmount: 200,
    depositDisplay: "₹200 deposit",
    platformFeeDisplay: "₹0",
    totalPaidDisplay: "₹520 total (Deposit refunded)",
    conditionAtHandover: "Good",
    conditionNotes: ["Returned with fresh strings"],
    includedAccessories: ["Gig bag", "Capo", "Picks"],
    ratingGiven: 4.8,
    lifecycle: [
      { stage: "REQUESTED", label: "Requested", isCompleted: true, isCurrent: false },
      { stage: "ACCEPTED", label: "Accepted", isCompleted: true, isCurrent: false },
      { stage: "HANDOVER", label: "Handover", isCompleted: true, isCurrent: false },
      { stage: "BORROWED", label: "Borrowed", isCompleted: true, isCurrent: false },
      { stage: "RETURN_DUE", label: "Return Due", isCompleted: true, isCurrent: false },
      { stage: "RETURNED", label: "Returned", isCompleted: true, isCurrent: false },
      { stage: "INSPECTION", label: "Inspection", isCompleted: true, isCurrent: false },
      { stage: "SETTLEMENT", label: "Settlement", isCompleted: true, isCurrent: false },
      { stage: "RATED", label: "Rated", isCompleted: true, isCurrent: true },
    ],
  },
];
