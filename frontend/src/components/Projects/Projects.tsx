import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { ExternalLink, CheckCircle2, X, ChevronLeft, ChevronRight, Eye } from "lucide-react"
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
    images: [`${import.meta.env.BASE_URL}images/projects/web-1.png`]
  },
  {
    id: 3,
    key: "glcinema",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    links: {
      github: "https://github.com/BuirT/GLCinema",
    },
    images: [`${import.meta.env.BASE_URL}images/projects/glcinema-1.png`]
  },
  {
    id: 4,
    key: "datnhethongcanhbaodien",
    technologies: ["HTML5", "CSS3", "JavaScript", "IoT"],
    links: {
      github: "https://github.com/TriDung3010/DATNhethongcanhbaodien",
    },
    images: [`${import.meta.env.BASE_URL}images/projects/datn-1.png`]
  }
]

export function Projects() {
  const { t } = useTranslation()
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS_CONFIG[0] | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFullscreenImage, setIsFullscreenImage] = useState(false)

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
    // Không tự động chuyển ảnh nếu chưa chọn dự án, dự án chỉ có 1 ảnh, hoặc đang mở chế độ xem toàn màn hình
    if (!selectedProject || selectedProject.images.length <= 1 || isFullscreenImage) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length);
    }, 2500);
    
    return () => clearInterval(interval);
  }, [selectedProject, isFullscreenImage]);

  return (
    <section id="projects" className="py-20">
      <div className="w-full px-6 lg:px-12 xl:px-20 max-w-[1920px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">{t("projects.title")}</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("projects.subtitle")}
          </p>
        </motion.div>

        <ul className="max-w-5xl mx-auto space-y-12 m-0 p-0 list-none">
          {PROJECTS_CONFIG.map((project, index) => {

            return (
              <motion.li
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-500 border-border bg-card">
                  <article className="flex flex-col lg:flex-row">
                    {/* Details */}
                    <div className="p-8 w-full flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <Badge variant="default" className="bg-primary/20 text-primary hover:bg-primary/30 border-none">
                            {t(`projects.items.${project.key}.type`)}
                          </Badge>
                          <Badge variant="outline" className="text-emerald-500 border-emerald-500/30">
                            ✓ {t(`projects.items.${project.key}.status`)}
                          </Badge>
                        </div>

                        <button 
                          onClick={() => openModal(project)}
                          className="text-2xl md:text-3xl font-bold mb-3 font-heading text-left hover:text-primary transition-colors flex items-center gap-2 group/title"
                        >
                          {t(`projects.items.${project.key}.title`)}
                          <Eye className="h-5 w-5 opacity-0 -translate-x-2 group-hover/title:opacity-100 group-hover/title:translate-x-0 transition-all text-primary" />
                        </button>

                        <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
                          {t(`projects.items.${project.key}.description`)}
                        </p>

                        <div className="mb-8">
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map(tech => (
                              <Badge key={tech} variant="secondary" className="px-2 py-0.5 text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
                        {project.links.github && (
                          <a href={project.links.github} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", size: "sm", className: "gap-2" })}>
                            <Github className="h-4 w-4" /> {t(`projects.items.${project.key}.links.web`)}
                          </a>
                        )}
                        {project.links.githubWinform && (
                          <a href={project.links.githubWinform} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", size: "sm", className: "gap-2" })}>
                            <Github className="h-4 w-4" /> {t(`projects.items.${project.key}.links.desktop`)}
                          </a>
                        )}
                        <a href="#contact" className={buttonVariants({ variant: "outline", size: "sm", className: "gap-2" })}>
                          <ExternalLink className="h-4 w-4" /> {t(`projects.items.${project.key}.links.demo`)}
                        </a>
                      </div>
                    </div>


                  </article>
                </Card>
              </motion.li>
            )
          })}
        </ul>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={closeModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 p-2 bg-background/50 backdrop-blur-md rounded-full text-foreground/70 hover:text-foreground hover:bg-background/80 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex-1 overflow-y-auto">
                {/* Image Gallery */}
                <div className="relative w-full h-[30vh] sm:h-[40vh] md:h-[50vh] bg-muted/50 flex items-center justify-center overflow-hidden group">
                  <AnimatePresence initial={false}>
                    {selectedProject.images.length > 0 ? (
                      <motion.img 
                        key={currentImageIndex}
                        initial={{ opacity: 0, x: 200, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -200, scale: 0.95 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        src={selectedProject.images[currentImageIndex]} 
                        alt={`${t(`projects.items.${selectedProject.key}.title`)} screenshot`}
                        onClick={() => setIsFullscreenImage(true)}
                        className="absolute inset-0 w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                        onError={(e) => {
                          // Fallback to a placeholder if image doesn't exist yet
                          (e.target as HTMLImageElement).src = "https://placehold.co/1200x800/1e293b/38bdf8?text=Giao+Di%E1%BB%87n+D%E1%BB%B1+%C3%81n"
                        }}
                      />
                    ) : (
                      <div className="text-muted-foreground">Chưa có hình ảnh</div>
                    )}
                  </AnimatePresence>

                  {selectedProject.images.length > 1 && (
                    <>
                      <button 
                        onClick={(e) => { e.stopPropagation(); prevImage() }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-background/50 backdrop-blur-md rounded-full text-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background/80"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); nextImage() }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-background/50 backdrop-blur-md rounded-full text-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background/80"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>
                      
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {selectedProject.images.map((_, i) => (
                          <div 
                            key={i} 
                            className={`w-2 h-2 rounded-full transition-colors ${i === currentImageIndex ? "bg-primary" : "bg-primary/30"}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Details Content */}
                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <Badge variant="default" className="bg-primary/20 text-primary border-none">
                      {t(`projects.items.${selectedProject.key}.type`)}
                    </Badge>
                    <Badge variant="outline" className="text-emerald-500 border-emerald-500/30">
                      ✓ {t(`projects.items.${selectedProject.key}.status`)}
                    </Badge>
                  </div>
                  
                  <h3 className="text-2xl md:text-4xl font-bold mb-4 font-heading">
                    {t(`projects.items.${selectedProject.key}.title`)}
                  </h3>
                  
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
                    {t(`projects.items.${selectedProject.key}.description`)}
                  </p>

                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h4 className="font-semibold text-sm mb-4 uppercase tracking-wider text-foreground/80 border-b pb-2">
                        {t(`projects.items.${selectedProject.key}.key_features`)}
                      </h4>
                      <ul className="space-y-3 text-muted-foreground">
                        {(t(`projects.items.${selectedProject.key}.features`, { returnObjects: true }) as string[]).map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm mb-4 uppercase tracking-wider text-foreground/80 border-b pb-2">
                        {t(`projects.items.${selectedProject.key}.impact_metrics`)}
                      </h4>
                      <ul className="space-y-4">
                        {(t(`projects.items.${selectedProject.key}.metrics`, { returnObjects: true }) as string[]).map((metric, i) => (
                          <li key={i} className="flex gap-4 items-center">
                            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center shrink-0 shadow-sm border border-border">
                              <span className="text-primary font-bold">{i + 1}</span>
                            </div>
                            <p className="text-sm font-medium leading-tight">{metric}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="font-semibold text-sm mb-4 uppercase tracking-wider text-foreground/80 border-b pb-2">Công Nghệ Sử Dụng</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map(tech => (
                        <Badge key={tech} variant="secondary" className="px-3 py-1">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-6 border-t border-border">
                    {selectedProject.links.github && (
                      <a href={selectedProject.links.github} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", className: "gap-2" })}>
                        <Github className="h-5 w-5" /> {t(`projects.items.${selectedProject.key}.links.web`)}
                      </a>
                    )}
                    {selectedProject.links.githubWinform && (
                      <a href={selectedProject.links.githubWinform} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", className: "gap-2" })}>
                        <Github className="h-5 w-5" /> {t(`projects.items.${selectedProject.key}.links.desktop`)}
                      </a>
                    )}
                    <a href="#contact" onClick={closeModal} className={buttonVariants({ className: "gap-2" })}>
                      <ExternalLink className="h-5 w-5" /> {t(`projects.items.${selectedProject.key}.links.demo`)}
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
              className="absolute top-4 right-4 md:top-8 md:right-8 z-50 p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 hover:scale-110 transition-all"
            >
              <X className="h-8 w-8" />
            </button>
            
            {selectedProject.images.length > 1 && (
              <>
                <button 
                  onClick={(e) => { e.stopPropagation(); prevImage() }}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 p-4 bg-white/5 backdrop-blur-md rounded-full text-white/50 hover:text-white hover:bg-white/20 hover:scale-110 transition-all"
                >
                  <ChevronLeft className="h-10 w-10 md:h-12 md:w-12" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); nextImage() }}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 p-4 bg-white/5 backdrop-blur-md rounded-full text-white/50 hover:text-white hover:bg-white/20 hover:scale-110 transition-all"
                >
                  <ChevronRight className="h-10 w-10 md:h-12 md:w-12" />
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
                  initial={{ opacity: 0, x: 200, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -200, scale: 0.95 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
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
