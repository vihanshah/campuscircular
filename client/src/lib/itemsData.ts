import { BRAND_COLORS } from "./theme";

export type ItemStatus = "Available" | "Currently Borrowed" | "Pending Request" | "Paused" | "Unavailable";

export interface OwnedResource {
  id: string;
  name: string;
  category: "Photography" | "Electronics" | "Books" | "Music" | "Events" | "Sports" | "Tools";
  cardColor: string;
  status: ItemStatus;
  statusBg: string;
  statusTextColor: string;
  condition: "New" | "Excellent" | "Good" | "Fair";
  pricePerDay: number;
  priceDisplay: string;
  depositDisplay: string;
  successfulLoansCount: number;
  rating: number;
  description: string;
  borrowerName?: string;
  returnDueDate?: string;
  rules: string[];
  earningsTotal: string;
}

export interface IncomingBorrowRequest {
  id: string;
  resourceId: string;
  resourceName: string;
  requesterName: string;
  requesterAvatar: string;
  isRequesterVerified: boolean;
  requesterTrustScore: number;
  requestedDates: string;
  purposeNotes: string;
  requestDate: string;
}

export const MOCK_OWNED_ITEMS: OwnedResource[] = [
  {
    id: "item-sony-camera",
    name: "Sony Alpha A7 IV Camera Kit",
    category: "Photography",
    cardColor: BRAND_COLORS.pastelLavender,
    status: "Currently Borrowed",
    statusBg: "#E8DEF8",
    statusTextColor: "#6B21A8",
    condition: "Excellent",
    pricePerDay: 120,
    priceDisplay: "₹120/day",
    depositDisplay: "₹500 deposit",
    successfulLoansCount: 14,
    rating: 4.9,
    description: "Includes 24-70mm f/2.8 GM lens, 2 batteries, charger, and 128GB SD card.",
    borrowerName: "Alex Chen",
    returnDueDate: "Aug 30, 2026",
    rules: [
      "Handle with care (camera strap must be worn)",
      "Return before 6:00 PM at Media Lab",
      "All 5 accessories must be returned together"
    ],
    earningsTotal: "₹3,360",
  },
  {
    id: "item-epson-projector",
    name: "HD 4K Portable Cinema Projector",
    category: "Events",
    cardColor: BRAND_COLORS.pastelLime,
    status: "Available",
    statusBg: "#E2F1D0",
    statusTextColor: "#15803D",
    condition: "Excellent",
    pricePerDay: 150,
    priceDisplay: "₹150/day",
    depositDisplay: "₹300 deposit",
    successfulLoansCount: 8,
    rating: 4.9,
    description: "Ultra-bright 4K projector with HDMI/USB-C cables and portable 84-inch folding screen.",
    rules: [
      "Keep lens covered when transporting",
      "College ID required at handover"
    ],
    earningsTotal: "₹1,800",
  },
  {
    id: "item-macbook-pro",
    name: "MacBook Pro M2 (16GB RAM · 1TB)",
    category: "Electronics",
    cardColor: BRAND_COLORS.pastelYellow,
    status: "Pending Request",
    statusBg: "#FDF0A6",
    statusTextColor: "#854D0E",
    condition: "New",
    pricePerDay: 0,
    priceDisplay: "Free",
    depositDisplay: "Free with ID",
    successfulLoansCount: 6,
    rating: 5.0,
    description: "M2 Pro chip, 16GB RAM, preinstalled with VS Code and Python ML libraries.",
    rules: [
      "No unauthorized software installation",
      "Return in protective neoprene sleeve"
    ],
    earningsTotal: "₹0 (Free Community Share)",
  },
  {
    id: "item-guitar",
    name: "Yamaha F310 Acoustic Guitar",
    category: "Music",
    cardColor: BRAND_COLORS.pastelCoral,
    status: "Available",
    statusBg: "#E2F1D0",
    statusTextColor: "#15803D",
    condition: "Good",
    pricePerDay: 80,
    priceDisplay: "₹80/day",
    depositDisplay: "₹200 deposit",
    successfulLoansCount: 11,
    rating: 4.8,
    description: "Full-size acoustic guitar with capo, digital tuner, picks, and padded gig bag.",
    rules: [
      "Store in padded gig bag when not in use",
      "Do not loosen truss rod"
    ],
    earningsTotal: "₹1,440",
  },
  {
    id: "item-mic-shure",
    name: "Shure SM7B Podcast Studio Mic",
    category: "Photography",
    cardColor: BRAND_COLORS.pastelLavender,
    status: "Available",
    statusBg: "#E2F1D0",
    statusTextColor: "#15803D",
    condition: "New",
    pricePerDay: 200,
    priceDisplay: "₹200/day",
    depositDisplay: "₹500 deposit",
    successfulLoansCount: 5,
    rating: 5.0,
    description: "Broadcasting dynamic microphone with Cloudlifter CL-1 pre-amp and desk boom arm.",
    rules: [
      "Use pop filter at all times",
      "Return in original flight case"
    ],
    earningsTotal: "₹1,200",
  },
  {
    id: "item-soldering-kit",
    name: "Digital Soldering & Electronics Station",
    category: "Tools",
    cardColor: BRAND_COLORS.pastelYellow,
    status: "Paused",
    statusBg: "#F3EFE6",
    statusTextColor: "#666055",
    condition: "Excellent",
    pricePerDay: 0,
    priceDisplay: "Free",
    depositDisplay: "Free with ID",
    successfulLoansCount: 4,
    rating: 4.9,
    description: "Complete electronics prototyping kit with ESD mat, multimeter, solder wire, and iron.",
    rules: [
      "Use ESD safety wrist strap",
      "Unplug station after use"
    ],
    earningsTotal: "₹0",
  },
];

export const MOCK_INCOMING_REQUESTS: IncomingBorrowRequest[] = [
  {
    id: "inc-req-1",
    resourceId: "item-sony-camera",
    resourceName: "Sony Alpha A7 IV Camera Kit",
    requesterName: "Leo Vance",
    requesterAvatar: "L",
    isRequesterVerified: true,
    requesterTrustScore: 94,
    requestedDates: "Sep 02 → Sep 05, 2026",
    purposeNotes: "Design Department annual magazine photo shoot.",
    requestDate: "Today, 10:15 AM",
  },
  {
    id: "inc-req-2",
    resourceId: "item-macbook-pro",
    resourceName: "MacBook Pro M2 (16GB RAM)",
    requesterName: "Aria Roy",
    requesterAvatar: "A",
    isRequesterVerified: true,
    requesterTrustScore: 98,
    requestedDates: "Aug 31 → Sep 02, 2026",
    purposeNotes: "Hackathon ML model training session at CS Lab.",
    requestDate: "Today, 08:30 AM",
  },
];
