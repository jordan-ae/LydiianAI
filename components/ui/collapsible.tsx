"use client";

import { cn } from "@/lib/utils";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { forwardRef } from "react";
import type { ComponentProps, Ref } from "react";

const Collapsible = CollapsiblePrimitive.Root;

// const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

type CollapsibleTrigger = typeof CollapsiblePrimitive.CollapsibleTrigger;

type CollapsibleTriggerProps = ComponentProps<CollapsibleTrigger>;

const CollapsibleTrigger = forwardRef<
  CollapsibleTrigger,
  CollapsibleTriggerProps
>(({ className, ...props }, ref) => {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      {...props}
      ref={ref as Ref<HTMLButtonElement>}
      className={cn(
        "text-sm flex items-center justify-between w-full text-foreground",
        className
      )}
    />
  );
});

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
