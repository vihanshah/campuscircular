import { BRAND_COLORS } from "./theme";

export interface StudentProfile {
  name: string;
  major: string;
  year: string;
  campus: string;
  username: string;
  email: string;
  avatarInitial: string;
  avatarBg: string;
  bio: string;

  // Trust Score
  trustScore: number;
  averageRating: number;
  reviewCount: number;
  identityVerified: boolean;
  successfulExchanges: number;
  ontimeReturnPct: number;
  unresolvedDisputes: number;

  // Activity Overview
  itemsSharedCount: number;
  resourcesBorrowedCount: number;

  // Impact
  resourcesCirculatingCount: number;
  studentsHelpedCount: number;
  estimatedSavingsDisplay: string;
}

export interface StudentReview {
  id: string;
  rating: number;
  comment: string;
  authorName: string;
  authorRole: string;
  dateAgo: string;
}

export interface ProfileExchangeHistoryItem {
  id: string;
  resourceName: string;
  category: string;
  cardColor: string;
  type: "Borrowing" | "Lending";
  status: string;
  rating: number;
  dateRange: string;
  loanCount?: number;
}

export const MOCK_STUDENT_PROFILE: StudentProfile = {
  name: "Alex Morgan",
  major: "Computer Science",
  year: "3rd Year",
  campus: "TSEC Campus",
  username: "@alex_morgan",
  email: "alex.morgan@tsec.edu",
  avatarInitial: "A",
  avatarBg: "#E8DEF8",
  bio: "Passionate about open tech, photography, and building a sustainable campus community.",
  
  trustScore: 94,
  averageRating: 4.9,
  reviewCount: 18,
  identityVerified: true,
  successfulExchanges: 12,
  ontimeReturnPct: 100,
  unresolvedDisputes: 0,

  itemsSharedCount: 8,
  resourcesBorrowedCount: 14,

  resourcesCirculatingCount: 8,
  studentsHelpedCount: 12,
  estimatedSavingsDisplay: "₹4,200",
};

export const MOCK_COMMUNITY_REVIEWS: StudentReview[] = [
  {
    id: "rev-1",
    rating: 5.0,
    comment: "Returned the camera in perfect condition. Great communication throughout!",
    authorName: "Priya Patel",
    authorRole: "Film Guild Exec",
    dateAgo: "2 days ago",
  },
  {
    id: "rev-2",
    rating: 5.0,
    comment: "Very responsible borrower. Gear was returned clean and on time.",
    authorName: "Rohan Varma",
    authorRole: "Tech Club Lead",
    dateAgo: "1 week ago",
  },
  {
    id: "rev-3",
    rating: 4.8,
    comment: "Super helpful lender, explained all lens controls before handover!",
    authorName: "Maya Lin",
    authorRole: "Design Student",
    dateAgo: "2 weeks ago",
  },
];

export const MOCK_PROFILE_HISTORY: ProfileExchangeHistoryItem[] = [
  {
    id: "h1",
    resourceName: "Sony Alpha A7 IV Camera Kit",
    category: "Photography",
    cardColor: BRAND_COLORS.pastelLavender,
    type: "Borrowing",
    status: "Completed",
    rating: 4.9,
    dateRange: "Aug 25 – Aug 29",
  },
  {
    id: "h2",
    resourceName: "HD 4K Portable Cinema Projector",
    category: "Events",
    cardColor: BRAND_COLORS.pastelLime,
    type: "Borrowing",
    status: "Returned",
    rating: 5.0,
    dateRange: "Aug 15 – Aug 18",
  },
  {
    id: "h3",
    resourceName: "MacBook Pro M2 (16GB RAM)",
    category: "Electronics",
    cardColor: BRAND_COLORS.pastelYellow,
    type: "Lending",
    status: "Active",
    rating: 5.0,
    dateRange: "Aug 20 – Present",
    loanCount: 8,
  },
  {
    id: "h4",
    resourceName: "Yamaha Acoustic Guitar",
    category: "Music",
    cardColor: BRAND_COLORS.pastelCoral,
    type: "Lending",
    status: "Available",
    rating: 4.8,
    dateRange: "Shared",
    loanCount: 11,
  },
];
