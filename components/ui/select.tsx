"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

function SelectRoot(props: SelectPrimitive.Root.Props<string>) {
  return <SelectPrimitive.Root {...props} />;
}

function SelectTrigger({
  className,
  children,
  ...props
}: SelectPrimitive.Trigger.Props) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        "group flex items-center justify-between gap-2 rounded-xl border border-border bg-background px-4 py-2.5",
        "text-sm text-foreground outline-none transition-all",
        "focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/15",
        "data-[popup-open]:border-blue-500 data-[popup-open]:ring-2 data-[popup-open]:ring-blue-500/15",
        "sm:w-48 cursor-pointer select-none",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown
        size={15}
        className="text-muted-foreground transition-transform duration-200 group-data-[popup-open]:rotate-180"
      />
    </SelectPrimitive.Trigger>
  );
}

function SelectValue({
  placeholder,
  ...props
}: SelectPrimitive.Value.Props & { placeholder?: string }) {
  return (
    <SelectPrimitive.Value placeholder={placeholder} {...props} />
  );
}

function SelectPopup({ className, ...props }: SelectPrimitive.Popup.Props) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        sideOffset={6}
        side="bottom"
        align="end"
        alignOffset={0}
      >
        <SelectPrimitive.Popup
          className={cn(
            "z-50 min-w-[var(--anchor-width)] overflow-hidden rounded-xl border border-border",
            "bg-popover text-popover-foreground shadow-lg",
            "origin-[var(--transform-origin)]",
            "transition-[opacity,scale,transform] duration-150 ease-out",
            "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
            "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
            className
          )}
          {...props}
        />
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

function SelectList({ className, ...props }: SelectPrimitive.List.Props) {
  return (
    <SelectPrimitive.List
      className={cn("p-1 outline-none", className)}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      className={cn(
        "relative flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2",
        "text-sm text-foreground outline-none transition-colors select-none",
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
        "data-[selected]:font-medium",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <span className="flex size-4 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check size={14} className="text-blue-600" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectScrollUpArrow({ className, ...props }: SelectPrimitive.ScrollUpArrow.Props) {
  return (
    <SelectPrimitive.ScrollUpArrow
      className={cn("flex items-center justify-center py-1", className)}
      {...props}
    >
      <ChevronUp size={14} className="text-muted-foreground" />
    </SelectPrimitive.ScrollUpArrow>
  );
}

function SelectScrollDownArrow({ className, ...props }: SelectPrimitive.ScrollDownArrow.Props) {
  return (
    <SelectPrimitive.ScrollDownArrow
      className={cn("flex items-center justify-center py-1", className)}
      {...props}
    >
      <ChevronDown size={14} className="text-muted-foreground" />
    </SelectPrimitive.ScrollDownArrow>
  );
}

export {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectPopup,
  SelectList,
  SelectItem,
  SelectScrollUpArrow,
  SelectScrollDownArrow,
};
