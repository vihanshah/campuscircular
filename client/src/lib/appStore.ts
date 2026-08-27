import { useState, useEffect } from "react";
import { BRAND_COLORS } from "./theme";

// ─── TYPES ───────────────────────────────────────────────────────────────────

export interface DemoStudent {
  id: string; // CC1001 ... CC1010
  name: string;
  email: string;
  password: string;
  studentId: string; // CC1001
  department: string;
  year: string;
  location: string;
  avatar: string;
  avatarBg: string;
  handle: string;
  isVerified: boolean;
  trustScore: number;
  rating: number;
  totalExchanges: number;
  onTimeReturnPct: number;
  co2SavedKg: number;
  moneySavedRupees: number;
}

export interface SharedResource {
  id: string;
  name: string;
  category: "Photography" | "Electronics" | "Books" | "Music" | "Events" | "Sports" | "Tools";
  ownerId: string; // CC1001 ... CC1010
  ownerName: string;
  ownerAvatar: string;
  isAvailable: boolean;
  isAvailableNow: boolean;
  isOwnerVerified: boolean;
  ownerTrustScore: string;
  availability: "Available now" | "Any" | "Available on selected date";
  distanceKm: number;
  locationName: string;
  condition: "Excellent" | "Good" | "New";
  rating: number;
  pricePerDay: number;
  priceDisplay: string;
  depositDisplay: string;
  cardColor: string;
  description: string;
  imageUrl?: string;
  matchPct: number;
  matchReasons: string[];
  mapCoords: { xPct: number; yPct: number };
}

export interface SharedRequest {
  id: string;
  resourceId: string;
  resourceName: string;
  category: string;
  cardColor: string;
  requesterId: string; // Borrower student ID (e.g. CC1003)
  requesterName: string;
  requesterTrustScore: number;
  ownerId: string; // Owner student ID (e.g. CC1007)
  ownerName: string;
  requestedDates: string;
  purpose: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "HANDOVER" | "COMPLETED" | "CANCELLED";
  statusText: string;
  handoverLocation: string;
  priceDisplay: string;
  depositDisplay: string;
  totalDisplay: string;
  createdAt: string;
}

export interface SharedLoan {
  id: string;
  requestId: string;
  resourceId: string;
  resourceName: string;
  category: string;
  borrowerId: string;
  borrowerName: string;
  ownerId: string;
  ownerName: string;
  dueDate: string;
  dueDaysText: string;
  status: "ACTIVE" | "DUE_SOON" | "RETURNED";
  cardColor: string;
}

export interface SharedDispute {
  id: string;
  resourceName: string;
  borrowerName: string;
  ownerName: string;
  reason: string;
  status: "OPEN" | "RESOLVED";
  createdAt: string;
}

export interface SharedActivityLog {
  id: string;
  timestamp: string;
  text: string;
  type: "REQUEST" | "ACCEPT" | "RESOURCE_ADD" | "RETURN" | "USER";
}

export interface SharedChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  sender: "you" | "partner";
  text: string;
  timestamp: string;
}

export interface SharedChatThread {
  id: string;
  partnerName: string;
  partnerRole: string;
  partnerAvatar: string;
  avatarBg: string;
  itemBadge: string;
  handoverLocation: string;
  lastMessage: string;
  lastTime: string;
  messages: SharedChatMessage[];
}

export interface AppStoreData {
  users: DemoStudent[];
  resources: SharedResource[];
  requests: SharedRequest[];
  loans: SharedLoan[];
  disputes: SharedDispute[];
  activity: SharedActivityLog[];
  chatThreads?: SharedChatThread[];
  currentUser: DemoStudent | null;
  currentRole: "student" | "admin";
}

// ─── INITIAL 10 DEMO STUDENTS (CC1001 → CC1010) ──────────────────────────────

