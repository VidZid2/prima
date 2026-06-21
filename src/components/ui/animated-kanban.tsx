"use client"

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Status = "todo" | "in-progress" | "done";

export function AnimatedKanban() {
  const [tick, setTick] = useState(0);

  // Cycle the tick every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 2500);
    return () => clearInterval(interval);
  }, []);

  const getStatus = (val: number): Status => {
    if (val === 0) return "todo";
    if (val === 1) return "in-progress";
    return "done";
  };

  // We stagger the starting states so they don't all move at once
  const tasks = [
    { id: "1", title: "Setup Database", status: getStatus((tick + 0) % 3) },
    { id: "2", title: "Build API", status: getStatus((tick + 2) % 3) },
    { id: "3", title: "Design UI", status: getStatus((tick + 1) % 3) },
  ];

  const getPosition = (status: Status, index: number) => {
    const colWidth = 90;
    const gap = 12;
    const startX = 16;
    const startY = 48; // below header
    const cardHeight = 44;

    let colIndex = 0;
    if (status === "in-progress") colIndex = 1;
    if (status === "done") colIndex = 2;

    const yPos = startY + (index * (cardHeight + 8));

    return {
      x: startX + colIndex * (colWidth + gap),
      y: yPos,
    };
  };

  return (
    <div className="relative w-[340px] h-[220px] bg-black/40 border border-border rounded-xl shadow-2xl overflow-hidden backdrop-blur-md p-4">
      {/* Columns Header */}
      <div className="flex justify-between mb-4 relative z-10">
        <div className="w-[90px] flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-slate-500" />
          <span className="text-[10px] font-semibold text-slate-300">To-Do</span>
        </div>
        <div className="w-[90px] flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[10px] font-semibold text-blue-300">In Progress</span>
        </div>
        <div className="w-[90px] flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-[10px] font-semibold text-emerald-300">Done</span>
        </div>
      </div>

      {/* Column Backgrounds (faint) */}
      <div className="absolute top-[40px] bottom-4 left-4 w-[90px] bg-white/[0.02] rounded-lg border border-border" />
      <div className="absolute top-[40px] bottom-4 left-[118px] w-[90px] bg-white/[0.02] rounded-lg border border-border" />
      <div className="absolute top-[40px] bottom-4 left-[220px] w-[90px] bg-white/[0.02] rounded-lg border border-border" />

      {/* Cards */}
      {tasks.map((task, index) => {
        const pos = getPosition(task.status, index);
        return (
          <div
            key={task.id}
            className="absolute left-0 top-0 w-[90px] h-[44px] bg-zinc-900/90 border border-border rounded-md shadow-lg flex flex-col justify-center px-3 z-20"
            style={{
              transform: `translate(${pos.x}px, ${pos.y}px)`,
              // We use a custom spring-like cubic bezier for a playful slide
              transition: "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <span className="text-[9px] font-medium text-white/90 truncate">{task.title}</span>
            <div className="w-full h-1 bg-black/50 rounded-full mt-1.5 overflow-hidden">
              <div 
                className={cn(
                  "h-full rounded-full transition-all duration-1000 ease-out",
                  task.status === "todo" ? "w-[10%] bg-slate-500" : 
                  task.status === "in-progress" ? "w-[60%] bg-blue-500" : 
                  "w-full bg-emerald-500"
                )} 
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
