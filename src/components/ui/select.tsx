"use client";

import React, { useState, useRef } from "react";
import { LuChevronDown, LuX } from "react-icons/lu";

interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  clearable?: boolean;
  value?: string;
  onClear?: () => void;
}

export const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  function SelectTrigger({ children, clearable, value, onClear, ...rest }, ref) {
    return (
      <div className="relative inline-block">
        <button ref={ref} {...rest} className="border p-2 rounded flex items-center justify-between w-full">
          {value || children}
          <div className="flex items-center">
            {clearable && value && <SelectClearTrigger onClick={onClear} />}
            <LuChevronDown />
          </div>
        </button>
      </div>
    );
  }
);

const SelectClearTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  function SelectClearTrigger(props, ref) {
    return (
      <button ref={ref} {...props} className="p-1">
        <LuX />
      </button>
    );
  }
);

interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
}

export const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  function SelectContent({ children, isOpen, ...rest }, ref) {
    if (!isOpen) return null;
    return (
      <div ref={ref} {...rest} className="absolute mt-1 bg-white border shadow-lg rounded w-full">
        {children}
      </div>
    );
  }
);

interface SelectItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  onSelect: (value: string) => void;
}

export const SelectItem = React.forwardRef<HTMLButtonElement, SelectItemProps>(
  function SelectItem({ children, value, onSelect, ...rest }, ref) {
    return (
      <button ref={ref} {...rest} onClick={() => onSelect(value)} className="block w-full text-left p-2 hover:bg-gray-100">
        {children}
      </button>
    );
  }
);

export function Select({ options }: { options: string[] }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="relative">
      <SelectTrigger
        ref={triggerRef}
        value={selected || "Select an option"}
        clearable={Boolean(selected)}
        onClick={() => setIsOpen(!isOpen)}
        onClear={() => setSelected(null)}
      />
      <SelectContent isOpen={isOpen}>
        {options.map((option) => (
          <SelectItem key={option} value={option} onSelect={(val) => {
            setSelected(val);
            setIsOpen(false);
          }}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </div>
  );
}