export const DEMO_STUDENTS: DemoStudent[] = [
  {
    id: "CC1001",
    name: "Aarav Sharma",
    email: "aarav.sharma@tsec.edu",
    password: "pass1001",
    studentId: "CC1001",
    department: "Computer Science",
    year: "3rd Year",
    location: "CS Tech Hub",
    avatar: "A",
    avatarBg: "#FFD928",
    handle: "@aarav_cs",
    isVerified: true,
    trustScore: 98,
    rating: 4.9,
    totalExchanges: 24,
    onTimeReturnPct: 100,
    co2SavedKg: 52,
    moneySavedRupees: 6500,
  },
  {
    id: "CC1002",
    name: "Ananya Verma",
    email: "ananya.verma@tsec.edu",
    password: "pass1002",
    studentId: "CC1002",
    department: "Graphic Design",
    year: "2nd Year",
    location: "Arts Wing",
    avatar: "A",
    avatarBg: "#E8DEF8",
    handle: "@ananya_design",
    isVerified: true,
    trustScore: 96,
    rating: 4.8,
    totalExchanges: 18,
    onTimeReturnPct: 98,
    co2SavedKg: 38,
    moneySavedRupees: 4200,
  },
  {
    id: "CC1003",
    name: "Rohan Mehta",
    email: "rohan.mehta@tsec.edu",
    password: "pass1003",
    studentId: "CC1003",
    department: "Mechanical Engineering",
    year: "3rd Year",
    location: "Engineering Block B",
    avatar: "R",
    avatarBg: "#D7F3EB",
    handle: "@rohan_mech",
    isVerified: true,
    trustScore: 99,
    rating: 5.0,
    totalExchanges: 32,
    onTimeReturnPct: 100,
    co2SavedKg: 64,
    moneySavedRupees: 7800,
  },
  {
    id: "CC1004",
    name: "Priya Nair",
    email: "priya.nair@tsec.edu",
    password: "pass1004",
    studentId: "CC1004",
    department: "Media & Film Guild",
    year: "4th Year",
    location: "Media Lab",
    avatar: "P",
    avatarBg: "#FEE2E2",
    handle: "@priya_film",
    isVerified: true,
    trustScore: 100,
    rating: 5.0,
    totalExchanges: 45,
    onTimeReturnPct: 100,
    co2SavedKg: 88,
    moneySavedRupees: 12500,
  },
  {
    id: "CC1005",
    name: "Kabir Patel",
    email: "kabir.patel@tsec.edu",
    password: "pass1005",
    studentId: "CC1005",
    department: "Electronics & Hardware",
    year: "4th Year",
    location: "Hardware Hub",
    avatar: "K",
    avatarBg: "#E2F1D0",
    handle: "@kabir_ee",
    isVerified: true,
    trustScore: 95,
    rating: 4.7,
    totalExchanges: 15,
    onTimeReturnPct: 96,
    co2SavedKg: 29,
    moneySavedRupees: 3600,
  },
  {
    id: "CC1006",
    name: "Diya Sengupta",
    email: "diya.sengupta@tsec.edu",
    password: "pass1006",
    studentId: "CC1006",
    department: "Mathematics Honor",
    year: "2nd Year",
    location: "Science Quad",
    avatar: "D",
    avatarBg: "#E0F2FE",
    handle: "@diya_math",
    isVerified: true,
    trustScore: 97,
    rating: 4.9,
    totalExchanges: 21,
    onTimeReturnPct: 100,
    co2SavedKg: 41,
    moneySavedRupees: 5100,
  },
  {
    id: "CC1007",
    name: "Alex Rivera",
    email: "alex.rivera@tsec.edu",
    password: "pass1007",
    studentId: "CC1007",
    department: "Cinema & Photography",
    year: "3rd Year",
    location: "Student Center",
    avatar: "A",
    avatarBg: "#FFD928",
    handle: "@alex_cinema",
    isVerified: true,
    trustScore: 98,
    rating: 4.9,
    totalExchanges: 29,
    onTimeReturnPct: 99,
    co2SavedKg: 58,
    moneySavedRupees: 8200,
  },
  {
    id: "CC1008",
    name: "Vikram Joshi",
    email: "vikram.joshi@tsec.edu",
    password: "pass1008",
    studentId: "CC1008",
    department: "Music & Performing Arts",
    year: "2nd Year",
    location: "Dorm B Quad",
    avatar: "V",
    avatarBg: "#E8DEF8",
    handle: "@vikram_music",
    isVerified: true,
    trustScore: 94,
    rating: 4.7,
    totalExchanges: 14,
    onTimeReturnPct: 95,
    co2SavedKg: 26,
    moneySavedRupees: 3100,
  },
  {
    id: "CC1009",
    name: "Sanya Kapoor",
    email: "sanya.kapoor@tsec.edu",
    password: "pass1009",
    studentId: "CC1009",
    department: "Biotechnology Lab",
    year: "3rd Year",
    location: "Bio Lab C",
    avatar: "S",
    avatarBg: "#D7F3EB",
    handle: "@sanya_bio",
    isVerified: true,
    trustScore: 99,
    rating: 5.0,
    totalExchanges: 27,
    onTimeReturnPct: 100,
    co2SavedKg: 51,
    moneySavedRupees: 6900,
  },
  {
    id: "CC1010",
    name: "Tanmay Bhatia",
    email: "tanmay.bhatia@tsec.edu",
    password: "pass1010",
    studentId: "CC1010",
    department: "Robotics & AI",
    year: "4th Year",
    location: "Innovation Lab",
    avatar: "T",
    avatarBg: "#FDF0A6",
    handle: "@tanmay_robotics",
    isVerified: true,
    trustScore: 96,
    rating: 4.8,
    totalExchanges: 19,
    onTimeReturnPct: 97,
    co2SavedKg: 35,
    moneySavedRupees: 4800,
  },
];

