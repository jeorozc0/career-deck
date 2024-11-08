"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ThemeToggleSvg } from "@/components/ui/theme-toggle-svg";

export function ThemeToggle() {
  const [darkMode, setDarkMode] = useState<"light" | "dark" | "system">(
    "system"
  );

  useEffect(() => {
    const theme = localStorage.getItem("theme") as "light" | "dark" | "system";
    if (theme) {
      setDarkMode(theme);
      applyTheme(theme);
    } else {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setDarkMode(systemPrefersDark ? "dark" : "light");
      applyTheme(systemPrefersDark ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode);
    applyTheme(darkMode);
  }, [darkMode]);
  const applyTheme = (theme: "light" | "dark" | "system") => {
    if (
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
  const handleValueChange = (value: string) => {
    setDarkMode(value as "light" | "dark" | "system");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:ring-transparent" asChild>
        <Button
          className={buttonVariants({
            variant: "default",
          })}
        >
          <ThemeToggleSvg />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent onCloseAutoFocus={(e) => e.preventDefault()}>
        <DropdownMenuRadioGroup
          value={darkMode}
          onValueChange={handleValueChange}
        >
          <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
