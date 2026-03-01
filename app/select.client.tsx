import * as SelectPrimitive from "@radix-ui/react-select";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

/* ── Root ─────────────────────────────────────────────────────────── */

export const Select = SelectPrimitive.Root;
export const SelectValue = SelectPrimitive.Value;

/* ── Trigger ──────────────────────────────────────────────────────── */

interface SelectTriggerProps
  extends ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  children?: ReactNode;
}

export function SelectTrigger({ children, ...props }: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger data-select-trigger="" {...props}>
      {children}
      <SelectPrimitive.Icon data-select-icon="">
        <ChevronDownIcon />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

/* ── Content (dropdown) ───────────────────────────────────────────── */

interface SelectContentProps
  extends ComponentPropsWithoutRef<typeof SelectPrimitive.Content> {
  children?: ReactNode;
}

export function SelectContent({ children, ...props }: SelectContentProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-select-content=""
        position="popper"
        sideOffset={4}
        {...props}
      >
        <SelectPrimitive.Viewport data-select-viewport="">
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

/* ── Item ─────────────────────────────────────────────────────────── */

interface SelectItemProps
  extends ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {
  children?: ReactNode;
}

export function SelectItem({ children, ...props }: SelectItemProps) {
  return (
    <SelectPrimitive.Item data-select-item="" {...props}>
      <SelectPrimitive.ItemIndicator data-select-item-indicator="">
        <CheckIcon />
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

/* ── Icons ────────────────────────────────────────────────────────── */

function ChevronDownIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
