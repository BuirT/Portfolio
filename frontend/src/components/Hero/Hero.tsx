import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, MessageSquare, Terminal } from "lucide-react"
import { useTranslation } from "react-i18next"

export function Hero() {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLElement>(null)
  
  // Parallax Scroll for the Avatar and Background Elements
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const avatarY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const opacityFade = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const scrollTo = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      window.scrollTo({
        top: (element as HTMLElement).offsetTop - 80,
        behavior: "smooth",
      })
    }
  }

  // Floating animation for small tech accents
  const floatAnim = {
    y: [-10, 10, -10],
    transition: { repeat: Infinity, duration: 4, ease: "easeInOut" as const }
  }

  return (
    <section 
      ref={containerRef}
      id="home" 
      className="relative w-full min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden bg-background py-20 lg:py-0"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,color-mix(in_oklch,var(--primary)_8%,transparent)_0%,transparent_70%)]" />
      <div className="scanlines opacity-20" />
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Main Grid Layout: Left Info - Center Avatar - Right Info */}
      <div className="w-full px-6 lg:px-12 xl:px-20 max-w-[1920px] relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        
        {/* LEFT COLUMN: Greeting & CTA */}
        <motion.div 
          style={{ opacity: opacityFade }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary font-mono text-xs tracking-widest uppercase backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            {t("hero.available")}
          </div>
          
          <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold font-heading tracking-tight text-foreground leading-[1.1] mb-6">
            {t("hero.greeting")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-gradient bg-[length:200%_auto]">BuirT</span>
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button 
              size="lg" 
              className="gap-2 h-14 px-8 rounded-full border border-primary bg-primary hover:bg-primary/80 text-primary-foreground shadow-[0_0_20px_color-mix(in_oklch,var(--primary)_40%,transparent)] transition-all duration-300"
              onClick={() => scrollTo("#projects")}
            >
              {t("hero.explore")} <ArrowRight className="h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="gap-2 h-14 px-8 rounded-full border-border/50 bg-background/50 hover:bg-muted transition-all duration-300 backdrop-blur-md"
              onClick={() => scrollTo("#contact")}
            >
              <MessageSquare className="h-5 w-5" /> {t("hero.talk")}
            </Button>
          </div>
        </motion.div>

        {/* CENTER COLUMN: The Avatar */}
        <div className="flex-[1.2] flex justify-center items-center relative order-1 lg:order-2">
          {/* Intense Glowing Backdrop for Avatar */}
          <div className="absolute w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-primary/20 rounded-full mix-blend-screen filter blur-[80px] animate-pulse pointer-events-none" />
          
          <motion.div 
            style={{ y: avatarY }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-20 w-[260px] h-[340px] md:w-[320px] md:h-[420px] lg:w-[400px] lg:h-[520px] flex items-center justify-center group"
          >
            {/* Styled Rounded Rectangle Frame for Avatar (Shows more of the photo) */}
            <div className="relative w-full h-full rounded-[2rem] md:rounded-[3rem] border-[6px] border-background overflow-hidden bg-muted shadow-[0_0_50px_color-mix(in_oklch,var(--primary)_30%,transparent)] transition-all duration-700 group-hover:shadow-[0_0_80px_color-mix(in_oklch,var(--primary)_60%,transparent)]">
              <img 
                src={`${import.meta.env.BASE_URL}avt.png`} 
                alt="BuirT Avatar" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-accent/10 mix-blend-overlay pointer-events-none" />
              
              {/* Inner glowing ring */}
              <div className="absolute inset-0 z-30 rounded-[2rem] md:rounded-[3rem] border border-white/20 animate-pulse pointer-events-none" />
            </div>

            {/* Orbiting Tech Accents */}
            <motion.div animate={floatAnim} className="absolute -left-4 top-1/4 p-3 bg-background/80 backdrop-blur-md border border-primary/30 rounded-xl shadow-xl">
              <Terminal className="w-5 h-5 text-primary" />
            </motion.div>
            <motion.div animate={{ ...floatAnim, transition: { ...floatAnim.transition, delay: 1 } }} className="absolute -right-4 bottom-1/4 p-3 bg-background/80 backdrop-blur-md border border-accent/30 rounded-xl shadow-xl">
              <span className="text-accent font-bold font-mono">&lt;/&gt;</span>
            </motion.div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Description & Stats */}
        <motion.div 
          style={{ opacity: opacityFade }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex-1 flex flex-col items-center lg:items-end text-center lg:text-right order-3"
        >
          <div className="bg-background/40 backdrop-blur-xl p-6 rounded-2xl border border-border/50 shadow-xl max-w-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-accent" />
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {t("hero.description")}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap justify-center lg:justify-end gap-6 text-sm font-mono text-muted-foreground">
            <div className="flex flex-col items-center lg:items-end gap-1">
              <span className="text-2xl font-bold text-foreground">3+</span>
              <span>{t("hero.stats.experience")}</span>
            </div>
            <div className="flex flex-col items-center lg:items-end gap-1">
              <span className="text-2xl font-bold text-foreground">15+</span>
              <span>{t("hero.stats.projects")}</span>
            </div>
            <div className="flex flex-col items-center lg:items-end gap-1">
              <span className="text-2xl font-bold text-primary">100%</span>
              <span>{t("hero.stats.dedication")}</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
