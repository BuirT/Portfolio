import { motion, useInView } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"

const SKILLS_CONFIG = [
  {
    key: "frontend",
    color: "from-primary to-primary/50", // Unify to primary red
    skills: [
      { name: "React.js / Next.js", level: 90 },
      { name: "TypeScript / JS", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "HTML5 / CSS3", level: 90 },
      { name: "Framer Motion", level: 85 },
    ],
    bentoClass: "lg:col-span-2 md:col-span-2",
  },
  {
    key: "backend",
    color: "from-foreground to-foreground/50", // Silver/Dark accent depending on theme
    skills: [
      { name: "Node.js / Express.js", level: 90 },
      { name: "PHP", level: 85 },
      { name: "REST API / WebSockets", level: 90 },
    ],
    bentoClass: "lg:col-span-1 md:col-span-1",
  },
  {
    key: "database",
    color: "from-primary to-primary/50",
    skills: [
      { name: "SQL Server", level: 95 },
      { name: "MySQL", level: 90 },
      { name: "PostgreSQL", level: 80 },
    ],
    bentoClass: "lg:col-span-1 md:col-span-1",
  },
  {
    key: "desktop",
    color: "from-foreground to-foreground/50",
    skills: [
      { name: "C# / .NET", level: 90 },
      { name: "Windows Forms", level: 85 },
      { name: "Guna Framework", level: 85 },
    ],
    bentoClass: "lg:col-span-1 md:col-span-1",
  },
  {
    key: "ai",
    color: "from-primary to-primary/50",
    skills: [
      { name: "Ollama Integration", level: 80 },
      { name: "LLMs Implementation", level: 75 },
      { name: "IoT Integration", level: 85 },
    ],
    bentoClass: "lg:col-span-1 md:col-span-1",
  },
  {
    key: "tools",
    color: "from-foreground to-foreground/50",
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
    <li ref={ref as any} className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-bold text-foreground/90 font-mono tracking-wider">{name}</span>
        <span className={`text-sm font-black bg-clip-text text-transparent bg-gradient-to-r ${colorClass} font-mono`}>{progress}%</span>
      </div>
      <div className="h-[4px] w-full bg-background border border-border overflow-hidden relative">
        {/* Notch markers for gauge look */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--foreground)_1px,transparent_1px)] opacity-10 bg-[size:10%_100%] pointer-events-none z-10" />
        <div 
          className={`h-full bg-gradient-to-r ${colorClass} transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(0,240,255,0.5)]`}
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
      className="relative flex flex-col h-full overflow-hidden rounded-none border border-border bg-card/60 p-6 sm:p-8 transition-all duration-300 hover:border-primary/50 group"
    >
      {/* Glow effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(0,240,255,.1), transparent 40%)`,
        }}
      />
      
      {/* Top accent border */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative z-10">
        <h3 className={`text-sm font-black tracking-[0.2em] mb-8 uppercase flex items-center gap-3 bg-clip-text text-transparent bg-gradient-to-r ${category.color} font-mono`}>
          <span className={`w-3 h-3 border-[2px] border-current bg-transparent rotate-45`} />
          {title}
        </h3>
        <ul className="space-y-2 m-0 p-0 list-none">
          {category.skills.map((skill) => (
            <SkillBar key={skill.name} name={skill.name} level={skill.level} colorClass={category.color} />
          ))}
        </ul>
      </div>
      
      {/* Background decoration */}
      <div className="absolute -bottom-10 -right-10 text-[120px] font-black text-black opacity-5 dark:text-white dark:opacity-[0.03] select-none pointer-events-none z-0 rotate-12">
        {category.key.substring(0, 2).toUpperCase()}
      </div>
    </article>
  )
}

export function Skills() {
  const { t } = useTranslation()

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-background border-t border-border">
      {/* Background Watermark */}
      <div className="absolute bottom-0 right-0 text-[12vw] font-black text-black opacity-5 dark:text-white dark:opacity-[0.03] whitespace-nowrap pointer-events-none select-none z-0 tracking-tighter text-right leading-none">
        {t("watermarks.skills")}
      </div>

      <div className="w-full px-6 lg:px-12 xl:px-20 max-w-[1920px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-left mb-16 border-l-[4px] border-primary pl-6"
        >
          <div className="inline-block mb-4 px-3 py-1 border border-primary/50 bg-primary/10 text-primary font-bold text-xs tracking-[0.2em] uppercase font-mono">
            {t("skills.badge")}
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 uppercase tracking-tighter">{t("skills.title")}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl font-mono">
            {t("skills.subtitle")}
          </p>
        </motion.div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto m-0 p-0 list-none relative">
          {SKILLS_CONFIG.map((category, index) => (
            <motion.li
              key={category.key}
              className={category.bentoClass}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
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
