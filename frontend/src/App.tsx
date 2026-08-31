import { useState } from "react"
import { ThemeProvider } from "./components/ThemeProvider"
import { Header } from "./components/Header/Header"
import { Hero } from "./components/Hero/Hero"
import { About } from "./components/About/About"
import { Projects } from "./components/Projects/Projects"
import { Services } from "./components/Services/Services"
import { Skills } from "./components/Skills/Skills"
import { Contact } from "./components/Contact/Contact"
import { Footer } from "./components/Footer/Footer"
import { JdmIntro } from "./components/Intro/JdmIntro"

function App() {
  // Use state without sessionStorage so intro runs on every refresh
  const [introFinished, setIntroFinished] = useState(false)

  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      {!introFinished && <JdmIntro onFinish={() => setIntroFinished(true)} />}
      
      <div 
        className={`transition-opacity duration-1000 overflow-x-hidden flex flex-col min-h-screen ${
          introFinished ? "opacity-100" : "opacity-0 h-screen overflow-hidden"
        }`}
      >
        <div className="noise-bg fixed inset-0 pointer-events-none" />
        <div className="min-h-screen bg-transparent relative z-10 text-foreground selection:bg-primary/30">
          <Header />
          <main>
            <Hero />
            <About />
            <Projects />
            <Services />
            <Skills />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
