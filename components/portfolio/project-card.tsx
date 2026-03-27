import Link from "next/link"
import { ArrowUpRight, Star, GitFork, Trophy } from "lucide-react"

export interface Project {
  title: string
  description: string
  longDescription: string
  tech: string[]
  link: string
  stars?: number
  forks?: number
  language?: string
  featured?: boolean
  category?: string
  award?: string
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-primary/5 via-card/95 to-accent/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
    >
      {project.category && (
        <span className="mb-3 inline-flex w-fit items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {project.category}
        </span>
      )}

      <h3 className="text-base font-semibold text-foreground transition-colors group-hover:text-primary text-balance leading-snug">
        {project.title}
      </h3>

      <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed">
        {project.longDescription}
      </p>

      <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
        {project.language && (
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-primary" />
            {project.language}
          </span>
        )}
        {project.stars !== undefined && project.stars > 0 && (
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3" />
            {project.stars}
          </span>
        )}
        {project.forks !== undefined && project.forks > 0 && (
          <span className="flex items-center gap-1">
            <GitFork className="h-3 w-3" />
            {project.forks}
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded-full border border-border/50 bg-secondary/50 px-2.5 py-0.5 text-[11px] font-medium text-secondary-foreground"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
        View on GitHub
        <ArrowUpRight className="h-3.5 w-3.5" />
      </div>

      {/* Hover glow */}
      <div className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
    </Link>
  )
}

export function FeaturedProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 via-card/95 to-accent/10 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 lg:p-10"
    >
      {project.award && (
        <div className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-amber-400/30 bg-gradient-to-r from-amber-500/15 via-yellow-400/10 to-amber-500/15 px-3.5 py-1.5 text-xs font-bold text-amber-500 dark:text-amber-400 shadow-sm shadow-amber-500/10">
          <Trophy className="h-3.5 w-3.5 animate-trophy-glow" />
          {project.award}
        </div>
      )}
      {project.category && (
        <span className="mb-4 inline-flex w-fit items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {project.category}
        </span>
      )}

      <h3 className="text-2xl font-semibold text-foreground transition-colors group-hover:text-primary text-balance leading-tight lg:text-3xl">
        {project.title}
      </h3>

      <p className="mt-3 max-w-lg text-base text-muted-foreground leading-relaxed">
        {project.longDescription}
      </p>

      <div className="mt-5 flex items-center gap-4 text-sm text-muted-foreground">
        {project.language && (
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            {project.language}
          </span>
        )}
        {project.stars !== undefined && project.stars > 0 && (
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5" />
            {project.stars}
          </span>
        )}
        {project.forks !== undefined && project.forks > 0 && (
          <span className="flex items-center gap-1">
            <GitFork className="h-3.5 w-3.5" />
            {project.forks}
          </span>
        )}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded-full border border-border/50 bg-secondary/50 px-3 py-1 text-xs font-medium text-secondary-foreground"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-primary">
        Learn more
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>

      {/* Hover glow */}
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
      <div className="pointer-events-none absolute -left-16 -top-16 h-32 w-32 rounded-full bg-accent/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
    </Link>
  )
}
