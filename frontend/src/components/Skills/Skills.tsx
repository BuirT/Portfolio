import { motion, useInView } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { useState, useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"

const SKILLS_CONFIG = [
  {
    key: "frontend",
    color: "from-cyan-400 to-blue-500",
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
    color: "from-emerald-400 to-teal-500",
    skills: [
      { name: "Node.js / Express.js", level: 90 },
      { name: "PHP", level: 85 },
      { name: "REST API / WebSockets", level: 90 },
    ],
    bentoClass: "lg:col-span-1 md:col-span-1",
  },
  {
    key: "database",
    color: "from-orange-400 to-rose-500",
    skills: [
      { name: "SQL Server", level: 95 },
      { name: "MySQL", level: 90 },
      { name: "PostgreSQL", level: 80 },
    ],
    bentoClass: "lg:col-span-1 md:col-span-1",
  },
  {
    key: "desktop",
    color: "from-purple-400 to-indigo-500",
    skills: [
      { name: "C# / .NET", level: 90 },
      { name: "Windows Forms", level: 85 },
      { name: "Guna Framework", level: 85 },
    ],
    bentoClass: "lg:col-span-1 md:col-span-1",
  },
  {
    key: "ai",
    color: "from-pink-400 to-rose-500",
    skills: [
      { name: "Ollama Integration", level: 80 },
      { name: "LLMs Implementation", level: 75 },
      { name: "IoT Integration", level: 85 },
    ],
    bentoClass: "lg:col-span-1 md:col-span-1",
  },
  {
    key: "tools",
    color: "from-amber-400 to-orange-500",
    skills: [
      { name: "Git / GitHub", level: 95 },
      { name: "Agile / Scrum", level: 85 },
    ],
    bentoClass: "lg:col-span-3 md:col-span-2",
  },
]

function SkillBar({ name, level, colorClass }: { name: string; level: number; colorClass: string }) {
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
    <li ref={ref as any} className="mb-4">
      <div className="flex justify-between mb-1.5">
        <span className="text-sm font-medium text-foreground/90">{name}</span>
        <span className={`text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r ${colorClass}`}>{progress}%</span>
      </div>
      <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden border border-white/5 backdrop-blur-sm">
        <div 
          className={`h-full bg-gradient-to-r ${colorClass} transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(255,255,255,0.3)]`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </li>
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
    <article
      ref={divRef as any}
      onMouseMove={handleMouseMove}
      onFocus={() => { setIsFocused(true); setOpacity(1) }}
      onBlur={() => { setIsFocused(false); setOpacity(0) }}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className="relative flex flex-col h-full overflow-hidden rounded-2xl border border-white/10 bg-background/40 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] group"
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,.08), transparent 40%)`,
        }}
      />
      
      <div className="relative z-10">
        <h3 className={`text-sm font-bold tracking-widest mb-6 uppercase flex items-center gap-3 bg-clip-text text-transparent bg-gradient-to-r ${category.color}`}>
          <span className={`w-2.5 h-2.5 rounded-full shadow-lg bg-gradient-to-r ${category.color} animate-pulse`} />
          {title}
        </h3>
        <ul className="space-y-4 m-0 p-0 list-none">
          {category.skills.map((skill) => (
            <SkillBar key={skill.name} name={skill.name} level={skill.level} colorClass={category.color} />
          ))}
        </ul>
      </div>
    </article>
  )
}

export function Skills() {
  const { t } = useTranslation()

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-transparent">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background/60 to-background/90 pointer-events-none" />
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

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto m-0 p-0 list-none">
          {SKILLS_CONFIG.map((category, index) => (
            <motion.li
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
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
