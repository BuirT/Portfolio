import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react"
import { Github, Instagram } from "@/components/icons"
import { useTranslation } from "react-i18next"

export function Contact() {
  const { t } = useTranslation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error", message: string } | null>(null)

  const formSchema = z.object({
    name: z.string().min(2, t("contact.form.name_placeholder")),
    email: z.string().email(t("contact.form.email_placeholder")),
    phone: z.string().optional(),
    projectType: z.string().optional(),
    message: z.string().min(10, t("contact.form.message_placeholder")),
    budget: z.string().optional(),
  })

  type FormData = z.infer<typeof formSchema>

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitStatus(null)
    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error("Failed to send")
      setSubmitStatus({ type: "success", message: t("contact.messages.success") })
      reset()
    } catch (error) {
      setSubmitStatus({ type: "error", message: t("contact.messages.error") })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="w-full px-6 lg:px-12 xl:px-20 max-w-[1920px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">{t("contact.title")}</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.address
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1 space-y-6 not-italic"
          >
            <Card className="border-border bg-card">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email</h3>
                  <a href="mailto:bui241204@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                    bui241204@gmail.com
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{t("contact.form.phone")}</h3>
                  <a href="tel:+84387425494" className="text-muted-foreground hover:text-primary transition-colors">
                    0387 425 494
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Location</h3>
                  <p className="text-muted-foreground">Ho Chi Minh City, Vietnam</p>
                </div>
              </CardContent>
            </Card>

            <div className="pt-6 border-t border-border">
              <h3 className="font-bold mb-4 text-center">{t("contact.info.connect")}</h3>
              <ul className="flex justify-center gap-4 m-0 p-0 list-none">
                <li>
                  <a href="mailto:bui241204@gmail.com" className={buttonVariants({ variant: "outline", size: "icon" })}>
                    <Mail className="h-5 w-5" />
                    <span className="sr-only">Email</span>
                  </a>
                </li>
                <li>
                  <a href="https://github.com/BuirT" target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", size: "icon" })}>
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com/_buirt_" target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", size: "icon" })}>
                    <Instagram className="h-5 w-5" />
                    <span className="sr-only">Instagram</span>
                  </a>
                </li>
              </ul>
            </div>
          </motion.address>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="border-border bg-card">
              <CardContent className="p-8">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold font-heading mb-2">{t("contact.info.title")}</h3>
                  <p className="text-muted-foreground">{t("contact.info.description")}</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t("contact.form.name")}</Label>
                      <Input
                        id="name"
                        placeholder={t("contact.form.name_placeholder")}
                        className={errors.name ? "border-destructive" : ""}
                        {...register("name")}
                      />
                      {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">{t("contact.form.email")}</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={t("contact.form.email_placeholder")}
                        className={errors.email ? "border-destructive" : ""}
                        {...register("email")}
                      />
                      {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t("contact.form.phone")}</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder={t("contact.form.phone_placeholder")}
                        {...register("phone")}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="projectType">{t("contact.form.project")}</Label>
                      <Input
                        id="projectType"
                        placeholder={t("contact.form.project_placeholder")}
                        {...register("projectType")}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget">{t("contact.form.budget")}</Label>
                    <Input
                      id="budget"
                      placeholder={t("contact.form.budget_placeholder")}
                      {...register("budget")}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{t("contact.form.message")}</Label>
                    <Textarea
                      id="message"
                      placeholder={t("contact.form.message_placeholder")}
                      className={`min-h-[150px] resize-y ${errors.message ? "border-destructive" : ""}`}
                      {...register("message")}
                    />
                    {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
                  </div>

                  {submitStatus && (
                    <div className={`p-4 rounded-md ${submitStatus.type === "success" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-destructive/10 text-destructive"}`}>
                      {submitStatus.message}
                    </div>
                  )}

                  <Button type="submit" size="lg" className="w-full sm:w-auto gap-2" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {t("contact.form.submitting")}
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        {t("contact.form.submit")}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
