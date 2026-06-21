"use client";

import { ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import { useDevicePerformance } from "@/hooks/use-device-performance";

interface PerformanceProviderProps {
  children: ReactNode;
}

export function PerformanceProvider({ children }: PerformanceProviderProps) {
  const isLowEndDevice = useDevicePerformance();

  return (
    <MotionConfig reducedMotion={isLowEndDevice ? "always" : "user"}>
      {children}
    </MotionConfig>
  );
}
