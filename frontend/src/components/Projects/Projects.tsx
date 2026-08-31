import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { ExternalLink, X, ChevronLeft, ChevronRight, Eye } from "lucide-react"
import { Github } from "@/components/icons"
import { useTranslation } from "react-i18next"

const PROJECTS_CONFIG = [
  {
    id: 1,
    key: "newspay",
    technologies: ["React.js", "Node.js", "SQL Server", "C# .NET", "Ollama AI"],
    links: {
      github: "https://github.com/BuirT/DATN-nhuanbutweb",
      githubWinform: "https://github.com/BuirT/DATN-nhuanbutwinform",
    },
    images: Array.from({ length: 16 }, (_, i) => `${import.meta.env.BASE_URL}images/projects/newspay/${i + 1}.png`)
  },
  {
    id: 2,
    key: "webvatlieuxaydung",
    technologies: ["PHP", "MySQL", "Vanilla CSS", "JavaScript"],
    links: {
      github: "https://github.com/BuirT/WebVatlieuxaydung",
    },
    images: Array.from({ length: 17 }, (_, i) => `${import.meta.env.BASE_URL}images/projects/vatlieuxaydung/(${i + 1}).jpeg`)
  },
  {
    id: 3,
    key: "btflix",
    technologies: ["Next.js", "React.js", "Tailwind CSS", "Node.js"],
    links: {
      github: "https://github.com/BuirT/BTFlix",
    },
    images: Array.from({ length: 16 }, (_, i) => `${import.meta.env.BASE_URL}images/projects/BTFlix/(${i + 1}).jpeg`)
  },
  {
    id: 4,
    key: "datnhethongcanhbaodien",
    technologies: ["HTML5", "CSS3", "JavaScript", "IoT"],
    links: {
      github: "https://github.com/TriDung3010/DATNhethongcanhbaodien",
    },
    images: [
      `${import.meta.env.BASE_URL}images/projects/hethongcanhbaodien/iot.JPG`,
      `${import.meta.env.BASE_URL}images/projects/hethongcanhbaodien/dashboard (1).png`,
      `${import.meta.env.BASE_URL}images/projects/hethongcanhbaodien/dashboard (2).png`,
      `${import.meta.env.BASE_URL}images/projects/hethongcanhbaodien/dashboard (3).png`,
      `${import.meta.env.BASE_URL}images/projects/hethongcanhbaodien/login.png`
    ]
  }
]