// ─── INITIAL RESOURCES DATASET ──────────────────────────────────────────────

export const INITIAL_RESOURCES: SharedResource[] = [
  {
    id: "res-canon-camera",
    name: "Canon EOS Rebel DSLR Kit",
    category: "Photography",
    ownerId: "CC1007", // Owned by Alex Rivera
    ownerName: "Alex Rivera",
    ownerAvatar: "A",
    isAvailable: true,
    availability: "Available now",
    distanceKm: 0.8,
    locationName: "Media Lab · TSEC Campus",
    condition: "Excellent",
    rating: 4.9,
    pricePerDay: 120,
    priceDisplay: "₹120/day",
    depositDisplay: "₹500 deposit",
    cardColor: BRAND_COLORS.pastelLavender,
    description: "Complete Canon DSLR photography kit with 18-55mm lens, dual batteries, 64GB SD card & padded carry bag.",
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80",
    matchPct: 98,
    matchReasons: ["Available on requested dates", "0.8 km away", "Trusted owner (29 loans)"],
  },
  {
    id: "res-sony-camera",
    name: "Sony Alpha A7 IV 4K Camera",
    category: "Photography",
    ownerId: "CC1004", // Owned by Priya Nair
    ownerName: "Priya Nair",
    ownerAvatar: "P",
    isAvailable: true,
    availability: "Available now",
    distanceKm: 1.2,
    locationName: "Media Lab",
    condition: "Like New",
    rating: 5.0,
    pricePerDay: 200,
    priceDisplay: "₹200/day",
    depositDisplay: "₹1000 deposit",
    cardColor: BRAND_COLORS.pastelYellow,
    description: "Professional full-frame cinema camera with 4K 60fps recording, E-mount lens & wireless remote.",
    imageUrl: "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=600&q=80",
    matchPct: 96,
    matchReasons: ["Top rated lender", "Full cinema 4K", "1.2 km away"],
  },
  {
    id: "res-macbook",
    name: "MacBook Pro M2 (16GB RAM)",
    category: "Electronics",
    ownerId: "CC1001", // Owned by Aarav Sharma
    ownerName: "Aarav Sharma",
    ownerAvatar: "A",
    isAvailable: true,
    availability: "Available now",
    distanceKm: 0.5,
    locationName: "CS Tech Hub",
    condition: "Excellent",
    rating: 4.9,
    pricePerDay: 0,
    priceDisplay: "Free",
    depositDisplay: "Free with ID",
    cardColor: BRAND_COLORS.pastelMint,
    description: "High performance M2 MacBook Pro loaded with Xcode, VS Code, Python, PyTorch & video editing tools.",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    matchPct: 94,
    matchReasons: ["Free peer loan", "0.5 km away", "CS department verified"],
  },
  {
    id: "res-calculator",
    name: "Casio FX-991EX Scientific Calculator",
    category: "Books",
    ownerId: "CC1006", // Owned by Diya Sengupta
    ownerName: "Diya Sengupta",
    ownerAvatar: "D",
    isAvailable: true,
    availability: "Available now",
    distanceKm: 0.4,
    locationName: "Science Quad",
    condition: "Excellent",
    rating: 4.9,
    pricePerDay: 0,
    priceDisplay: "Free",
    depositDisplay: "Free with ID",
    cardColor: BRAND_COLORS.pastelLime,
    description: "Standard engineering & math exam approved non-programmable matrix scientific calculator.",
    matchPct: 99,
    matchReasons: ["Exam approved", "0.4 km away", "Immediate pickup"],
  },
  {
    id: "res-guitar",
    name: "Yamaha F310 Acoustic Guitar",
    category: "Music",
    ownerId: "CC1008", // Owned by Vikram Joshi
    ownerName: "Vikram Joshi",
    ownerAvatar: "V",
    isAvailable: true,
    availability: "Available now",
    distanceKm: 1.5,
    locationName: "Dorm B Quad",
    condition: "Good",
    rating: 4.8,
    pricePerDay: 50,
    priceDisplay: "₹50/day",
    depositDisplay: "₹200 deposit",
    cardColor: BRAND_COLORS.pastelCoral,
    description: "Full size acoustic guitar with fresh D'Addario steel strings, soft bag, tuner & picks.",
    imageUrl: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=600&q=80",
    matchPct: 92,
    matchReasons: ["Music club verified", "Fresh strings", "Budget friendly"],
  },
  {
    id: "res-projector",
    name: "HD 4K Portable Cinema Projector",
    category: "Events",
    ownerId: "CC1004", // Owned by Priya Nair
    ownerName: "Priya Nair",
    ownerAvatar: "P",
    isAvailable: true,
    availability: "Available now",
    distanceKm: 1.2,
    locationName: "Student Center",
    condition: "Excellent",
    rating: 5.0,
    pricePerDay: 150,
    priceDisplay: "₹150/day",
    depositDisplay: "₹300 deposit",
    cardColor: BRAND_COLORS.pastelLavender,
    description: "350 ANSI Lumen wireless projector with HDMI/Type-C inputs, Harman Kardon speakers & 100-inch screen.",
    matchPct: 95,
    matchReasons: ["Club events ready", "Wireless casting", "100-inch screen"],
  },
  {
    id: "res-shure-mic",
    name: "Shure SM7B Studio Podcast Mic",
    category: "Music",
    ownerId: "CC1002", // Owned by Ananya Verma
    ownerName: "Ananya Verma",
    ownerAvatar: "A",
    isAvailable: true,
    availability: "Available now",
    distanceKm: 1.0,
    locationName: "Arts Wing",
    condition: "Like New",
    rating: 4.8,
    pricePerDay: 100,
    priceDisplay: "₹100/day",
    depositDisplay: "₹400 deposit",
    cardColor: BRAND_COLORS.pastelYellow,
    description: "Cardioid dynamic studio microphone for podcasts, vocals & broadcasts. Includes XLR cable & boom arm.",
    matchPct: 93,
    matchReasons: ["Broadcast quality", "Includes boom arm", "1.0 km away"],
  },
  {
    id: "res-robotics-kit",
    name: "Arduino & Raspberry Pi 4 Robotics Kit",
    category: "Electronics",
    ownerId: "CC1010", // Owned by Tanmay Bhatia
    ownerName: "Tanmay Bhatia",
    ownerAvatar: "T",
    isAvailable: true,
    availability: "Available now",
    distanceKm: 0.6,
    locationName: "Innovation Hub",
    condition: "Excellent",
    rating: 4.8,
    pricePerDay: 0,
    priceDisplay: "Free",
    depositDisplay: "Free with ID",
    cardColor: BRAND_COLORS.pastelMint,
    description: "Complete electronics prototyping bundle with sensors, motor drivers, breadboards, jumper wires & RPi 4.",
    matchPct: 97,
    matchReasons: ["Robotics lab approved", "Free student loan", "0.6 km away"],
  },
].map((res) => ({
  ...res,
  category: res.category as SharedResource["category"],
  condition: (res.condition === "Like New" ? "Excellent" : res.condition) as SharedResource["condition"],
  availability: "Available now" as const,
  isAvailableNow: true,
  isOwnerVerified: true,
  ownerTrustScore: "98% Verified",
  mapCoords: { xPct: 45, yPct: 55 },
})) as SharedResource[];

