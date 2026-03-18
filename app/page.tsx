"use client"

import { useState, useEffect, useCallback } from "react"
import { ArrowUpRight, ArrowDown, Download, BookOpen, Briefcase } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import profilePicture from "../docs/images/headshot_purple.jpg"
import { Nav } from "@/components/portfolio/nav"
import {
  FeaturedProjectCard,
  type Project,
} from "@/components/portfolio/project-card"
import { SocialLinks } from "@/components/portfolio/social-links"
import { AuroraBackground, SectionAuroraAccent } from "@/components/portfolio/aurora-background"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/portfolio/motion"

const featuredProjects: Project[] = [
  {
    title: "CaseTwin",
    description: "AI-powered clinical decision-support platform",
    longDescription:
      "Collapses a 4-hour clinical referral workflow into ~5 minutes by automating historical case matching, specialist facility location, imaging comparison, and referral documentation. Features a medical image RAG pipeline and uses specialized AI models (MedGemma, MedSiglip) for chest X-ray analysis and clinical text processing.",
    tech: ["FastAPI", "React", "CrewAI", "Google Gemini", "MedGemma", "RAG", "Qdrant", "GCP"],
    link: "https://github.com/TejPotu/case-twin",
    language: "TypeScript",
    featured: true,
    category: "Health AI",
  },
  {
    title: "Questory",
    description: "Story-driven knowledge platform",
    longDescription:
      "A quest through knowledge using stories — a narrative-driven educational platform that delivers content through interactive storytelling. Built with a monorepo architecture spanning a TypeScript frontend and Python backend.",
    tech: ["TypeScript", "Python", "JavaScript", "Google Gemini", "Gemini Live API", "Nano Banana", "FastAPI", "GCP"],
    link: "https://github.com/TejPotu/Questory",
    language: "TypeScript",
    featured: true,
    category: "EdTech",
  },
  {
    title: "PyC2MC: Graph Attribution & Auto-Analysis",
    description: "Published in J. Am. Soc. Mass Spectrom.",
    longDescription:
      "Graph-based molecular formula attribution engine for high-resolution mass spectrometry, paired with an LLM-orchestrated analysis layer that interprets spectral data end-to-end. Supports Claude, OpenAI, Gemini, and Ollama as reasoning backends.",
    tech: ["NetworkX", "Mass Spectrometry", "LLM Agents", "Python"],
    link: "https://pubs.acs.org/doi/10.1021/jasms.2c00323",
    language: "Python",
    featured: true,
    category: "Cheminformatics",
  },
  {
    title: "SCGclust: Single-Cell Graph Clustering",
    description: "Published in MDPI Mathematics (Dec 2025)",
    longDescription:
      "Lead author on published research integrating SNVs and CNAs using graph autoencoders for robust single-cell clustering. Co-trains graph autoencoder with GCN and GMM for accurate cell subclonality characterization. Consistently outperforms SNV-only and CNA-only methods on simulated and real cancer samples.",
    tech: ["Graph Autoencoders", "GCN", "Bioinformatics", "TensorFlow"],
    link: "https://www.mdpi.com/2227-7390/14/1/46",
    language: "Python",
    featured: true,
    category: "Publication",
  },
]

