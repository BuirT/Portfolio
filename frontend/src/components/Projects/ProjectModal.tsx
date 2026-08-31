import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react"
import { Github } from "@/components/icons"
import type { ProjectConfig } from "./ProjectsConfig"

interface ProjectModalProps {
  project: ProjectConfig | null
  currentImageIndex: number
  isFullscreenImage: boolean
  onClose: () => void
  onNextImage: () => void
  onPrevImage: () => void
  onToggleFullscreen: (val: boolean) => void
  t: any
}

export function ProjectModal({
  project,
  currentImageIndex,
  isFullscreenImage,
  onClose,
  onNextImage,
  onPrevImage,
  onToggleFullscreen,
  t
}: ProjectModalProps) {
  if (!project) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-background/90 backdrop-blur-md"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl bg-card border-[2px] border-primary rounded-none shadow-xl shadow-[color-mix(in_oklch,var(--primary)_20%,transparent)] dark:shadow-[0_0_40px_rgba(0,240,255,0.15)] overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Top Accent Line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-primary z-20" />

          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-background/80 border border-primary text-primary hover:bg-primary hover:text-foreground transition-colors rounded-none"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex-1 overflow-y-auto">
            {/* Image Gallery */}
            <div className="relative w-full h-[30vh] sm:h-[40vh] md:h-[50vh] bg-muted dark:bg-black flex items-center justify-center overflow-hidden group border-b border-border">
              <AnimatePresence initial={false}>
                {project.images.length > 0 ? (
                  <motion.img 
                    key={currentImageIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.4, ease: "circOut" }}
                    src={project.images[currentImageIndex]} 
                    alt={`${t(`projects.items.${project.key}.title`)} screenshot`}
                    onClick={() => onToggleFullscreen(true)}
                    className="absolute inset-0 w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/1200x800/1e293b/38bdf8?text=Giao+Di%E1%BB%87n+D%E1%BB%B1+%C3%81n"
                    }}
                  />
                ) : (
                  <div className="text-muted-foreground font-mono">NO DATA</div>
                )}
              </AnimatePresence>

              {project.images.length > 1 && (
                <>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onPrevImage() }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-background/80 border border-primary text-primary opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-foreground rounded-none"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onNextImage() }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-background/80 border border-primary text-primary opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-foreground rounded-none"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                  
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-background/50 px-4 py-2 border border-border">
                    {project.images.map((_, i) => (
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
            <div className="p-6 sm:p-8 bg-[linear-gradient(to_right,color-mix(in_oklch,var(--primary)_5%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklch,var(--primary)_5%,transparent)_1px,transparent_1px)] bg-[size:20px_20px]">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge variant="default" className="bg-primary/10 text-primary border border-primary rounded-none font-mono">
                  {t(`projects.items.${project.key}.type`)}
                </Badge>
                <Badge variant="outline" className="text-emerald-500 border-emerald-500/50 rounded-none font-mono">
                  ✓ {t(`projects.items.${project.key}.status`)}
                </Badge>
              </div>
              
              <h3 className="text-2xl md:text-5xl font-black mb-4 uppercase tracking-tighter">
                {t(`projects.items.${project.key}.title`)}
              </h3>
              
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 font-mono border-l-2 border-border pl-4">
                {t(`projects.items.${project.key}.description`)}
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="font-bold text-sm mb-4 uppercase tracking-[0.2em] text-primary border-b border-border pb-2">
                    {t(`projects.items.${project.key}.key_features`)}
                  </h4>
                  <ul className="space-y-3 text-muted-foreground font-mono text-sm">
                    {(t(`projects.items.${project.key}.features`, { returnObjects: true }) as string[]).map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-primary mt-1">]</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-sm mb-4 uppercase tracking-[0.2em] text-primary border-b border-border pb-2">
                    {t(`projects.items.${project.key}.impact_metrics`)}
                  </h4>
                  <ul className="space-y-4">
                    {(t(`projects.items.${project.key}.metrics`, { returnObjects: true }) as string[]).map((metric, i) => (
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
                  {project.technologies.map(tech => (
                      <Badge key={tech} variant="secondary" className="px-3 py-1 rounded-none border border-border font-mono text-xs bg-background">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-6 border-t border-border">
                {project.links.github && (
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", className: "gap-2 rounded-none font-mono tracking-wider border-border hover:border-primary hover:text-primary" })}>
                    <Github className="h-5 w-5" /> WEB_REPO
                  </a>
                )}
                {project.links.githubWinform && (
                  <a href={project.links.githubWinform} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", className: "gap-2 rounded-none font-mono tracking-wider border-border hover:border-primary hover:text-primary" })}>
                    <Github className="h-5 w-5" /> DESKTOP_REPO
                  </a>
                )}
                <a href="#contact" onClick={onClose} className={buttonVariants({ className: "gap-2 rounded-none font-mono tracking-wider font-bold shadow-md shadow-[color-mix(in_oklch,var(--primary)_30%,transparent)] hover:shadow-lg hover:shadow-[color-mix(in_oklch,var(--primary)_50%,transparent)] dark:shadow-[0_0_15px_rgba(0,240,255,0.3)] dark:hover:shadow-[0_0_25px_rgba(0,240,255,0.5)]" })}>
                  <ExternalLink className="h-5 w-5" /> INIT_DEMO
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Fullscreen Image Overlay */}
      <AnimatePresence>
        {isFullscreenImage && project.images.length > 0 && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 dark:bg-black/95 p-4 md:p-8 backdrop-blur-sm">
            <button 
              onClick={(e) => { e.stopPropagation(); onToggleFullscreen(false) }}
              className="absolute top-4 right-4 md:top-8 md:right-8 z-50 p-3 bg-foreground/10 backdrop-blur-md rounded-none border border-border text-foreground hover:bg-primary hover:border-primary transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            
            {project.images.length > 1 && (
              <>
                <button 
                  onClick={(e) => { e.stopPropagation(); onPrevImage() }}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 p-4 bg-foreground/5 backdrop-blur-md rounded-none border border-border text-muted-foreground hover:text-foreground hover:bg-primary hover:border-primary transition-colors"
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); onNextImage() }}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 p-4 bg-foreground/5 backdrop-blur-md rounded-none border border-border text-muted-foreground hover:text-foreground hover:bg-primary hover:border-primary transition-colors"
                >
                  <ChevronRight className="h-8 w-8" />
                </button>
              </>
            )}

            <div 
              className="relative w-full h-full flex items-center justify-center overflow-hidden"
              onClick={() => onToggleFullscreen(false)}
            >
              <AnimatePresence initial={false}>
                <motion.img 
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  src={project.images[currentImageIndex]} 
                  alt={`${t(`projects.items.${project.key}.title`)} full screenshot`}
                  className="absolute max-w-full max-h-full object-contain cursor-zoom-out"
                  onClick={(e) => { e.stopPropagation(); onNextImage() }}
                />
              </AnimatePresence>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