// ─── INITIAL REQUESTS ────────────────────────────────────────────────────────

export const INITIAL_REQUESTS: SharedRequest[] = [
  {
    id: "req-101",
    resourceId: "res-canon-camera",
    resourceName: "Canon EOS Rebel DSLR Kit",
    category: "Photography",
    cardColor: BRAND_COLORS.pastelLavender,
    requesterId: "CC1003", // Rohan Mehta wants to borrow
    requesterName: "Rohan Mehta (CC1003)",
    requesterTrustScore: 99,
    ownerId: "CC1007", // Alex Rivera owns it
    ownerName: "Alex Rivera (CC1007)",
    requestedDates: "Aug 28 → Aug 30, 2026",
    purpose: "Short documentary film shoot for Mechanical Department exhibition.",
    status: "PENDING",
    statusText: "● Awaiting owner approval",
    handoverLocation: "Media Lab · TSEC Campus",
    priceDisplay: "₹120/day",
    depositDisplay: "₹500 deposit",
    totalDisplay: "₹740 total",
    createdAt: "Aug 27, 2026",
  },
];

// ─── INITIAL LOANS ───────────────────────────────────────────────────────────

export const INITIAL_LOANS: SharedLoan[] = [
  {
    id: "loan-201",
    requestId: "req-old-01",
    resourceId: "res-calculator",
    resourceName: "Casio FX-991EX Calculator",
    category: "Books",
    borrowerId: "CC1003", // Rohan Mehta borrowed
    borrowerName: "Rohan Mehta",
    ownerId: "CC1006", // Diya Sengupta owns
    ownerName: "Diya Sengupta",
    dueDate: "Sep 02, 2026",
    dueDaysText: "Due in 6 days",
    status: "ACTIVE",
    cardColor: BRAND_COLORS.pastelLime,
  },
];

