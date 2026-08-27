export interface UserSession {
  name: string;
  email: string;
  studentId: string;
  role: "student" | "admin";
  avatar: string;
  avatarBg: string;
  department: string;
  year: string;
  handle: string;
}

const DEFAULT_USER: UserSession = {
  name: "Alex Morgan",
  email: "alex.morgan@tsec.edu",
  studentId: "TSEC2025001",
  role: "student",
  avatar: "A",
  avatarBg: "#E8DEF8",
  department: "Computer Science",
  year: "3rd Year",
  handle: "@alex_morgan",
};

export function saveUserSession(identifier: string, role: "student" | "admin"): UserSession {
  let name = identifier;
  let email = identifier;
  let studentId = "TSEC2025001";

  if (identifier.includes("@")) {
    const username = identifier.split("@")[0];
    name = username
      .replace(/[._-]/g, " ")
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  } else {
    // If entered a raw ID or username like TSEC2025001 or manthan
    studentId = identifier.toUpperCase();
    if (identifier.toLowerCase().startsWith("tsec")) {
      name = "Student (" + studentId + ")";
    } else {
      name = identifier.charAt(0).toUpperCase() + identifier.slice(1);
    }
    email = `${identifier.toLowerCase()}@tsec.edu`;
  }

  const avatar = name.charAt(0).toUpperCase() || "S";
  const handle = `@${name.toLowerCase().replace(/\s+/g, "_")}`;

  const session: UserSession = {
    name,
    email,
    studentId,
    role,
    avatar,
    avatarBg: role === "admin" ? "#B92CFF" : "#FDF0A6",
    department: role === "admin" ? "Administration" : "Computer Science",
    year: role === "admin" ? "Staff" : "3rd Year",
    handle,
  };

  try {
    localStorage.setItem("campus_circular_user", JSON.stringify(session));
    sessionStorage.setItem("campus_circular_user", JSON.stringify(session));
  } catch (e) {
    console.error("Failed to save session", e);
  }

  return session;
}

export function getCurrentUser(): UserSession {
  try {
    const raw = localStorage.getItem("campus_circular_user") || sessionStorage.getItem("campus_circular_user");
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    // fallback
  }
  return DEFAULT_USER;
}
