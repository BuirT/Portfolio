import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Globe, Monitor, Link as LinkIcon, Bot, Database, Settings } from "lucide-react"
import { useTranslation } from "react-i18next"

const SERVICES_CONFIG = [
  {
    key: "web",
    icon: <Globe className="h-8 w-8" />,
    tech: ["React.js", "Node.js", "PHP", "JavaScript"],
    bentoClass: "lg:col-span-2 lg:row-span-2 md:col-span-2",
  },
  {
    key: "desktop",
    icon: <Monitor className="h-8 w-8" />,
    tech: ["C#", ".NET", "WinForms"],
    bentoClass: "lg:col-span-2 md:col-span-1",
  },
  {
    key: "ai",
    icon: <Bot className="h-8 w-8" />,
    tech: ["Ollama", "LLMs", "Qwen2.5"],
    bentoClass: "lg:col-span-1 md:col-span-1",
  },
  {
    key: "db",
    icon: <Database className="h-8 w-8" />,
    tech: ["SQL Server", "MySQL"],
    bentoClass: "lg:col-span-1 md:col-span-1",
  },
  {
    key: "fullstack",
    icon: <LinkIcon className="h-8 w-8" />,
    tech: ["E-commerce", "Role-based Access"],
    bentoClass: "lg:col-span-2 md:col-span-2",
  },
  {
    key: "iot",
    icon: <Settings className="h-8 w-8" />,
    tech: ["Real-time", "WebSockets", "Hardware APIs"],
    bentoClass: "lg:col-span-2 md:col-span-2",
  },
]

