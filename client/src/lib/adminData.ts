export interface AdminMetric {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  accentColor: string;
}

export interface AttentionItemData {
  id: string;
  type: "overdue" | "dispute" | "verification" | "flagged";
  title: string;
  subtitle: string;
  badgeText: string;
  badgeBg: string;
  badgeTextColor: string;
  actionText: string;
}

export interface ActiveExchange {
  id: string;
  resourceName: string;
  category: string;
  borrowerName: string;
  ownerName: string;
  status: "Borrowed" | "Handover" | "Overdue" | "Agreement Pending";
  statusBg: string;
  statusTextColor: string;
  returnDueDate: string;
}

export interface OpenDispute {
  id: string;
  resourceName: string;
  issueType: string;
  borrowerName: string;
  ownerName: string;
  timeAgo: string;
  status: "Requires Review" | "Under Investigation" | "Resolved";
  statusBg: string;
  statusTextColor: string;
  description: string;
}

export interface RecentActivityLog {
  id: string;
  iconType: "listing" | "completed" | "overdue" | "dispute";
  title: string;
  description: string;
  timestamp: string;
}

export const MOCK_ADMIN_METRICS: AdminMetric[] = [
  { label: "Total Resources", value: "1,248", change: "+14 this week", isPositive: true, accentColor: "#00F2FE" },
  { label: "Active Exchanges", value: "86", change: "+8 today", isPositive: true, accentColor: "#34D399" },
  { label: "Pending Requests", value: "32", change: "Requires review", isPositive: true, accentColor: "#FDF0A6" },
  { label: "Overdue Items", value: "7", change: "3 critical", isPositive: false, accentColor: "#F87171" },
  { label: "Open Disputes", value: "3", change: "2 unassigned", isPositive: false, accentColor: "#F87171" },
  { label: "Verified Students", value: "2,486", change: "98.4% verified", isPositive: true, accentColor: "#B92CFF" },
];

export const MOCK_ATTENTION_ITEMS: AttentionItemData[] = [
  {
    id: "att-1",
    type: "overdue",
    title: "7 overdue resources",
    subtitle: "3 items have been overdue for more than 2 days (Sony Camera, Laptop, Mic)",
    badgeText: "CRITICAL OVERDUE",
    badgeBg: "#7F1D1D",
    badgeTextColor: "#FCA5A5",
    actionText: "Review Overdue →",
  },
  {
    id: "att-2",
    type: "dispute",
    title: "3 open disputes",
    subtitle: "2 require immediate administrator review (Lens scratch report, Late return dispute)",
    badgeText: "REQUIRES ACTION",
    badgeBg: "#78350F",
    badgeTextColor: "#FDE047",
    actionText: "Review Disputes →",
  },
  {
    id: "att-3",
    type: "verification",
    title: "12 pending verification requests",
    subtitle: "New student ID upload verifications awaiting approval",
    badgeText: "VERIFICATION",
    badgeBg: "#312E81",
    badgeTextColor: "#A5B4FC",
    actionText: "Verify Users →",
  },
  {
    id: "att-4",
    type: "flagged",
    title: "5 resources flagged for review",
    subtitle: "Community reports regarding condition or pricing discrepancy",
    badgeText: "COMMUNITY REPORT",
    badgeBg: "#1F2937",
    badgeTextColor: "#9CA3AF",
    actionText: "Inspect Flagged →",
  },
];

