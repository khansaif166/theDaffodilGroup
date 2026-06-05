"use client";

import { createContext, useContext, useState } from "react";

export type NavTheme = "light" | "dark";

type NavbarThemeContextValue = {
  theme: NavTheme;
  setTheme: (theme: NavTheme) => void;
};

const NavbarThemeContext = createContext<NavbarThemeContextValue>({
  theme: "light",
  setTheme: () => {},
});

export function NavbarThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<NavTheme>("light");

  return (
    <NavbarThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </NavbarThemeContext.Provider>
  );
}

export function useNavbarTheme() {
  return useContext(NavbarThemeContext);
}
