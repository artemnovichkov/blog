"use client"

import { useEffect, useState } from "react"
import { FiMoon, FiSun } from "react-icons/fi"
import {
  iconButtonClassName,
  iconButtonIconClassName,
} from "./icon-button-styles"

const storageKey = "theme"

function getPreferredTheme() {
  if (typeof window === "undefined") {
    return "light"
  }

  const storedTheme = localStorage.getItem(storageKey)

  if (storedTheme === "dark" || storedTheme === "light") {
    return storedTheme
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

function applyTheme(theme: string) {
  document.documentElement.classList.toggle("dark", theme === "dark")
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light")

  useEffect(() => {
    const preferredTheme = getPreferredTheme()
    setTheme(preferredTheme)
    applyTheme(preferredTheme)
  }, [])

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark"

    setTheme(nextTheme)
    localStorage.setItem(storageKey, nextTheme)
    applyTheme(nextTheme)
  }

  const isDark = theme === "dark"
  const label = isDark ? "Switch to light theme" : "Switch to dark theme"

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={toggleTheme}
      className={iconButtonClassName}
    >
      {isDark ? (
        <FiSun className={iconButtonIconClassName} aria-hidden="true" />
      ) : (
        <FiMoon className={iconButtonIconClassName} aria-hidden="true" />
      )}
    </button>
  )
}
