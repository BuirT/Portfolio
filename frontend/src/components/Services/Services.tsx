import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Globe, Monitor, Link as LinkIcon, Bot, Database, Settings } from "lucide-react"
import { useTranslation } from "react-i18next"

const SERVICES_CONFIG = [
  {
    key: "web",
    icon: <Globe className="h-8 w-8" />,
    tech: ["React.js", "Node.js", "PHP", "JavaScript"],
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    bentoClass: "lg:col-span-2 lg:row-span-2 md:col-span-2",
  },
  {
    key: "desktop",
    icon: <Monitor className="h-8 w-8" />,
    tech: ["C#", ".NET", "WinForms"],
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    bentoClass: "lg:col-span-2 md:col-span-1",
  },
  {
    key: "ai",
    icon: <Bot className="h-8 w-8" />,
    tech: ["Ollama", "LLMs", "Qwen2.5"],
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    bentoClass: "lg:col-span-1 md:col-span-1",
  },
  {
    key: "db",
    icon: <Database className="h-8 w-8" />,
    tech: ["SQL Server", "MySQL"],
    color: "text-red-400",
    bg: "bg-red-500/10",
    bentoClass: "lg:col-span-1 md:col-span-1",
  },
  {
    key: "fullstack",
    icon: <LinkIcon className="h-8 w-8" />,
    tech: ["E-commerce", "Role-based Access"],
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    bentoClass: "lg:col-span-2 md:col-span-2",
  },
  {
    key: "iot",
    icon: <Settings className="h-8 w-8" />,
    tech: ["Real-time", "WebSockets", "Hardware APIs"],
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    bentoClass: "lg:col-span-2 md:col-span-2",
  },
]

// BentoCard with Mouse Glow effect
function BentoCard({ service, t }: { service: typeof SERVICES_CONFIG[0], t: any }) {
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

  const handleFocus = () => {
    setIsFocused(true)
    setOpacity(1)
  }

  const handleBlur = () => {
    setIsFocused(false)
    setOpacity(0)
  }

  const handleMouseEnter = () => {
    setOpacity(1)
  }

  const handleMouseLeave = () => {
    setOpacity(0)
  }

  return (
    <article
      ref={divRef as any}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col h-full overflow-hidden rounded-2xl border border-border/50 bg-card p-8 transition-all hover:-translate-y-1 hover:shadow-xl group"
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,.06), transparent 40%)`,
        }}
      />
      
      {/* Glow on hover for the border */}
      <div 
        className="absolute inset-0 z-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, color-mix(in oklch, var(--primary) 15%, transparent), transparent 40%)`,
        }}
      />

      <div className="relative z-10 flex h-full flex-col">
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-500 ${service.bg} ${service.color} group-hover:scale-110 shadow-inner`}>
          {service.icon}
        </div>
        
        <h3 className="text-2xl font-bold mb-3 font-heading group-hover:text-primary transition-colors">
          {t(`services.items.${service.key}.title`)}
        </h3>
        
        <p className="text-muted-foreground leading-relaxed flex-grow">
          {t(`services.items.${service.key}.description`)}
        </p>

        <ul className="flex flex-wrap gap-2 pt-6 mt-auto m-0 p-0 list-none">
          {service.tech.map((t) => (
            <li key={t} className="text-xs font-medium text-muted-foreground bg-muted/50 border border-border/50 px-3 py-1.5 rounded-full backdrop-blur-sm">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export function Services() {
  const { t } = useTranslation()

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="w-full px-6 lg:px-12 xl:px-20 max-w-[1920px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 backdrop-blur-sm text-accent font-medium text-sm tracking-wide">
            {t("services.badge")}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading">{t("services.title")}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("services.subtitle")}
          </p>
        </motion.div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto m-0 p-0 list-none">
          {SERVICES_CONFIG.map((service, index) => (
            <motion.li 
              key={service.key} 
              className={service.bentoClass}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <BentoCard service={service} t={t} />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