export const MOCK_ACTIVE_EXCHANGES: ActiveExchange[] = [
  {
    id: "ex-1",
    resourceName: "Sony Alpha A7 IV Camera Kit",
    category: "Photography",
    borrowerName: "Alex Morgan",
    ownerName: "Arjun Sharma",
    status: "Borrowed",
    statusBg: "#065F46",
    statusTextColor: "#A7F3D0",
    returnDueDate: "Aug 29, 2026",
  },
  {
    id: "ex-2",
    resourceName: "HD 4K Portable Cinema Projector",
    category: "Events",
    borrowerName: "Riya Shah",
    ownerName: "Kabir Mehta",
    status: "Handover",
    statusBg: "#1E3A8A",
    statusTextColor: "#BFDBFE",
    returnDueDate: "Aug 28, 2026",
  },
  {
    id: "ex-3",
    resourceName: "MacBook Pro M2 (16GB RAM)",
    category: "Electronics",
    borrowerName: "Neha Gupta",
    ownerName: "Rahul Verma",
    status: "Overdue",
    statusBg: "#991B1B",
    statusTextColor: "#FCA5A5",
    returnDueDate: "Aug 25, 2026 (2 days overdue)",
  },
  {
    id: "ex-4",
    resourceName: "Shure SM7B Studio Podcast Mic",
    category: "Photography",
    borrowerName: "Leo Vance",
    ownerName: "Maya Lin",
    status: "Agreement Pending",
    statusBg: "#581C87",
    statusTextColor: "#E9D5FF",
    returnDueDate: "Sep 01, 2026",
  },
];

export const MOCK_OPEN_DISPUTES: OpenDispute[] = [
  {
    id: "disp-1",
    resourceName: "Sony Camera 24-70mm Lens",
    issueType: "Damage Reported",
    borrowerName: "Alex Morgan",
    ownerName: "Arjun Sharma",
    timeAgo: "2 hours ago",
    status: "Requires Review",
    statusBg: "#7F1D1D",
    statusTextColor: "#FCA5A5",
    description: "Owner reports minor hairline scratch on front element filter upon return inspection.",
  },
  {
    id: "disp-2",
    resourceName: "Epson 4K Projector Screen",
    issueType: "Late Return Dispute",
    borrowerName: "Rohan Varma",
    ownerName: "Kabir Mehta",
    timeAgo: "5 hours ago",
    status: "Under Investigation",
    statusBg: "#78350F",
    statusTextColor: "#FDE047",
    description: "Borrower claims handover location was locked during agreed drop-off window.",
  },
  {
    id: "disp-3",
    resourceName: "Yamaha Acoustic Guitar",
    issueType: "Missing Accessory",
    borrowerName: "Aria Roy",
    ownerName: "Dev Patel",
    timeAgo: "1 day ago",
    status: "Requires Review",
    statusBg: "#7F1D1D",
    statusTextColor: "#FCA5A5",
    description: "Gig bag digital tuner unit not included in return package.",
  },
];

export const MOCK_RECENT_ACTIVITY: RecentActivityLog[] = [
  {
    id: "act-1",
    iconType: "listing",
    title: "New resource listed",
    description: "Canon EOS R6 Kit added by Arjun Sharma",
    timestamp: "10 mins ago",
  },
  {
    id: "act-2",
    iconType: "completed",
    title: "Exchange completed",
    description: "Projector returned by Riya Shah to Kabir Mehta",
    timestamp: "32 mins ago",
  },
  {
    id: "act-3",
    iconType: "overdue",
    title: "Overdue alert triggered",
    description: "MacBook Pro M2 is now 2 days overdue",
    timestamp: "1 hour ago",
  },
  {
    id: "act-4",
    iconType: "dispute",
    title: "Dispute opened",
    description: "Damage report submitted for Sony Camera Lens",
    timestamp: "2 hours ago",
  },
];

export const MOCK_ACTIVITY_CHART_DATA = [
  { day: "Mon", requests: 42, accepted: 38, completed: 35 },
  { day: "Tue", requests: 58, accepted: 50, completed: 46 },
  { day: "Wed", requests: 65, accepted: 60, completed: 52 },
  { day: "Thu", requests: 86, accepted: 74, completed: 68 },
  { day: "Fri", requests: 92, accepted: 82, completed: 78 },
  { day: "Sat", requests: 110, accepted: 98, completed: 90 },
  { day: "Sun", requests: 78, accepted: 70, completed: 65 },
];
