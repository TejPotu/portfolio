import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

const links = [
  { href: "https://github.com/TejPotu", label: "GitHub", icon: Github },
  {
    href: "https://linkedin.com/in/tejpotu",
    label: "LinkedIn",
    icon: Linkedin,
  },
  { href: "mailto:tejpotu@gmail.com", label: "Email", icon: Mail },
]

export function SocialLinks() {
  return (
    <div className="flex items-center gap-3">
      {links.map(({ href, label, icon: Icon }) => (
        <Link
          key={label}
          href={href}
          target={href.startsWith("mailto") ? undefined : "_blank"}
          rel="noopener noreferrer"
          aria-label={label}
          className="flex items-center justify-center rounded-full border border-border/60 bg-card/60 p-2.5 text-muted-foreground backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
        >
          <Icon className="h-4 w-4" />
        </Link>
      ))}
    </div>
  )
}