const projectGroups: { category: string; projects: Project[] }[] = [
  {
    category: "Speech & Audio AI",
    projects: [
      {
        title: "Accent Conversion with AR Transformer",
        description: "ARTransformer-AC",
        longDescription:
          'PyTorch implementation of an Autoregressive Transformer for accent conversion based on "Convert and Speak." Extracts semantic tokens via HuBERT, applies masking strategies, and trains a 267M-parameter decoder-only transformer for real-time accent conversion.',
        tech: ["PyTorch", "HuBERT", "Transformer", "Speech Processing"],
        link: "https://github.com/TejPotu/ARTransformer-AC",
        stars: 3,
        forks: 2,
        language: "Jupyter Notebook",
        category: "Speech & Audio AI",
      },
      {
        title: "BAE-Net: Audio Super Resolution",
        description: "BAE-Net",
        longDescription:
          "Bandwidth-Adaptive neural network for speech super-resolution. GAN-based architecture with multi-resolution STFT losses to upsample low-resolution audio to 48kHz with high fidelity, including a BAE-Net-Lite variant for efficient deployment.",
        tech: ["PyTorch", "GAN", "STFT", "Audio Processing"],
        link: "https://github.com/TejPotu/BAE-Net",
        stars: 2,
        forks: 1,
        language: "Python",
        category: "Speech & Audio AI",
      },
      {
        title: "Conformer Accent Conversion",
        description: "Real-time streaming accent conversion",
        longDescription:
          "Experimental Conformer-based neural network for causal accent conversion with real-time streaming capability. Explores low-latency architectures for on-device accent normalization.",
        tech: ["PyTorch", "Conformer", "Streaming Inference"],
        link: "https://github.com/TejPotu/Conformer-Accent-Conversion",
        language: "Python",
        category: "Speech & Audio AI",
      },
      {
        title: "Speech-Pro Data Generation",
        description: "Speech enhancement data pipeline",
        longDescription:
          "Data generation pipeline for training speech enhancement models. Creates paired clean/noisy audio datasets with configurable degradation parameters for robust model training.",
        tech: ["Audio Processing", "Data Pipeline"],
        link: "https://github.com/TejPotu/Speech-Pro-Data-Generation",
        stars: 1,
        language: "Python",
        category: "Speech & Audio AI",
      },
    ],
  },
  {
    category: "Agentic AI",
    projects: [
      {
        title: "CheckUp",
        description: "AI wellness assistant for elderly care",
        longDescription:
          "WhatsApp-based AI assistant that checks in on elderly parents daily. Supports Telugu, sends medication reminders, asks health questions, and surfaces alerts — making remote caregiving more manageable.",
        tech: ["Python", "WhatsApp API", "LLM", "Twilio"],
        link: "https://github.com/TejPotu/CheckUp",
        language: "Python",
        category: "Agentic AI",
      },
      {
        title: "MassBot",
        description: "Agentic mass spectrometry analysis chatbot",
        longDescription:
          "Conversational AI agent for analyzing mass spectrometry data. Uses tool-calling to run spectral computations, interpret peaks, and surface compound insights through natural language.",
        tech: ["LLM Agents", "Mass Spectrometry", "Python"],
        link: "https://github.com/TejPotu/MassBot",
        language: "Jupyter Notebook",
        category: "Agentic AI",
      },
      {
        title: "MacroScope",
        description: "AI-powered nutrition tracker",
        longDescription:
          "Food macro tracker that uses multimodal vision and text AI to log meals from photos or descriptions and deliver real-time nutritional breakdowns and dietary insights.",
        tech: ["Multimodal AI", "JavaScript", "Nutrition API"],
        link: "https://github.com/TejPotu/MacroScope",
        language: "JavaScript",
        category: "Agentic AI",
      },
      {
        title: "AI Travel Planner",
        description: "Agentic itinerary generation",
        longDescription:
          "End-to-end travel planning app built with Streamlit and LangChain. Smart destination search via Google Places, activity discovery with Tavily Search, and personalized day-by-day itinerary generation powered by GPT-4.",
        tech: ["LangChain", "GPT-4", "Streamlit", "Google Places API"],
        link: "https://github.com/TejPotu/AITravelPlanner",
        language: "Python",
        category: "Agentic AI",
      },
    ],
  },
  {
    category: "Data Science & ML",
    projects: [
      {
        title: "Border Crossing Anomaly Detection",
        description: "Data mining & anomaly detection",
        longDescription:
          "Analysis of US border crossing entry data using Isolation Forest, DBSCAN, and K-Means. Features geographic heatmaps, temporal trend analysis, and algorithm comparison with Jaccard similarity scoring.",
        tech: ["Scikit-learn", "Folium", "Pandas"],
        link: "https://github.com/TejPotu/Border-Crossing-Data-Mining-Anomaly-Detection",
        stars: 1,
        language: "Jupyter Notebook",
        category: "Data Science & ML",
      },
      {
        title: "Context-Aware Spelling Correction",
        description: "LLM prompt spelling research",
        longDescription:
          "Research project analyzing how surrounding context helps correct spelling errors in LLM prompts. Uses transformer layer embeddings from BERT and GPT-2 to study error sensitivity across attention heads.",
        tech: ["BERT", "GPT-2", "Transformers", "NLP"],
        link: "https://github.com/TejPotu/ContextAwareSpelling",
        language: "Jupyter Notebook",
        category: "Data Science & ML",
      },
      {
        title: "COVID-19 US Stock Impact",
        description: "Pandemic market analysis",
        longDescription:
          "Data-driven analysis of COVID-19's impact on US stock markets. Includes sector-level breakdowns, S&P 500 trend visualization, and statistical analysis of pandemic-driven volatility.",
        tech: ["Pandas", "Matplotlib", "Seaborn"],
        link: "https://github.com/TejPotu/Impact-of-COVID-19-on-US-Stocks",
        language: "Jupyter Notebook",
        category: "Data Science & ML",
      },
    ],
  },
  {
    category: "Computer Vision",
    projects: [
      {
        title: "Image Super Resolution",
        description: "SRGAN 4x image upscaling",
        longDescription:
          "SRGAN-style super-resolution with 4x upscaling using TensorFlow and Keras. Combines a generator, discriminator, and VGG-based perceptual loss to reconstruct high-frequency image detail.",
        tech: ["TensorFlow", "Keras", "GAN", "VGG"],
        link: "https://github.com/TejPotu/SuperResolution",
        language: "Jupyter Notebook",
        category: "Computer Vision",
      },
    ],
  },
  {
    category: "Reinforcement Learning",
    projects: [
      {
        title: "LunarLander",
        description: "DQN variants for Gymnasium LunarLander",
        longDescription:
          "Multiple RL approaches including DQN, Double DQN, and Dueling DQN for the LunarLander-v3 environment, achieving the 200-point threshold with pretrained model weights.",
        tech: ["PyTorch", "DQN", "Gymnasium"],
        link: "https://github.com/TejPotu/LunarLander",
        language: "Jupyter Notebook",
        category: "Reinforcement Learning",
      },
      {
        title: "Easy21 (BlackJack)",
        description: "Classic RL algorithms on Easy21",
        longDescription:
          "Implementation of Monte-Carlo Control, TD learning with eligibility traces, and linear function approximation on a simplified blackjack game.",
        tech: ["Monte Carlo", "TD(λ)", "Function Approximation"],
        link: "https://github.com/TejPotu/BlackJack",
        language: "Jupyter Notebook",
        category: "Reinforcement Learning",
      },
    ],
  },
]

