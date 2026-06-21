"use client";

import { format, startOfMonth } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Calendar, type CalendarProps } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export type DatePickerProps = {
  value?: Date | null;
  onChange?: (date: Date) => void;
  className?: string;
  defaultOpen?: boolean;
  placeholder?: string;
  /** Props forwarded to the embedded Calendar, except selection and month state. */
  calendarProps?: Omit<
    CalendarProps,
    "selected" | "defaultSelected" | "onSelect" | "month" | "onMonthChange"
  >;
};

export function AnimatedDatePicker({
  value,
  onChange,
  className,
  defaultOpen = false,
  placeholder = "Select a date",
  calendarProps,
}: DatePickerProps) {
  const isValueControlled = value !== undefined;
  const [open, setOpen] = useState(defaultOpen);
  const [internalSelected, setInternalSelected] = useState<Date | undefined>(
    value ?? undefined
  );
  const [viewMonth, setViewMonth] = useState<Date>(
    startOfMonth(value ?? new Date())
  );

  const selected = isValueControlled ? (value ?? undefined) : internalSelected;

  useEffect(() => {
    if (!isValueControlled) return;

    if (value) {
      setViewMonth(startOfMonth(value));
    }
  }, [isValueControlled, value]);

  useEffect(() => {
    if (!open) return;

    if (selected) {
      setViewMonth(startOfMonth(selected));
    }
  }, [open, selected]);

  const handleSelect = (date: Date) => {
    if (!isValueControlled) {
      setInternalSelected(date);
    }

    setViewMonth(startOfMonth(date));
    onChange?.(date);
  };

  const { className: calendarClassName, ...restCalendarProps } =
    calendarProps ?? {};

  return (
    <div className={cn("relative w-full max-w-[240px]", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          aria-label={
            selected ? `Selected date, ${format(selected, "PPPP")}` : placeholder
          }
          className="group flex w-full items-center rounded-lg border border-border bg-card px-4 py-3 text-left text-foreground text-sm transition-all hover:border-foreground/30"
        >
          <span className="flex min-w-0 items-center gap-3">
            <CalendarIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
            <span className="truncate font-medium tracking-tight">
              {selected ? format(selected, "EEE, MMM d, yyyy") : placeholder}
            </span>
          </span>
        </PopoverTrigger>

        <PopoverContent className="w-[280px] sm:w-[320px] p-0 z-[100] border-none shadow-none bg-transparent" align="start">
            <Calendar
              className={cn("bg-card border border-border rounded-lg shadow-2xl w-full", calendarClassName)}
              month={viewMonth}
              onMonthChange={(month) => setViewMonth(startOfMonth(month))}
              onSelect={handleSelect}
              selected={selected}
              size="md"
              {...restCalendarProps}
            />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export { AnimatedDatePicker as DatePicker };