export const DEFAULT_CHAT_THREADS: SharedChatThread[] = [
  {
    id: "thread-jordan",
    partnerName: "Jordan (Film Guild)",
    partnerRole: "Film Guild Exec",
    partnerAvatar: "J",
    avatarBg: "#FFD928",
    itemBadge: "Sony 4K Camera",
    handoverLocation: "Media Lab · TSEC Campus",
    lastMessage: "... finish filming with the Sony Alpha 4K camera today, ready for drop-off at Media Lab by 2pm!",
    lastTime: "14:00 Today",
    messages: [
      {
        id: "m1",
        senderId: "CC1007",
        senderName: "Jordan (Film Guild)",
        sender: "partner",
        text: "Hey! I'm finishing filming with the Sony Alpha 4K camera today, ready for drop-off at Media Lab by 2pm!",
        timestamp: "14:00 Today",
      },
      {
        id: "m2",
        senderId: "CC1003",
        senderName: "Rohan Mehta",
        sender: "you",
        text: "Awesome! I'll be near the Media Lab after my 1:30 PM lecture.",
        timestamp: "14:05 Today",
      },
    ],
  },
  {
    id: "thread-you",
    partnerName: "Engineering Lab Admin",
    partnerRole: "Lab Tech",
    partnerAvatar: "R",
    avatarBg: "#D7F3EB",
    itemBadge: "Scientific Calculator",
    handoverLocation: "Engineering Block B",
    lastMessage: "Confirmed! Returning Scientific Calculator to Engineering Block B right after my lecture.",
    lastTime: "1h ago",
    messages: [
      {
        id: "m3",
        senderId: "CC1003",
        senderName: "Rohan Mehta",
        sender: "you",
        text: "Confirmed! Returning Scientific Calculator to Engineering Block B right after my lecture.",
        timestamp: "1h ago",
      },
      {
        id: "m4",
        senderId: "CC1001",
        senderName: "Engineering Lab Admin",
        sender: "partner",
        text: "Thanks! Drop it off at Counter 3 with the lab assistant.",
        timestamp: "55m ago",
      },
    ],
  },
  {
    id: "thread-alex",
    partnerName: "Alex Rivera (Cinema Guild)",
    partnerRole: "Cinema Lead",
    partnerAvatar: "A",
    avatarBg: "#FF6755",
    itemBadge: "Acoustic Guitar",
    handoverLocation: "Student Center",
    lastMessage: "... meet tomorrow at Student Center to pick up the Yamaha Acoustic Guitar for Friday Jam session!",
    lastTime: "3h ago",
    messages: [
      {
        id: "m5",
        senderId: "CC1007",
        senderName: "Alex Rivera",
        sender: "partner",
        text: "Hey! Let me know if you can meet tomorrow at Student Center to pick up the Yamaha Acoustic Guitar for Friday Jam session!",
        timestamp: "3h ago",
      },
      {
        id: "m6",
        senderId: "CC1003",
        senderName: "Rohan Mehta",
        sender: "you",
        text: "Sounds great! Is 4:00 PM fine?",
        timestamp: "2h ago",
      },
    ],
  },
];

