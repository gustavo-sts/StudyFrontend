import React from "react";
import { LuX } from "react-icons/lu";

export interface CloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const CloseButton = React.forwardRef<HTMLButtonElement, CloseButtonProps>(
  function CloseButton({ children, ...props }, ref) {
    return (
      <button type="button" aria-label="Close" ref={ref} {...props}>
        {children ?? <LuX />}
      </button>
    );
  }
);