const researchAreas = [
  {
    title: "Health AI & Clinical Systems",
    description:
      "Building AI systems that streamline clinical workflows — from multimodal case matching and medical imaging analysis to real-time patient monitoring and referral automation.",
    tags: ["MedGemma", "MedSiglip", "CrewAI", "RAG"],
    color: "primary" as const,
  },
  {
    title: "Computational Biology",
    description:
      "Published research applying graph neural networks and autoencoders to single-cell genomics, and graph-based molecular formula attribution for high-resolution mass spectrometry.",
    tags: ["GNN", "Graph Autoencoders", "Bioinformatics", "Mass Spectrometry"],
    color: "accent" as const,
  },
  {
    title: "Agentic AI Systems",
    description:
      "Designing LLM-orchestrated agents that reason through domain-specific tools — from mass spectrometry pipelines to clinical referral workflows and educational platforms.",
    tags: ["Claude", "Gemini", "Tool Use", "Multi-Agent"],
    color: "primary" as const,
  },
  {
    title: "Speech & Audio AI",
    description:
      "Accent conversion, audio super-resolution, and speech enhancement using autoregressive transformers, GAN architectures, and self-supervised speech representations.",
    tags: ["HuBERT", "Conformer", "GAN", "STFT"],
    color: "accent" as const,
  },
]

const publications = [
  {
    title:
      "SCGclust: Single Cell Graph Clustering Using Graph Autoencoders Integrating SNVs and CNAs",
    authors: "T. Potu et al.",
    venue: "MDPI Mathematics",
    year: "2025",
    link: "https://www.mdpi.com/2227-7390/14/1/46",
    tags: ["Graph Autoencoders", "GCN", "Bioinformatics"],
  },
  {
    title:
      "Internal Calibration without Internal Calibrants in FT-ICR Mass Spectrometry",
    authors: "R.P. Rodgers, C.L. Hendrickson, C.A. Holder Montenegro, A.J. Tello-Rodriguez, T. Potu, et al.",
    venue: "Analytical Chemistry",
    year: "2025",
    link: "https://pubs.acs.org/doi/10.1021/acs.analchem.5c00812",
    tags: ["FT-ICR", "Mass Spectrometry", "Calibration"],
  },
]

