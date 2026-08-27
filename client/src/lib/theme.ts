/**
 * Campus Circular Design System — Aesthetic Soft Pastel Theme Tokens
 */

export const BRAND_COLORS = {
  cream: "#FFFDF7",
  creamCard: "#F8F6F0",
  darkSlate: "#151518",
  black: "#151515",

  // Soft Aesthetic Pastel Fills
  pastelYellow: "#FDF0A6",  // Soft Butter Yellow
  pastelLavender: "#E8DEF8", // Soft Lavender Violet
  pastelMint: "#D7F3EB",     // Soft Seaglass Mint
  pastelCoral: "#FEE2E2",    // Soft Peach Coral
  pastelLime: "#E2F1D0",     // Soft Sage Lime
  pastelBlue: "#E0F2FE",     // Soft Sky Blue

  // Dark Text for high legibility on pastels
  textDark: "#151515",
  textMuted: "#666055",

  borderLight: "rgba(21, 21, 21, 0.08)",
  borderDark: "rgba(255, 255, 255, 0.10)",
} as const;

export const CAMPUS_RESOURCES = [
  { id: "laptop", name: "MacBook Pro M2", category: "Tech", icon: "Laptop", color: BRAND_COLORS.pastelYellow, tag: "Tech" },
  { id: "camera", name: "Sony Alpha A7 IV", category: "Creative", icon: "Camera", color: BRAND_COLORS.pastelLavender, tag: "Creative" },
  { id: "books", name: "Data Structures & AI", category: "Academic", icon: "BookOpen", color: BRAND_COLORS.pastelMint, tag: "Books" },
  { id: "guitar", name: "Yamaha Acoustic", category: "Music", icon: "Music", color: BRAND_COLORS.pastelCoral, tag: "Music" },
  { id: "projector", name: "4K Portable Projector", category: "Events", icon: "Tv", color: BRAND_COLORS.pastelLime, tag: "Events" },
] as const;

export const COMMUNITY_STATS = {
  shared: "1,248",
  exchanges: "842",
  saved: "₹2.4L",
} as const;
