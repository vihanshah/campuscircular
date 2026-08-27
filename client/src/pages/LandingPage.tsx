import React, { useEffect } from "react";
import { useLocation } from "wouter";
import CampusCircularLogin from "@/components/ui/CampusCircular/CampusCircularLogin";

export default function LandingPage() {
  const [, navigate] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSuccess = (role: "student" | "admin", email: string) => {
    try {
      sessionStorage.setItem("mentebloom_gate_completed", "true");
    } catch {}

    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/app");
    }
  };

  return <CampusCircularLogin onSuccess={handleSuccess} />;
}