const STORAGE_KEY = "campus_circular_shared_db_v2";

// ─── CENTRALIZED STORE HELPERS ────────────────────────────────────────────────

export function loadAppStore(): AppStoreData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.users) && parsed.users.length >= 10) {
        if (!parsed.chatThreads || !Array.isArray(parsed.chatThreads) || parsed.chatThreads.length === 0) {
          parsed.chatThreads = DEFAULT_CHAT_THREADS;
        }
        return parsed;
      }
    }
  } catch (e) {
    console.error("Error reading shared store", e);
  }

  // Initial Store Bootstrap
  const initialStore: AppStoreData = {
    users: DEMO_STUDENTS,
    resources: INITIAL_RESOURCES,
    requests: INITIAL_REQUESTS,
    loans: INITIAL_LOANS,
    disputes: [],
    activity: [
      {
        id: "act-1",
        timestamp: "Today",
        text: "System bootstrapped with 10 verified campus students.",
        type: "USER",
      },
    ],
    chatThreads: DEFAULT_CHAT_THREADS,
    currentUser: DEMO_STUDENTS[2], // Default to CC1003 (Rohan Mehta)
    currentRole: "student",
  };

  saveAppStore(initialStore);
  return initialStore;
}

export function saveAppStore(store: AppStoreData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("campus_store_updated", { detail: store }));
    }
  } catch (e) {
    console.error("Error saving shared store", e);
  }
}

export function useAppStore(): AppStoreData {
  const [store, setStore] = useState<AppStoreData>(() => loadAppStore());

  useEffect(() => {
    const handleStoreChange = () => {
      setStore(loadAppStore());
    };
    window.addEventListener("campus_store_updated", handleStoreChange);
    window.addEventListener("storage", handleStoreChange);
    return () => {
      window.removeEventListener("campus_store_updated", handleStoreChange);
      window.removeEventListener("storage", handleStoreChange);
    };
  }, []);

  return store;
}

// ─── AUTH & SESSION HELPERS ──────────────────────────────────────────────────