const experience = [
  {
    type: "education" as const,
    title: "Ph.D. in Computer Science",
    org: "Florida State University",
    date: "Jan 2023 – Dec 2027 (Expected)",
    detail: "GPA: 3.92",
  },
  {
    type: "work" as const,
    title: "Research Assistant",
    org: "National High Magnetic Field Laboratory",
    date: "May 2024 – Present",
    detail:
      "Built a graph-based molecular formula attribution engine for high-resolution mass spectrometry. Developing an autonomous LLM-orchestrated system that handles end-to-end spectral data analysis using tool-calling agents.",
  },
  {
    type: "work" as const,
    title: "Graduate Teaching Assistant",
    org: "Florida State University",
    date: "Jan 2024 – May 2024",
    detail:
      "Taught Coding Bootcamp and Introduction to Programming (Python).",
  },
  {
    type: "work" as const,
    title: "Researcher — Master's Thesis",
    org: "Single-Cell Clustering",
    date: "Dec 2023 – Dec 2024",
    detail:
      "Developed a graph autoencoder framework integrating SNVs and CNAs for single-cell clustering, published in MDPI Mathematics.",
  },
  {
    type: "work" as const,
    title: "Graduate Software Engineer",
    org: "Meeami Technologies",
    date: "Aug 2021 – Dec 2022",
    detail:
      "Built speech AI products including noise suppression, echo cancellation, and super-resolution models optimized for edge inference on mobile and embedded devices.",
  },
]

const skillGroups = [
  {
    label: "Languages",
    items: ["Python", "C/C++", "Java", "TypeScript", "JavaScript"],
  },
  {
    label: "ML & Deep Learning",
    items: ["PyTorch", "TensorFlow", "Hugging Face", "Scikit-learn", "GNN", "GANs"],
  },
  {
    label: "LLMs & Agents",
    items: ["LangChain", "CrewAI", "RAG", "ChromaDB", "Qdrant", "Prompt Engineering"],
  },
  {
    label: "Infrastructure",
    items: ["Docker", "AWS", "GCP", "HPC / SLURM", "MLflow", "Git"],
  },
]

