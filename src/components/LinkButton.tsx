import { Button, ButtonProps } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface LinkButtonProps extends ButtonProps {
  to: string;
}

export function LinkButton({ to, children, ...props }: LinkButtonProps) {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate(to)} {...props}>
      {children}
    </Button>
  );
}
