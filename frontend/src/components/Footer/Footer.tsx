import { ArrowUp, Heart } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"

export function Footer() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="border-t border-border bg-muted/20 py-8">
      <div className="w-full px-6 lg:px-12 xl:px-20 max-w-[1920px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <small className="block text-sm font-medium text-foreground">
              © {currentYear} BuirT. {t("footer.rights")}
            </small>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              {t("footer.built_with")} <Heart className="h-3 w-3 text-red-500" />
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <nav aria-label="Footer Navigation">
              <ul className="flex gap-4 m-0 p-0 list-none text-sm text-muted-foreground">
                <li><a href="https://github.com/BuirT" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub</a></li>
                <li><a href="https://instagram.com/_buirt_" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Instagram</a></li>
                <li><a href="mailto:bui241204@gmail.com" className="hover:text-primary transition-colors">Email</a></li>
              </ul>
            </nav>
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={scrollToTop}
              className="rounded-full"
              aria-label="Back to top"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