export function authenticateUser(
  identifier: string,
  pass: string,
  roleTab: "student" | "admin" = "student"
): { success: boolean; user?: DemoStudent; role?: "student" | "admin"; error?: string } {
  const store = loadAppStore();
  const cleanId = identifier.trim().toLowerCase();

  if (roleTab === "admin" || cleanId.includes("admin")) {
    if (cleanId === "admin@campus.edu" && pass === "admin123") {
      store.currentRole = "admin";
      saveAppStore(store);
      return { success: true, role: "admin" };
    }
    return { success: false, error: "Invalid Admin email or password. (Use admin@campus.edu / admin123)" };
  }

  // Student auth (by Student ID CC1001-CC1010 or email or ID match)
  const foundUser = store.users.find(
    (u) =>
      u.id.toLowerCase() === cleanId ||
      u.studentId.toLowerCase() === cleanId ||
      u.email.toLowerCase() === cleanId
  );

  if (foundUser) {
    if (foundUser.password === pass) {
      store.currentUser = foundUser;
      store.currentRole = "student";
      saveAppStore(store);

      // Sync userStore session
      try {
        localStorage.setItem(
          "campus_circular_user",
          JSON.stringify({
            name: foundUser.name,
            email: foundUser.email,
            studentId: foundUser.id,
            role: "student",
            avatar: foundUser.avatar,
            avatarBg: foundUser.avatarBg,
            department: foundUser.department,
            year: foundUser.year,
            handle: foundUser.handle,
          })
        );
      } catch (e) {}

      return { success: true, user: foundUser, role: "student" };
    } else {
      return { success: false, error: `Incorrect password for ${foundUser.id}. Please enter the correct password.` };
    }
  }

  return {
    success: false,
    error: "Student account not found. Please enter a valid ID (CC1001 - CC1010).",
  };
}

export function getCurrentLoggedInUser(): DemoStudent {
  const store = loadAppStore();
  return store.currentUser || DEMO_STUDENTS[2];
}

export function switchUserSession(studentId: string): DemoStudent | null {
  const store = loadAppStore();
  const target = store.users.find((u) => u.id === studentId);
  if (target) {
    store.currentUser = target;
    store.currentRole = "student";
    saveAppStore(store);

    try {
      localStorage.setItem(
        "campus_circular_user",
        JSON.stringify({
          name: target.name,
          email: target.email,
          studentId: target.id,
          role: "student",
          avatar: target.avatar,
          avatarBg: target.avatarBg,
          department: target.department,
          year: target.year,
          handle: target.handle,
        })
      );
    } catch (e) {}

    return target;
  }
  return null;
}

// ─── ACTION DISPATCHERS (MUTATIONS WITH PERSISTENCE) ─────────────────────────

export function createBorrowRequestInStore(
  resourceId: string,
  requestedDates: string,
  purpose: string
): SharedRequest {
  const store = loadAppStore();
  const currentUser = getCurrentLoggedInUser();

  const resource = store.resources.find((r) => r.id === resourceId);
  const ownerId = resource ? resource.ownerId : "CC1007";
  const owner = store.users.find((u) => u.id === ownerId) || DEMO_STUDENTS[6];

  const newRequest: SharedRequest = {
    id: `req-${Date.now()}`,
    resourceId,
    resourceName: resource ? resource.name : "Campus Equipment",
    category: resource ? resource.category : "Electronics",
    cardColor: resource ? resource.cardColor : BRAND_COLORS.pastelYellow,
    requesterId: currentUser.id,
    requesterName: `${currentUser.name} (${currentUser.id})`,
    requesterTrustScore: currentUser.trustScore,
    ownerId: owner.id,
    ownerName: `${owner.name} (${owner.id})`,
    requestedDates,
    purpose: purpose.trim() || "Academic / Project loan",
    status: "PENDING",
    statusText: "● Awaiting owner approval",
    handoverLocation: resource ? resource.locationName : "Main Campus",
    priceDisplay: resource ? resource.priceDisplay : "Free",
    depositDisplay: resource ? resource.depositDisplay : "Free with ID",
    totalDisplay: resource && resource.pricePerDay > 0 ? `₹${resource.pricePerDay * 2 + 510} total` : "Free",
    createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
  };

  store.requests = [newRequest, ...store.requests];
  store.activity = [
    {
      id: `act-${Date.now()}`,
      timestamp: "Just now",
      text: `${currentUser.name} (${currentUser.id}) requested to borrow ${newRequest.resourceName} from ${owner.name} (${owner.id}).`,
      type: "REQUEST",
    },
    ...store.activity,
  ];

  saveAppStore(store);
  return newRequest;
}