const sectionIds = [
  "hero",
  "about",
  "research",
  "publications",
  "experience",
  "projects",
  "skills",
  "contact",
]

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero")

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY + 200
    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const el = document.getElementById(sectionIds[i])
      if (el && scrollY >= el.offsetTop) {
        setActiveSection(sectionIds[i])
        break
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <AuroraBackground />
      <Nav activeSection={activeSection} onNavigate={scrollTo} />

      {/* ===== Hero ===== */}
      <section
        id="hero"
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-24 text-center sm:pt-28"
      >
        {/* Floating orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute left-[15%] top-[20%] h-2 w-2 animate-float-slow rounded-full bg-primary/30" />
          <div className="absolute right-[20%] top-[35%] h-3 w-3 animate-float-medium rounded-full bg-accent/25" />
          <div className="absolute left-[60%] top-[15%] h-1.5 w-1.5 animate-float-slow rounded-full bg-primary/20" style={{ animationDelay: "2s" }} />
          <div className="absolute left-[30%] top-[60%] h-2.5 w-2.5 animate-float-medium rounded-full bg-accent/20" style={{ animationDelay: "1s" }} />
          <div className="absolute right-[30%] top-[70%] h-2 w-2 animate-float-slow rounded-full bg-primary/25" style={{ animationDelay: "3s" }} />
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="relative mx-auto mb-8 h-60 w-60 sm:h-72 sm:w-72">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 via-accent/30 to-primary/40 blur-2xl opacity-70" />
            <div className="relative h-full w-full rounded-full bg-gradient-to-br from-primary/60 via-accent/40 to-primary/60 p-1.5 shadow-2xl shadow-primary/25">
              <div className="h-full w-full overflow-hidden rounded-full border border-border/50 bg-card/70">
                <Image
                  src={profilePicture}
                  alt="Portrait of Teja Potu"
                  width={288}
                  height={288}
                  className="h-full w-full object-cover object-center"
                  style={{ objectPosition: "50% 0%" }}
                  priority
                />
              </div>
            </div>
          </div>
          <span className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
            PhD Researcher
          </span>

          <h1 className="text-5xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl md:text-7xl text-balance">
            Hey, I'm{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
              Teja Potu
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto leading-relaxed">
            Building intelligent systems at the intersection of{" "}
            <span className="font-semibold text-primary">Agentic AI</span>,{" "}
            <span className="font-semibold text-primary">LLMs</span>, and{" "}
            <span className="font-semibold text-primary">Computational Biology</span>
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={() => scrollTo("projects")}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:brightness-110"
            >
              View projects
              <ArrowDown className="h-4 w-4" />
            </button>
            <Link
              href="https://github.com/TejPotu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card"
            >
              GitHub profile
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card"
            >
              Resume
              <Download className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
      </section>

      {/* ===== About ===== */}
      <section id="about" className="relative z-10 scroll-mt-20 py-24 lg:py-32">
        <SectionAuroraAccent position="right" />
        <FadeIn>
        <div className="mx-auto max-w-screen-xl px-6 lg:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                About
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
                A bit about me
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {"I'm a PhD student in Computer Science at Florida State University, currently working as a Research Assistant at the National High Magnetic Field Laboratory. My research focuses on building agentic AI systems and applying graph-based machine learning to problems in computational biology and cheminformatics."}
              </p>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                {"I've published in Analytical Chemistry and MDPI Mathematics — and I'm actively seeking PhD internship opportunities in AI/ML and Data Science."}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 lg:col-span-2">
              {[
                { value: "2", label: "Publications" },
                { value: "15+", label: "Projects" },
                { value: "3.92", label: "GPA" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center rounded-2xl border border-border/60 bg-gradient-to-br from-primary/5 via-card/95 to-accent/5 px-4 py-6 text-center backdrop-blur-sm"
                >
                  <span className="text-2xl font-bold text-primary">
                    {stat.value}
                  </span>
                  <span className="mt-1 text-xs font-medium text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        </FadeIn>
      </section>

      {/* ===== Research Areas ===== */}
      <section id="research" className="relative z-10 scroll-mt-20 py-24 lg:py-32">
        <SectionAuroraAccent position="left" />
        <FadeIn>
        <div className="mx-auto max-w-screen-xl px-6 lg:px-10">
          <div className="mb-16 max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Research
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Areas of focus
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              My work sits at the intersection of agentic AI, scientific computing, and health — building systems that reason, act, and publish.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {researchAreas.map((area) => (
              <div
                key={area.title}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-primary/5 via-card/95 to-accent/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                {/* Card aurora glow */}
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      area.color === "primary"
                        ? "radial-gradient(circle, hsl(262 83% 58% / 0.15) 0%, transparent 70%)"
                        : "radial-gradient(circle, hsl(172 66% 50% / 0.15) 0%, transparent 70%)",
                  }}
                />
                <h3 className="text-lg font-semibold text-foreground">
                  {area.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {area.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {area.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                        area.color === "primary"
                          ? "bg-primary/10 text-primary"
                          : "bg-accent/10 text-accent-foreground dark:text-accent"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        </FadeIn>
      </section>

      {/* ===== Publications ===== */}
      <section id="publications" className="relative z-10 scroll-mt-20 py-24 lg:py-32">
        <SectionAuroraAccent position="right" />
        <FadeIn>
        <div className="mx-auto max-w-screen-xl px-6 lg:px-10">
          <div className="mb-16 max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Publications
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Published research
            </h2>
          </div>

          <div className="grid gap-6">
            {publications.map((pub) => (
              <a
                key={pub.title}
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-primary/5 via-card/95 to-accent/5 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 md:flex-row md:items-start md:gap-6"
              >
                <BookOpen className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <div className="mt-3 flex-1 md:mt-0">
                  <h3 className="text-base font-semibold text-foreground leading-snug transition-colors group-hover:text-primary text-balance">
                    {pub.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {pub.authors.split("T. Potu").map((part, i, arr) =>
                      i < arr.length - 1 ? (
                        <span key={i}>
                          {part}
                          <strong className="text-foreground">T. Potu</strong>
                        </span>
                      ) : (
                        <span key={i}>{part}</span>
                      )
                    )}
                  </p>
                  <p className="mt-1 text-sm italic text-muted-foreground">
                    {pub.venue}, {pub.year}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {pub.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border/50 bg-secondary/50 px-2.5 py-0.5 text-[11px] font-medium text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
              </a>
            ))}
          </div>
        </div>
        </FadeIn>
      </section>

      {/* ===== Experience ===== */}
      <section id="experience" className="relative z-10 scroll-mt-20 py-24 lg:py-32">
        <SectionAuroraAccent position="left" />
        <FadeIn>
        <div className="mx-auto max-w-screen-xl px-6 lg:px-10">
          <div className="mb-16 max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Experience
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Education & work
            </h2>
          </div>

          <div className="relative ml-4 border-l-2 border-border/40 pl-8">
            {experience.map((item, i) => (
              <div key={i} className="relative mb-10 last:mb-0">
                <div className="absolute -left-[41px] flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary bg-background">
                  {item.type === "education" ? (
                    <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                  ) : (
                    <Briefcase className="h-3 w-3 text-primary" />
                  )}
                </div>
                <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-primary/5 via-card/95 to-accent/5 p-6 backdrop-blur-sm">
                  <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                    <h3 className="text-base font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                      {item.date}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-primary">
                    {item.org}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        </FadeIn>
      </section>

      {/* ===== Featured Projects ===== */}
      <section id="projects" className="relative z-10 scroll-mt-20 py-24 lg:py-32">
        <SectionAuroraAccent position="right" />
        <FadeIn>
        <div className="mx-auto max-w-screen-xl px-6 lg:px-10">
          <div className="mb-16 max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Projects & Publications
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Featured work
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Published research, production systems, and open-source projects spanning
              graph ML, speech AI, deep learning, and AI agents.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {featuredProjects.map((p) => (
              <FeaturedProjectCard key={p.title} project={p} />
            ))}
          </div>

          <div className="mt-20">
            <h3 className="mb-8 text-xl font-semibold text-foreground">
              More projects
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {projectGroups.map((group) => (
                <div
                  key={group.category}
                  className="flex flex-col rounded-2xl border border-border/60 bg-gradient-to-br from-primary/5 via-card/95 to-accent/5 p-6 backdrop-blur-sm"
                >
                  <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary">
                    {group.category}
                  </h4>
                  <ul className="space-y-3">
                    {group.projects.map((p) => (
                      <li key={p.title}>
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-start justify-between gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <span className="leading-snug">{p.title}</span>
                          <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="https://github.com/TejPotu?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card"
            >
              View all repositories
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        </FadeIn>
      </section>

      {/* ===== Technologies ===== */}
      <section id="skills" className="relative z-10 scroll-mt-20 py-24 lg:py-32">
        <SectionAuroraAccent position="left" />
        <FadeIn>
        <div className="mx-auto max-w-screen-xl px-6 lg:px-10">
          <div className="mb-16 max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Technologies
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Tools I work with
            </h2>
          </div>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {skillGroups.map((group) => (
              <div
                key={group.label}
                className="rounded-2xl border border-border/60 bg-gradient-to-br from-primary/5 via-card/95 to-accent/5 p-6 backdrop-blur-sm"
              >
                <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-primary">
                  {group.label}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-sm text-foreground"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-primary to-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        </FadeIn>
      </section>

      {/* ===== Contact ===== */}
      <section id="contact" className="relative z-10 scroll-mt-20 py-24 lg:py-32">
        <FadeIn>
        <div className="mx-auto max-w-screen-xl px-6 lg:px-10">
          <div className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 via-card/95 to-accent/10 p-12 text-center backdrop-blur-sm lg:p-16">
            {/* Card internal aurora */}
            <div
              className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full opacity-20 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, hsl(262 83% 58%) 0%, transparent 70%)",
              }}
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full opacity-15 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, hsl(172 66% 50%) 0%, transparent 70%)",
              }}
              aria-hidden="true"
            />

            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Contact
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              {"Let's work together"}
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {"I'm actively seeking PhD internship opportunities in AI/ML. Open to research collaborations, internship roles, or conversations about agentic AI and computational biology."}
            </p>

            <div className="mt-10 flex flex-col items-center gap-6">
              <Link
                href="mailto:tejpotu@gmail.com"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:brightness-110"
              >
                Get in touch
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              <SocialLinks />
            </div>
          </div>
        </div>
        </FadeIn>
      </section>

      {/* ===== Footer ===== */}
      <footer className="relative z-10 border-t border-border/40 py-8">
        <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground sm:flex-row lg:px-10">
          <p>Teja Potu</p>
          <p>
            Built with{" "}
            <Link
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground transition-colors hover:text-primary"
            >
              Next.js
            </Link>{" "}
            and{" "}
            <Link
              href="https://tailwindcss.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground transition-colors hover:text-primary"
            >
              Tailwind CSS
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
