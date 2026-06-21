"use client";

import { useState, useEffect } from "react";

export function useDevicePerformance() {
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    // Default to false unless proven otherwise
    let weakDevice = false;

    // 1. Check if user explicitly prefers reduced motion (OS Level)
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      weakDevice = true;
    }

    // 2. Check Device Memory (RAM) - Not supported in Safari/iOS, but great for Android/Chrome
    // The deviceMemory API returns the approximate amount of device RAM in GB.
    // We consider anything less than 4GB as low-end for heavy animations.
    if ("deviceMemory" in navigator) {
      const memory = (navigator as any).deviceMemory;
      if (memory && memory < 4) {
        weakDevice = true;
      }
    }

    // 3. Check CPU Cores
    // We consider anything less than 4 logical cores as low-end for heavy calculations.
    if ("hardwareConcurrency" in navigator) {
      const cores = navigator.hardwareConcurrency;
      if (cores && cores < 4) {
        weakDevice = true;
      }
    }

    // 4. Fallback for iOS Battery Saver (can sometimes be detected via hardwareConcurrency dropping or just prefers-reduced-motion)
    // Mobile Safari automatically sets prefers-reduced-motion when Low Power Mode is on.
    
    setIsLowEnd(weakDevice);

    // Optional: listen for changes in reduced motion preference
    const listener = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsLowEnd(true);
      } else {
        let isHardwareWeak = false;
        if ("deviceMemory" in navigator && (navigator as any).deviceMemory < 4) isHardwareWeak = true;
        if ("hardwareConcurrency" in navigator && navigator.hardwareConcurrency < 4) isHardwareWeak = true;
        
        setIsLowEnd(event.matches || isHardwareWeak);
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", listener);
    } else {
      mediaQuery.addListener(listener); // Safari fallback
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", listener);
      } else {
        mediaQuery.removeListener(listener);
      }
    };
  }, []);

  return isLowEnd;
}
