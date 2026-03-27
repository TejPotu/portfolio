"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

const sections = [
  { id: "about", label: "About" },
  { id: "research", label: "Research" },
  { id: "publications", label: "Papers" },
  { id: "awards", label: "Awards" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const

interface NavProps {
  activeSection: string
  onNavigate: (section: string) => void
}

export function Nav({ activeSection, onNavigate }: NavProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-border/30 bg-background/40 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-6 lg:px-10">
        <button
          onClick={() => onNavigate("hero")}
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          <span className="text-primary">T</span>eja Potu
        </button>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Main navigation"
        >
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                activeSection === id
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {label}
            </button>
          ))}
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t border-border/30 bg-background/40 px-6 py-4 backdrop-blur-xl md:hidden">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => {
                onNavigate(id)
                setMobileOpen(false)
              }}
              className={cn(
                "rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors",
                activeSection === id
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {label}
            </button>
          ))}
        </nav>
      )}
    </header>
  )
}
