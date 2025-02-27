import React from "react";
import { useNavigate } from "react-router-dom";

interface LinkButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  to: string;
}

export function LinkButton({ to, children, ...props }: LinkButtonProps) {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(to)} {...props}>
      {children}
    </button>
  );
}