import React from "react";
import CampusCircularLogin from "./ui/CampusCircular/CampusCircularLogin";

interface MoodGateProps {
  onComplete: () => void;
}

/**
 * MoodGate — Transformed into Campus Circular Login Page
 * Preserves component API and interface while providing the evolved Campus Circular Identity.
 */
export function MoodGate({ onComplete }: MoodGateProps) {
  const handleSuccess = (role: "student" | "admin", email: string) => {
    onComplete();
  };

  return <CampusCircularLogin onSuccess={handleSuccess} />;
}

export default MoodGate;
