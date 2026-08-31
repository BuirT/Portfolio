import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Code2, Database, Layout, Server, Sparkles } from "lucide-react"
import { useTranslation } from "react-i18next"

export function About() {
  const { t } = useTranslation()

  const expertise = [
    { icon: <Layout className="h-5 w-5" />, text: t("services.items.fullstack.description") },
    { icon: <Code2 className="h-5 w-5" />, text: t("services.items.web.description") },
    { icon: <Server className="h-5 w-5" />, text: t("services.items.desktop.description") },
    { icon: <Sparkles className="h-5 w-5" />, text: t("services.items.ai.description") },
    { icon: <Database className="h-5 w-5" />, text: t("services.items.db.description") },
    { icon: <CheckCircle2 className="h-5 w-5" />, text: t("services.items.automation.description") },
  ]

  const stats = [
    { value: "1+", label: t("about.stats.experience") },
    { value: "6+", label: t("about.stats.projects") },
  ]

  return (
    <section id="about" className="py-20 bg-background relative border-t border-border">
      {/* Mechanical Background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,240,255,0.02)_25%,rgba(0,240,255,0.02)_50%,transparent_50%,transparent_75%,rgba(0,240,255,0.02)_75%,rgba(0,240,255,0.02)_100%)] bg-[length:20px_20px] pointer-events-none" />

      <div className="w-full px-6 lg:px-12 xl:px-20 max-w-[1920px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 border-b border-border pb-8"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter text-foreground drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]">{t("about.title")}</h2>
          <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          {/* Text Content */}
          <motion.article
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "circOut" }}
            className="border-l-[4px] border-primary pl-6 py-2 bg-card/30"
          >
            <h3 className="text-2xl font-bold mb-4 font-mono uppercase tracking-widest text-foreground/90">
              <span className="text-primary mr-2">/01/</span>{t("about.journey")}
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed font-mono text-sm sm:text-base border-b border-border pb-6">
              {t("about.journey_text")}
            </p>

            <h3 className="text-2xl font-bold mb-4 mt-8 font-mono uppercase tracking-widest text-foreground/90">
              <span className="text-primary mr-2">/02/</span>{t("about.approach")}
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed font-mono text-sm sm:text-base">
              {t("about.approach_text")}
            </p>
          </motion.article>

          {/* Stats and Badges */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "circOut" }}
            className="space-y-6"
          >
            <dl className="grid grid-cols-2 gap-4 m-0 p-0">
              {stats.map((stat, index) => (
                <Card key={index} className="border border-border rounded-none shadow-none bg-card/50 backdrop-blur hover:border-primary/50 transition-colors">
                  <CardContent className="p-6 text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <dt className="text-5xl font-black text-primary mb-2 drop-shadow-[0_0_10px_rgba(0,240,255,0.5)] relative z-10">{stat.value}</dt>
                    <dd className="text-xs font-bold text-muted-foreground m-0 uppercase tracking-[0.2em] relative z-10 font-mono">{stat.label}</dd>
                  </CardContent>
                </Card>
              ))}
            </dl>

            <Card className="border border-border rounded-none shadow-none bg-card/50 backdrop-blur relative overflow-hidden">
              {/* Deco corner */}
              <div className="absolute top-0 right-0 w-12 h-12 bg-primary/20 -rotate-45 translate-x-6 -translate-y-6 border-b border-primary" />

              <CardContent className="p-6 sm:p-8">
                <h3 className="text-lg font-bold mb-6 font-mono uppercase tracking-widest text-primary border-b border-border pb-2">
                  {t("services.badge")}
                </h3>
                <ul className="space-y-4">
                  {expertise.slice(0, 4).map((item, index) => (
                    <li key={index} className="flex items-start gap-4 text-sm text-muted-foreground font-mono transition-colors hover:text-foreground group">
                      <span className="text-primary mt-0.5 group-hover:scale-110 transition-transform bg-primary/10 p-1 border border-primary/30">
                        {item.icon}
                      </span>
                      <span className="mt-1 leading-tight">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
