import { useState, useRef, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

const LANGUAGES = [
  { code: "en", label: "EN", name: "English" },
  { code: "vi", label: "VI", name: "Tiếng Việt" },
  { code: "ko", label: "KO", name: "한국어" },
]

export function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLang = LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[0]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full w-9 h-9"
        title="Change Language"
      >
        <Globe className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Toggle language</span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-background border border-border ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-muted/50 transition-colors ${currentLang.code === lang.code ? "font-bold text-primary" : "text-foreground"
                  }`}
                role="menuitem"
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
