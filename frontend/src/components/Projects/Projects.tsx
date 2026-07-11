import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { ExternalLink, CheckCircle2 } from "lucide-react"
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
    }
  },
  {
    id: 2,
    key: "webvatlieuxaydung",
    technologies: ["PHP", "MySQL", "Vanilla CSS", "JavaScript"],
    links: {
      github: "https://github.com/BuirT/WebVatlieuxaydung",
    }
  },
  {
    id: 3,
    key: "glcinema",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    links: {
      github: "https://github.com/BuirT/GLCinema",
    }
  },
  {
    id: 4,
    key: "datnhethongcanhbaodien",
    technologies: ["HTML5", "CSS3", "JavaScript", "IoT"],
    links: {
      github: "https://github.com/TriDung3010/DATNhethongcanhbaodien",
    }
  }
]

export function Projects() {
  const { t } = useTranslation()

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

        <div className="max-w-5xl mx-auto space-y-12">
          {PROJECTS_CONFIG.map((project, index) => {
            const features = t(`projects.items.${project.key}.features`, { returnObjects: true }) as string[]
            const metrics = t(`projects.items.${project.key}.metrics`, { returnObjects: true }) as string[]

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-500 border-border bg-card">
                  <div className="flex flex-col lg:flex-row">
                    {/* Left Column - Details */}
                    <div className="p-8 lg:w-2/3 flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <Badge variant="default" className="bg-primary/20 text-primary hover:bg-primary/30 border-none">
                            {t(`projects.items.${project.key}.type`)}
                          </Badge>
                          <Badge variant="outline" className="text-emerald-500 border-emerald-500/30">
                            ✓ {t(`projects.items.${project.key}.status`)}
                          </Badge>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-bold mb-3 font-heading group-hover:text-primary transition-colors">
                          {t(`projects.items.${project.key}.title`)}
                        </h3>

                        <p className="text-muted-foreground leading-relaxed mb-6">
                          {t(`projects.items.${project.key}.description`)}
                        </p>

                        <div className="mb-6">
                          <h4 className="font-semibold text-sm mb-3 uppercase tracking-wider text-foreground/80">
                            {t(`projects.items.${project.key}.key_features`)}
                          </h4>
                          <ul className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                            {Array.isArray(features) && features.map((feature, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                <span className="leading-tight">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

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
                        <a href="#contact" className={buttonVariants({ size: "sm", className: "gap-2" })}>
                          <ExternalLink className="h-4 w-4" /> {t(`projects.items.${project.key}.links.demo`)}
                        </a>
                      </div>
                    </div>

                    {/* Right Column - Metrics/Visuals */}
                    <div className="bg-muted lg:w-1/3 p-8 flex flex-col justify-center relative overflow-hidden">
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-10 right-10 w-32 h-32 bg-primary rounded-full blur-3xl mix-blend-multiply"></div>
                        <div className="absolute bottom-10 left-10 w-32 h-32 bg-accent rounded-full blur-3xl mix-blend-multiply"></div>
                      </div>

                      <div className="relative z-10 space-y-6">
                        <h4 className="font-bold text-lg border-b pb-2">
                          {t(`projects.items.${project.key}.impact_metrics`)}
                        </h4>
                        {Array.isArray(metrics) && metrics.map((metric, i) => (
                          <div key={i} className="flex gap-4 items-center">
                            <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center shrink-0 shadow-sm border border-border">
                              <span className="text-primary font-bold">{i + 1}</span>
                            </div>
                            <p className="text-sm font-medium leading-tight">{metric}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
