"use client";

import { useEffect } from "react";

import type { NavTheme } from "@/context/NavbarThemeContext";
import { useNavbarTheme } from "@/context/NavbarThemeContext";

export function useSetNavbarTheme(theme: NavTheme) {
  const { setTheme } = useNavbarTheme();

  useEffect(() => {
    setTheme(theme);

    return () => {
      setTheme("light");
    };
  }, [setTheme, theme]);
}