// BentoCard with Mechanical JDM style
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

  return (
    <article
      ref={divRef as any}
      onMouseMove={handleMouseMove}
      onFocus={() => { setIsFocused(true); setOpacity(1) }}
      onBlur={() => { setIsFocused(false); setOpacity(0) }}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className="relative flex flex-col h-full overflow-hidden rounded-none border border-black/15 dark:border-border shadow-sm dark:shadow-none bg-card/60 p-6 sm:p-8 transition-all duration-300 hover:border-primary/50 group"
    >
      {/* Background glow tracker */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, var(--hover-glow, rgba(0,240,255,.15)), transparent 40%)`,
        }}
      />
      
      {/* Mechanical accents */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/50 group-hover:border-primary transition-colors z-10" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/50 group-hover:border-primary transition-colors z-10" />

      <div className="relative z-10 flex h-full flex-col">
        <div className={`w-14 h-14 rounded-none border border-primary/30 flex items-center justify-center mb-8 transition-colors duration-300 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-black`}>
          {service.icon}
        </div>
        
        <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter group-hover:text-primary transition-colors">
          {t(`services.items.${service.key}.title`)}
        </h3>
        
        <p className="text-muted-foreground leading-relaxed flex-grow font-mono text-sm border-l border-border pl-4 mb-6">
          {t(`services.items.${service.key}.description`)}
        </p>

        {/* Decorative Visuals for large cards (Web App) */}
        {service.key === 'web' && (
          <div className="relative flex-grow w-full mb-6 rounded-md border border-primary/20 bg-slate-50 dark:bg-[#020808] overflow-hidden flex items-center justify-center min-h-[180px] group/web">
             {/* Cyberpunk Grid Background */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(0,240,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.05)_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
             
             {/* Abstract floating UI panels */}
             <motion.div 
               animate={{ y: [0, -5, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="w-[85%] h-[75%] border border-blue-600/30 dark:border-[#00f0ff]/30 bg-white dark:bg-black/60 shadow-[0_5px_20px_rgba(37,99,235,0.15)] dark:shadow-[0_0_15px_rgba(0,240,255,0.1)] flex flex-col relative z-10 backdrop-blur-md group-hover/web:border-blue-600/50 dark:group-hover/web:border-[#00f0ff]/60 group-hover/web:shadow-[0_8px_30px_rgba(37,99,235,0.25)] dark:group-hover/web:shadow-[0_0_25px_rgba(0,240,255,0.2)] transition-all duration-500 rounded-lg dark:rounded-sm overflow-hidden"
             >
               {/* Browser Bar */}
               <div className="h-5 border-b border-blue-600/20 dark:border-[#00f0ff]/30 bg-blue-600/5 dark:bg-[#00f0ff]/5 flex items-center px-2.5 gap-1.5">
                 <div className="w-2 h-2 rounded-full bg-red-400 dark:bg-[#00f0ff]/30" />
                 <div className="w-2 h-2 rounded-full bg-yellow-400 dark:bg-[#00f0ff]/30" />
                 <div className="w-2 h-2 rounded-full bg-green-400 dark:bg-[#00f0ff]/30" />
                 <div className="ml-auto w-16 h-1.5 bg-blue-600/15 dark:bg-[#00f0ff]/20 rounded-full" />
               </div>
               
               {/* Code / Content lines */}
               <div className="flex-1 p-4 flex flex-col gap-3 relative overflow-hidden bg-slate-50/50 dark:bg-transparent">
                 <div className="flex gap-3">
                   <div className="w-10 h-10 rounded-md border border-blue-600/20 dark:border-[#00f0ff]/30 bg-blue-600/10 dark:bg-[#00f0ff]/10 flex-shrink-0" />
                   <div className="flex-1 flex flex-col gap-2 justify-center">
                      <div className="w-3/4 h-2 bg-blue-600/30 dark:bg-[#00f0ff]/40 rounded-full" />
                      <div className="w-1/2 h-2 bg-blue-600/15 dark:bg-[#00f0ff]/20 rounded-full" />
                   </div>
                 </div>
                 <div className="w-full h-2 bg-blue-600/10 dark:bg-[#00f0ff]/10 rounded-full mt-2" />
                 <div className="w-5/6 h-2 bg-blue-600/10 dark:bg-[#00f0ff]/10 rounded-full" />
                 
                 {/* Floating scanner line */}
                 <motion.div
                   animate={{ top: ["0%", "100%", "0%"] }}
                   transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                   className="absolute left-0 right-0 h-[2px] bg-blue-600/50 dark:bg-[#00f0ff] shadow-[0_0_8px_rgba(37,99,235,0.5)] dark:shadow-[0_0_8px_#00f0ff] opacity-50 pointer-events-none"
                 />
               </div>
             </motion.div>
             
             {/* Decorative floating widgets */}
             <motion.div
               animate={{ y: [0, 5, 0], x: [0, 2, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute -right-4 top-8 w-20 h-24 border border-blue-600/20 dark:border-[#00f0ff]/20 bg-white/95 dark:bg-black/80 backdrop-blur-xl shadow-[0_5px_15px_rgba(37,99,235,0.1)] dark:shadow-none rounded-lg dark:rounded-sm z-20 flex flex-col gap-2 p-3"
             >
                <div className="w-full h-1/2 bg-gradient-to-br from-blue-600/20 to-blue-600/5 dark:from-[#00f0ff]/10 dark:to-[#00f0ff]/5 rounded-md border border-blue-600/20 dark:border-[#00f0ff]/20" />
                <div className="w-3/4 h-1.5 bg-blue-600/30 dark:bg-[#00f0ff]/30 rounded-full mt-1" />
                <div className="w-1/2 h-1.5 bg-blue-600/15 dark:bg-[#00f0ff]/20 rounded-full" />
             </motion.div>
          </div>
        )}

        <ul className="flex flex-wrap gap-2 pt-6 mt-auto m-0 p-0 list-none border-t border-border">
          {service.tech.map((t) => (
            <li key={t} className="text-xs font-bold text-muted-foreground bg-background border border-black/15 dark:border-border shadow-sm dark:shadow-none px-3 py-1 rounded-none font-mono tracking-wider">
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
    <section id="services" className="py-24 relative overflow-hidden bg-background border-t border-border">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 text-[12vw] font-black text-black opacity-5 dark:text-white dark:opacity-[0.03] whitespace-nowrap pointer-events-none select-none z-0 tracking-tighter text-right leading-none">
        {t("watermarks.services")}
      </div>

      <div className="w-full px-6 lg:px-12 xl:px-20 max-w-[1920px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-right mb-20 border-r-[4px] border-primary pr-6"
        >
          <div className="inline-block mb-4 px-3 py-1 border border-primary/50 bg-primary/10 text-primary font-bold text-xs tracking-[0.2em] uppercase font-mono">
            {t("services.badge")}
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 uppercase tracking-tighter">{t("services.title")}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl ml-auto font-mono">
            {t("services.subtitle")}
          </p>
        </motion.div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto m-0 p-0 list-none">
          {SERVICES_CONFIG.map((service, index) => (
            <motion.li 
              key={service.key} 
              className={service.bentoClass}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "circOut" }}
            >
              <BentoCard service={service} t={t} />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
