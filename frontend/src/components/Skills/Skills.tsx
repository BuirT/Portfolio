import { motion, useInView } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { useState, useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"

const SKILLS_CONFIG = [
  {
    key: "frontend",
    skills: [
      { name: "React.js / Next.js", level: 90 },
      { name: "HTML / CSS / JS", level: 95 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Framer Motion", level: 85 },
    ],
    bentoClass: "lg:col-span-2 md:col-span-2",
  },
  {
    key: "backend",
    skills: [
      { name: "Node.js / Express.js", level: 90 },
      { name: "PHP", level: 85 },
      { name: "REST API / WebSockets", level: 90 },
    ],
    bentoClass: "lg:col-span-1 md:col-span-1",
  },
  {
    key: "database",
    skills: [
      { name: "SQL Server", level: 95 },
      { name: "MySQL", level: 90 },
      { name: "PostgreSQL", level: 80 },
    ],
    bentoClass: "lg:col-span-1 md:col-span-1",
  },
  {
    key: "desktop",
    skills: [
      { name: "C# / .NET", level: 90 },
      { name: "Windows Forms", level: 85 },
      { name: "Guna Framework", level: 85 },
    ],
    bentoClass: "lg:col-span-1 md:col-span-1",
  },
  {
    key: "ai",
    skills: [
      { name: "Ollama Integration", level: 80 },
      { name: "LLMs Implementation", level: 75 },
      { name: "IoT Integration", level: 85 },
    ],
    bentoClass: "lg:col-span-1 md:col-span-1",
  },
  {
    key: "tools",
    skills: [
      { name: "Git / GitHub", level: 95 },
      { name: "Docker", level: 70 },
      { name: "Agile / Scrum", level: 85 },
    ],
    bentoClass: "lg:col-span-3 md:col-span-2",
  },
]

function SkillBar({ name, level }: { name: string; level: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setProgress(level), 200)
      return () => clearTimeout(timer)
    }
  }, [isInView, level])

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-1.5">
        <span className="text-sm font-medium text-foreground/80">{name}</span>
        <span className="text-sm text-muted-foreground">{progress}%</span>
      </div>
      <Progress value={progress} className="h-2 transition-all duration-1000 ease-out bg-muted border border-border/30" />
    </div>
  )
}

function BentoSkillCard({ category, title }: { category: typeof SKILLS_CONFIG[0], title: string }) {
  const divRef = useRef<HTMLDivElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return
    const div = divRef.current
    const rect = div.getBoundingClientRect()
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={() => { setIsFocused(true); setOpacity(1) }}
      onBlur={() => { setIsFocused(false); setOpacity(0) }}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className="relative flex flex-col h-full overflow-hidden rounded-2xl border border-border/50 bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg group"
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,.04), transparent 40%)`,
        }}
      />
      
      <div 
        className="absolute inset-0 z-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, color-mix(in oklch, var(--accent) 10%, transparent), transparent 40%)`,
        }}
      />

      <div className="relative z-10">
        <h3 className="text-xs font-bold tracking-widest text-accent mb-6 uppercase flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          {title}
        </h3>
        <div className="space-y-4">
          {category.skills.map((skill) => (
            <SkillBar key={skill.name} name={skill.name} level={skill.level} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function Skills() {
  const { t } = useTranslation()

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-muted/20">
      <div className="w-full px-6 lg:px-12 xl:px-20 max-w-[1920px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm text-primary font-medium text-sm tracking-wide">
            {t("skills.badge")}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-heading">{t("skills.title")}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("skills.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {SKILLS_CONFIG.map((category, index) => (
            <motion.div
              key={category.key}
              className={category.bentoClass}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <BentoSkillCard 
                category={category} 
                title={t(`skills.categories.${category.key}`)} 
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
