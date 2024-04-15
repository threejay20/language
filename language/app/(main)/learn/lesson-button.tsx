// Import necessary components and utilities
"use client";
import { Check, Crown, Star } from "lucide-react";
import Link from "next/link";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import "react-circular-progressbar/dist/styles.css";

// Define the expected properties for the component
type LessonButtonProps = {
  id: number;
  index: number;
  totalCount: number;
  locked?: boolean; // Optional property for locked state
  current?: boolean; // Optional property for current lesson indicator
  percentage: number;
};

// Main LessonButton component
export const LessonButton = ({
  id,
  index,
  totalCount,
  locked,
  current,
  percentage,
}: LessonButtonProps) => {
  // Constant for the number of buttons in a cycle for visual layout
  const cycleLength = 8;
  // Calculate the index within the current cycle
  const cycleIndex = index % cycleLength;

  // Calculate indentation level based on the cycleIndex for visual layout
  let indentationLevel;
  if (cycleIndex <= 2) indentationLevel = cycleIndex;
  else if (cycleIndex <= 4) indentationLevel = 4 - cycleIndex;
  else if (cycleIndex <= 6) indentationLevel = 4 - cycleIndex;
  else indentationLevel = cycleIndex - 8;

  // Calculate the right position based on indentation level
  const rightPosition = indentationLevel * 40;

  // Flags to identify button state
  const isFirst = index === 0;
  const isLast = index === totalCount;
  const isCompleted = !current && !locked; // Completed if not current and not locked

  // Select the appropriate icon based on button state
  const Icon = isCompleted ? Check : isLast ? Crown : Star;

  // Determine the link destination based on completion status
  const href = isCompleted ? `/lesson/${id}` : "/lesson";

  // Render the button with Link component for navigation
  return (
    <Link
      href={href}
      aria-disabled={locked}
      style={{ pointerEvents: locked ? "none" : "auto" }}
    >
      <div
        className="relative"
        style={{
          right: `${rightPosition}px`, // Set right position based on indentation
          marginTop: isFirst && !isCompleted ? 60 : 24, // Adjust top margin for first incomplete button
        }}
      >
        {/* Display progress bar and button for the current lesson */}
        {current && (
          <div className="relative h-[102px] w-[102px]">
            <div className="absolute -top-6 left-2.5 z-10 animate-bounce rounded-xl border-2 bg-white px-3 py-2.5 font-bold uppercase tracking-wide text-green-500">
              Start
              <div
                className="absolute -bottom-2 left-1/2 h-0 w-0 -translate-x-1/2 transform border-x-8 border-t-8 border-x-transparent"
                aria-hidden
              />
            </div>
            <CircularProgressbarWithChildren
              value={Number.isNaN(percentage) ? 0 : percentage}
              styles={{
                path: { stroke: "#4ade80" }, // Set progress bar path color
                trail: { stroke: "#e5e7eb" }, // Set progress bar track color
              }}
            >
              {/* Button inside the progress bar */}
              <Button
                size="rounded"
                variant={locked ? "locked" : "secondary"}
                className="h-[70px] w-[70px] border-b-8"
              >
                <Icon
                  className={cn(
                    "h-10 w-10",
                    locked
                      ? "fill-neutral-400 stroke-neutral-400 text-neutral-400" // Style for locked icon
                      : "fill-primary-foreground text-primary-foreground", // Style for unlocked icon
                    isCompleted && "fill-none stroke-[4]" // Style for completed icon (outline)
                  )}
                />
              </Button>
            </CircularProgressbarWithChildren>
          </div>
        )}
        {/* Display standalone button for non-current lessons */}
        {!current && (
          <Button
            size="rounded"
            variant={locked ? "locked" : "secondary"}
            className="h-[70px] w-[70px] border-b-8"
          >
            <Icon
              className={cn(
                "h-10 w-10",
                locked
                  ? "fill-neutral-400 stroke-neutral-400 text-neutral-400"
                  : "fill-primary-foreground text-primary-foreground",
                isCompleted && "fill-none stroke-[4]"
              )}
            />
          </Button>
        )}
      </div>
    </Link>
  );
};
