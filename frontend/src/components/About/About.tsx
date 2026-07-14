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
    <section id="about" className="py-20 bg-muted/50">
      <div className="w-full px-6 lg:px-12 xl:px-20 max-w-[1920px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">{t("about.title")}</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          {/* Text Content */}
          <motion.article
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-4">{t("about.journey")}</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {t("about.journey_text")}
            </p>

            <h3 className="text-2xl font-bold mb-4 mt-8">{t("about.approach")}</h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {t("about.approach_text")}
            </p>
          </motion.article>

          {/* Stats and Badges */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            <dl className="grid grid-cols-2 gap-4 m-0 p-0">
              {stats.map((stat, index) => (
                <Card key={index} className="border-none shadow-sm bg-background/50 backdrop-blur">
                  <CardContent className="p-6 text-center">
                    <dt className="text-4xl font-bold text-primary mb-2">{stat.value}</dt>
                    <dd className="text-sm font-medium text-muted-foreground m-0">{stat.label}</dd>
                  </CardContent>
                </Card>
              ))}
            </dl>

            <Card className="border-none shadow-sm bg-background/50 backdrop-blur">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">{t("services.badge")}</h3>
                <ul className="space-y-4">
                  {expertise.slice(0, 4).map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="text-primary mt-0.5">{item.icon}</span>
                      <span>{item.text}</span>
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
