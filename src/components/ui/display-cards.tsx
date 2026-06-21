"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-4 text-blue-300" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "text-blue-500",
  titleClassName = "text-blue-500",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 bg-muted/70 backdrop-blur-sm px-4 py-3 transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-background after:to-transparent after:content-[''] [&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className
      )}
    >
      <div>
        <span className="relative inline-block rounded-full bg-blue-800 p-1">
          {icon}
        </span>
        <p className={cn("text-lg font-medium", titleClassName)}>{title}</p>
      </div>
      <p className="whitespace-nowrap text-lg text-foreground/80">{description}</p>
      <p className="text-muted-foreground">{date}</p>
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export function DisplayCards({ cards }: DisplayCardsProps) {
  const [activeIndex, setActiveIndex] = useState(2); // Start with the front card active

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3);
    }, 2500); // cycle every 2.5s
    return () => clearInterval(interval);
  }, []);

  const defaultCards = [
    {
      className: cn(
        "[grid-area:stack] before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 before:transition-opacity before:duration-700 before:left-0 before:top-0",
        activeIndex === 0 ? "-translate-y-10 before:opacity-0 border-border bg-slate-900/80 shadow-2xl shadow-blue-500/20" : "opacity-40"
      ),
      title: "Custom Systems",
      description: "Tailored to your business needs",
      date: "Core Offering",
    },
    {
      className: cn(
        "[grid-area:stack] translate-x-16 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 before:transition-opacity before:duration-700 before:left-0 before:top-0",
        activeIndex === 1 ? "-translate-y-1 before:opacity-0 border-border bg-slate-900/80 shadow-2xl shadow-blue-500/20" : "translate-y-10 opacity-40"
      ),
      title: "Scalable APIs",
      description: "Built for high performance",
      date: "Enterprise Grade",
    },
    {
      className: cn(
        "[grid-area:stack] translate-x-32",
        activeIndex === 2 ? "translate-y-10 border-border bg-slate-900/80 shadow-2xl shadow-blue-500/20" : "translate-y-20 opacity-40 before:absolute before:inset-0 before:bg-background/50 before:rounded-xl"
      ),
      title: "Sleek UIs",
      description: "Engaging frontend experiences",
      date: "Modern Tech",
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}