export function Projects() {
  const { t } = useTranslation()
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS_CONFIG[0] | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFullscreenImage, setIsFullscreenImage] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number>(0)

  const openModal = (project: typeof PROJECTS_CONFIG[0]) => {
    setSelectedProject(project)
    setCurrentImageIndex(0)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setSelectedProject(null)
    setIsFullscreenImage(false)
    document.body.style.overflow = "auto"
  }

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length)
    }
  }

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length)
    }
  }

  useEffect(() => {
    if (!selectedProject || selectedProject.images.length <= 1 || isFullscreenImage) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length);
    }, 2500);
    
    return () => clearInterval(interval);
  }, [selectedProject, isFullscreenImage]);

  return (
    <section id="projects" className="py-20 bg-background relative border-t border-border">
      {/* Background Watermark */}
      <div className="absolute top-[10%] left-0 text-[10vw] font-black text-black opacity-5 dark:text-white dark:opacity-[0.03] whitespace-nowrap pointer-events-none select-none z-0 tracking-tighter writing-vertical-rl">
        {t("watermarks.projects")}
      </div>

      <div className="w-full px-4 lg:px-12 xl:px-20 max-w-[1920px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.8 }}
          transition={{ duration: 0.5 }}
          className="text-left mb-12 md:mb-20 border-l-[4px] border-primary pl-6"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tighter uppercase text-foreground">{t("projects.title")}</h2>
          <p className="text-muted-foreground max-w-2xl text-lg font-mono">
            {t("projects.subtitle")}
          </p>
        </motion.div>

        {/* Accordion Container */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="flex flex-col md:flex-row w-full h-[700px] md:h-[600px] gap-1 md:gap-2 bg-card/50 p-2 border border-border"
        >
          {PROJECTS_CONFIG.map((project, index) => (
            <ProjectAccordionItem
              key={project.id}
              project={project}
              index={index}
              isHovered={hoveredIndex === index}
              onHover={() => setHoveredIndex(index)}
              onClick={openModal}
              t={t}
            />
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/90 backdrop-blur-md"
              onClick={closeModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl bg-card border-[2px] border-primary rounded-none shadow-[0_0_40px_rgba(0,240,255,0.15)] overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-primary z-20" />

              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 p-2 bg-background/80 border border-primary text-primary hover:bg-primary hover:text-foreground transition-colors rounded-none"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex-1 overflow-y-auto">
                {/* Image Gallery */}
                <div className="relative w-full h-[30vh] sm:h-[40vh] md:h-[50vh] bg-black flex items-center justify-center overflow-hidden group border-b border-border">
                  <AnimatePresence initial={false}>
                    {selectedProject.images.length > 0 ? (
                      <motion.img 
                        key={currentImageIndex}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                        src={selectedProject.images[currentImageIndex]} 
                        alt={`${t(`projects.items.${selectedProject.key}.title`)} screenshot`}
                        onClick={() => setIsFullscreenImage(true)}
                        className="absolute inset-0 w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://placehold.co/1200x800/1e293b/38bdf8?text=Giao+Di%E1%BB%87n+D%E1%BB%B1+%C3%81n"
                        }}
                      />
                    ) : (
                      <div className="text-muted-foreground font-mono">NO DATA</div>
                    )}
                  </AnimatePresence>

                  {selectedProject.images.length > 1 && (
                    <>
                      <button 
                        onClick={(e) => { e.stopPropagation(); prevImage() }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-background/80 border border-primary text-primary opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-foreground rounded-none"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); nextImage() }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-background/80 border border-primary text-primary opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-foreground rounded-none"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>
                      
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-background/50 px-4 py-2 border border-border">
                        {selectedProject.images.map((_, i) => (
                          <div 
                            key={i} 
                            className={`w-2 h-2 rounded-none transition-colors ${i === currentImageIndex ? "bg-primary shadow-[0_0_10px_var(--primary)]" : "bg-foreground/20"}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Details Content */}
                <div className="p-6 sm:p-8 bg-[linear-gradient(to_right,#00f0ff05_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff05_1px,transparent_1px)] bg-[size:20px_20px]">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <Badge variant="default" className="bg-primary/10 text-primary border border-primary rounded-none font-mono">
                      {t(`projects.items.${selectedProject.key}.type`)}
                    </Badge>
                    <Badge variant="outline" className="text-emerald-500 border-emerald-500/50 rounded-none font-mono">
                      ✓ {t(`projects.items.${selectedProject.key}.status`)}
                    </Badge>
                  </div>
                  
                  <h3 className="text-2xl md:text-5xl font-black mb-4 uppercase tracking-tighter">
                    {t(`projects.items.${selectedProject.key}.title`)}
                  </h3>
                  
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 font-mono border-l-2 border-border pl-4">
                    {t(`projects.items.${selectedProject.key}.description`)}
                  </p>

                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h4 className="font-bold text-sm mb-4 uppercase tracking-[0.2em] text-primary border-b border-border pb-2">
                        {t(`projects.items.${selectedProject.key}.key_features`)}
                      </h4>
                      <ul className="space-y-3 text-muted-foreground font-mono text-sm">
                        {(t(`projects.items.${selectedProject.key}.features`, { returnObjects: true }) as string[]).map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="text-primary mt-1">]</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-sm mb-4 uppercase tracking-[0.2em] text-primary border-b border-border pb-2">
                        {t(`projects.items.${selectedProject.key}.impact_metrics`)}
                      </h4>
                      <ul className="space-y-4">
                        {(t(`projects.items.${selectedProject.key}.metrics`, { returnObjects: true }) as string[]).map((metric, i) => (
                          <li key={i} className="flex gap-4 items-center bg-background/50 p-3 border border-border">
                            <div className="h-8 w-8 bg-primary/20 text-primary font-bold flex items-center justify-center font-mono border border-primary/50">
                              0{i + 1}
                            </div>
                            <p className="text-sm font-medium leading-tight font-mono">{metric}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="font-bold text-sm mb-4 uppercase tracking-[0.2em] text-primary border-b border-border pb-2">SYS.TECH</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map(tech => (
                         <Badge key={tech} variant="secondary" className="px-3 py-1 rounded-none border border-border font-mono text-xs bg-background">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-6 border-t border-border">
                    {selectedProject.links.github && (
                      <a href={selectedProject.links.github} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", className: "gap-2 rounded-none font-mono tracking-wider border-border hover:border-primary hover:text-primary" })}>
                        <Github className="h-5 w-5" /> WEB_REPO
                      </a>
                    )}
                    {selectedProject.links.githubWinform && (
                      <a href={selectedProject.links.githubWinform} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", className: "gap-2 rounded-none font-mono tracking-wider border-border hover:border-primary hover:text-primary" })}>
                        <Github className="h-5 w-5" /> DESKTOP_REPO
                      </a>
                    )}
                    <a href="#contact" onClick={closeModal} className={buttonVariants({ className: "gap-2 rounded-none font-mono tracking-wider font-bold shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:shadow-[0_0_25px_rgba(0,240,255,0.5)]" })}>
                      <ExternalLink className="h-5 w-5" /> INIT_DEMO
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Fullscreen Image Overlay */}
      <AnimatePresence>
        {isFullscreenImage && selectedProject && selectedProject.images.length > 0 && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-8">
            <button 
              onClick={(e) => { e.stopPropagation(); setIsFullscreenImage(false) }}
              className="absolute top-4 right-4 md:top-8 md:right-8 z-50 p-3 bg-foreground/10 backdrop-blur-md rounded-none border border-border text-foreground hover:bg-primary hover:border-primary transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            
            {selectedProject.images.length > 1 && (
              <>
                <button 
                  onClick={(e) => { e.stopPropagation(); prevImage() }}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 p-4 bg-foreground/5 backdrop-blur-md rounded-none border border-border text-muted-foreground hover:text-foreground hover:bg-primary hover:border-primary transition-colors"
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); nextImage() }}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 p-4 bg-foreground/5 backdrop-blur-md rounded-none border border-border text-muted-foreground hover:text-foreground hover:bg-primary hover:border-primary transition-colors"
                >
                  <ChevronRight className="h-8 w-8" />
                </button>
              </>
            )}

            <div 
              className="relative w-full h-full flex items-center justify-center overflow-hidden"
              onClick={() => setIsFullscreenImage(false)}
            >
              <AnimatePresence initial={false}>
                <motion.img 
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  src={selectedProject.images[currentImageIndex]} 
                  alt={`${t(`projects.items.${selectedProject.key}.title`)} full screenshot`}
                  className="absolute max-w-full max-h-full object-contain cursor-zoom-out"
                  onClick={(e) => { e.stopPropagation(); nextImage() }}
                />
              </AnimatePresence>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

function ProjectAccordionItem({ project, isHovered, onHover, onClick, t }: any) {
  const transitionProps = { duration: 0.5, ease: "circOut" as const };

  return (
    <motion.div
      onMouseEnter={onHover}
      onClick={() => onClick(project)}
      animate={{
        flex: isHovered ? 5 : 1,
      }}
      transition={transitionProps}
      className={`relative h-full overflow-hidden rounded-none border-l-[2px] border-border cursor-pointer group ${isHovered ? 'w-full md:w-auto border-primary' : 'w-full md:w-[10%]'}`}
    >
      {/* Background Image */}
      <motion.img
        src={project.images[0]}
        alt={project.key}
        className="absolute inset-0 w-full h-full object-cover filter grayscale-[50%]"
        animate={{
          filter: isHovered ? 'brightness(0.8) grayscale(0%)' : 'brightness(0.2) grayscale(80%)',
          scale: isHovered ? 1.05 : 1,
        }}
        transition={transitionProps}
        onError={(e) => {
          (e.target as HTMLImageElement).src = "https://placehold.co/1920x1080/111111/00f0ff?text=SYS.DATA"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90" />
      
      {/* Mechanical scanline overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8cGF0aCBkPSJNMCAwTDRgMCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')] mix-blend-overlay pointer-events-none" />

      {/* Vertical Title (when collapsed on Desktop) */}
      <motion.div
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none"
      >
        <h3 className="text-xl font-bold text-muted-foreground tracking-[0.3em] uppercase -rotate-90 whitespace-nowrap font-mono">
          {t(`projects.items.${project.key}.title`)}
        </h3>
      </motion.div>

      {/* Horizontal Title (when collapsed on Mobile) */}
      <motion.div
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center md:hidden pointer-events-none"
      >
        <h3 className="text-lg font-bold text-muted-foreground tracking-[0.3em] uppercase text-center px-4 font-mono">
          {t(`projects.items.${project.key}.title`)}
        </h3>
      </motion.div>

      {/* Expanded Content */}
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4, delay: isHovered ? 0.2 : 0 }}
        className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end pointer-events-none"
      >
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <Badge variant="outline" className="mb-4 bg-background/50 border-primary text-primary uppercase tracking-widest text-xs font-bold font-mono px-3 py-1 rounded-none">
            {t(`projects.items.${project.key}.type`)}
          </Badge>

          <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-foreground mb-4 leading-none uppercase tracking-tighter drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]">
            {t(`projects.items.${project.key}.title`)}
          </h3>

          <div className="flex flex-wrap gap-2 mb-6 hidden md:flex">
            {project.technologies.slice(0, 3).map((tech: string) => (
              <Badge key={tech} variant="secondary" className="px-3 py-1 text-xs bg-foreground/10 border border-border text-foreground rounded-none font-mono backdrop-blur-md">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 3 && (
              <Badge variant="secondary" className="px-3 py-1 text-xs bg-foreground/10 border border-border text-foreground rounded-none font-mono backdrop-blur-md">
                +{project.technologies.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
