import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"
import { LanguageSwitcher } from "./LanguageSwitcher"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const { t } = useTranslation()

  const NAV_ITEMS = [
    { label: t("header.home"), href: "#home" },
    { label: t("header.about"), href: "#about" },
    { label: t("header.projects"), href: "#projects" },
    { label: t("header.services"), href: "#services" },
    { label: t("header.skills"), href: "#skills" },
    { label: t("header.contact"), href: "#contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      // Update active section based on scroll position
      const sections = NAV_ITEMS.map((item) => item.href.substring(1))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element && window.scrollY >= element.offsetTop - 100) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [t])

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      window.scrollTo({
        top: (element as HTMLElement).offsetTop - 80,
        behavior: "smooth",
      })
    }
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm border-border"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="w-full px-6 lg:px-12 xl:px-20 max-w-[1920px] mx-auto h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              scrollTo("#home")
            }}
            className="text-2xl font-bold font-heading bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          >
            BuirT
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault()
                scrollTo(item.href)
              }}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300",
                activeSection === item.href.substring(1)
                  ? "text-primary after:w-full"
                  : "text-muted-foreground after:w-0 hover:after:w-full"
              )}
            >
              {item.label}
            </a>
          ))}
          <div className="flex items-center gap-2 border-l pl-6 border-border">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <LanguageSwitcher />
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-background border-b border-border p-4 flex flex-col gap-4 shadow-lg animate-in slide-in-from-top-2">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault()
                scrollTo(item.href)
              }}
              className={cn(
                "px-4 py-3 rounded-md text-sm font-medium transition-colors",
                activeSection === item.href.substring(1)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
