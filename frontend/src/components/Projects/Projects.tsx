import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from "react-i18next"
import { PROJECTS_CONFIG } from "./ProjectsConfig"
import type { ProjectConfig } from "./ProjectsConfig"
import { ProjectAccordionItem } from "./ProjectAccordionItem"
import { ProjectModal } from "./ProjectModal"

export function Projects() {
  const { t } = useTranslation()
  const [selectedProject, setSelectedProject] = useState<ProjectConfig | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFullscreenImage, setIsFullscreenImage] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number>(0)

  const openModal = (project: ProjectConfig) => {
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
    <section id="projects" className="py-20 bg-background relative">
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
          <ProjectModal 
            project={selectedProject}
            currentImageIndex={currentImageIndex}
            isFullscreenImage={isFullscreenImage}
            onClose={closeModal}
            onNextImage={nextImage}
            onPrevImage={prevImage}
            onToggleFullscreen={setIsFullscreenImage}
            t={t}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