export function updateRequestStatusInStore(
  requestId: string,
  newStatus: "ACCEPTED" | "REJECTED" | "CANCELLED"
): void {
  const store = loadAppStore();
  const req = store.requests.find((r) => r.id === requestId);
  if (!req) return;

  req.status = newStatus;
  req.statusText =
    newStatus === "ACCEPTED"
      ? "✓ Accepted · Handover Scheduled"
      : newStatus === "REJECTED"
      ? "✕ Request Declined"
      : "Cancelled";

  if (newStatus === "ACCEPTED") {
    // Automatically create shared active loan
    const newLoan: SharedLoan = {
      id: `loan-${Date.now()}`,
      requestId: req.id,
      resourceId: req.resourceId,
      resourceName: req.resourceName,
      category: req.category,
      borrowerId: req.requesterId,
      borrowerName: req.requesterName,
      ownerId: req.ownerId,
      ownerName: req.ownerName,
      dueDate: "Sep 02, 2026",
      dueDaysText: "Due in 6 days",
      status: "ACTIVE",
      cardColor: req.cardColor,
    };
    store.loans = [newLoan, ...store.loans];
  }

  store.activity = [
    {
      id: `act-${Date.now()}`,
      timestamp: "Just now",
      text: `${req.ownerName} ${newStatus.toLowerCase()} borrow request for ${req.resourceName} from ${req.requesterName}.`,
      type: "ACCEPT",
    },
    ...store.activity,
  ];

  saveAppStore(store);
}

export function addResourceToStore(newResourceData: Partial<SharedResource>): SharedResource {
  const store = loadAppStore();
  const currentUser = getCurrentLoggedInUser();

  const newRes: SharedResource = {
    id: `res-${Date.now()}`,
    name: newResourceData.name || "New Campus Resource",
    category: (newResourceData.category as any) || "Electronics",
    ownerId: currentUser.id,
    ownerName: currentUser.name,
    ownerAvatar: currentUser.avatar,
    isAvailable: true,
    isAvailableNow: true,
    isOwnerVerified: true,
    ownerTrustScore: "High Trust",
    availability: "Available now",
    distanceKm: 0.5,
    locationName: newResourceData.locationName || currentUser.location || "TSEC Main Campus",
    condition: (newResourceData.condition as any) || "Excellent",
    rating: 5.0,
    pricePerDay: newResourceData.pricePerDay || 0,
    priceDisplay: newResourceData.pricePerDay && newResourceData.pricePerDay > 0 ? `₹${newResourceData.pricePerDay}/day` : "Free",
    depositDisplay: newResourceData.depositDisplay || "Free with ID",
    cardColor: newResourceData.cardColor || BRAND_COLORS.pastelYellow,
    description: newResourceData.description || "Campus equipment listed for peer borrowing.",
    matchPct: 96,
    matchReasons: ["Available immediately", "0.5 km away", "Verified student owner"],
    mapCoords: { xPct: 50, yPct: 50 },
  };

  store.resources = [newRes, ...store.resources];
  store.activity = [
    {
      id: `act-${Date.now()}`,
      timestamp: "Just now",
      text: `${currentUser.name} (${currentUser.id}) listed a new resource: ${newRes.name}.`,
      type: "RESOURCE_ADD",
    },
    ...store.activity,
  ];

  saveAppStore(store);
  return newRes;
}

export function deleteStudentFromStore(studentId: string): void {
  const store = loadAppStore();
  store.users = store.users.filter((u) => u.id !== studentId && u.studentId !== studentId);
  saveAppStore(store);
}

export function sendChatMessageInStore(threadId: string, text: string): SharedChatThread | null {
  const store = loadAppStore();
  const currentUser = getCurrentLoggedInUser();

  if (!store.chatThreads || !Array.isArray(store.chatThreads)) {
    store.chatThreads = DEFAULT_CHAT_THREADS;
  }

  const thread = store.chatThreads.find((t) => t.id === threadId);
  if (!thread) return null;

  const nowFormatted = new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

  const newMsg: SharedChatMessage = {
    id: `msg-${Date.now()}`,
    senderId: currentUser.id,
    senderName: currentUser.name,
    sender: "you",
    text: text.trim(),
    timestamp: nowFormatted,
  };

  thread.messages.push(newMsg);
  thread.lastMessage = `${currentUser.name.split(" ")[0]}: "${text.trim()}"`;
  thread.lastTime = nowFormatted;

  saveAppStore(store);
  return thread;
}
