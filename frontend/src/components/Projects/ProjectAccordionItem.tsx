import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import type { ProjectConfig } from "./ProjectsConfig"

interface ProjectAccordionItemProps {
  project: ProjectConfig
  index: number
  isHovered: boolean
  onHover: () => void
  onClick: (project: ProjectConfig) => void
  t: any
}

export function ProjectAccordionItem({ project, isHovered, onHover, onClick, t }: ProjectAccordionItemProps) {
  const transitionProps = { duration: 0.5, ease: "circOut" as const }

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

          <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-foreground mb-4 leading-none uppercase tracking-tighter drop-shadow-sm dark:drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]">
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
