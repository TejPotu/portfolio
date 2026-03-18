"use client"

export function AuroraBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Primary violet blob - top left */}
      <div
        className="absolute -left-1/4 -top-1/4 h-[700px] w-[700px] animate-aurora-1 rounded-full opacity-30 blur-[120px] dark:opacity-20"
        style={{
          background:
            "radial-gradient(circle, hsl(262 83% 58%) 0%, hsl(262 83% 58% / 0) 70%)",
        }}
      />

      {/* Teal/cyan blob - right */}
      <div
        className="absolute -right-1/4 top-1/4 h-[600px] w-[600px] animate-aurora-2 rounded-full opacity-25 blur-[100px] dark:opacity-15"
        style={{
          background:
            "radial-gradient(circle, hsl(172 66% 50%) 0%, hsl(172 66% 50% / 0) 70%)",
        }}
      />

      {/* Purple/magenta blob - bottom center */}
      <div
        className="absolute -bottom-1/4 left-1/3 h-[500px] w-[500px] animate-aurora-3 rounded-full opacity-20 blur-[100px] dark:opacity-15"
        style={{
          background:
            "radial-gradient(circle, hsl(291 47% 51%) 0%, hsl(291 47% 51% / 0) 70%)",
        }}
      />

      {/* Subtle pulsing overlay for depth */}
      <div
        className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 animate-aurora-pulse rounded-full opacity-10 blur-[150px] dark:opacity-[0.07]"
        style={{
          background:
            "radial-gradient(circle, hsl(262 83% 70%) 0%, hsl(172 66% 50% / 0) 70%)",
        }}
      />
    </div>
  )
}

export function SectionAuroraAccent({
  position = "left",
}: {
  position?: "left" | "right"
}) {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div
        className={`absolute h-[400px] w-[400px] rounded-full opacity-[0.07] blur-[100px] dark:opacity-[0.05] ${
          position === "left"
            ? "-left-32 top-1/4"
            : "-right-32 bottom-1/4"
        }`}
        style={{
          background:
            position === "left"
              ? "radial-gradient(circle, hsl(262 83% 58%) 0%, transparent 70%)"
              : "radial-gradient(circle, hsl(172 66% 50%) 0%, transparent 70%)",
        }}
      />
    </div>
  )
}
