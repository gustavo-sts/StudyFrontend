"use client";

import { useTheme, ThemeProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
import React from "react";
import { LuMoon, LuSun } from "react-icons/lu";

export interface ColorModeProviderProps extends ThemeProviderProps {}

export function ColorModeProvider(props: ColorModeProviderProps) {
  return <ThemeProvider attribute="class" disableTransitionOnChange {...props} />;
}

export type ColorMode = "light" | "dark";

export interface UseColorModeReturn {
  colorMode: ColorMode;
  setColorMode: (colorMode: ColorMode) => void;
  toggleColorMode: () => void;
}

export function useColorMode(): UseColorModeReturn {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleColorMode = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return {
    colorMode: resolvedTheme as ColorMode,
    setColorMode: setTheme,
    toggleColorMode,
  };
}

export function useColorModeValue<T>(light: T, dark: T) {
  const { colorMode } = useColorMode();
  return colorMode === "dark" ? dark : light;
}

export function ColorModeIcon() {
  const { colorMode } = useColorMode();
  return colorMode === "dark" ? <LuMoon /> : <LuSun />;
}

interface ColorModeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const ColorModeButton = React.forwardRef<HTMLButtonElement, ColorModeButtonProps>(
  function ColorModeButton(props, ref) {
    const { toggleColorMode } = useColorMode();

    return (
      <button
        onClick={toggleColorMode}
        aria-label="Toggle color mode"
        ref={ref}
        {...props}
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: "8px",
          fontSize: "1.25rem",
        }}
      >
        <ColorModeIcon />
      </button>
    );
  }
);

export const LightMode = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  function LightMode(props, ref) {
    return <span className="theme-light" ref={ref} {...props} />;
  }
);

export const DarkMode = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  function DarkMode(props, ref) {
    return <span className="theme-dark" ref={ref} {...props} />;
  }
);

