import { ThemeProvider } from "./components/ThemeProvider"
import { GlobalParticles } from "./components/GlobalParticles"
import { Header } from "./components/Header/Header"
import { Hero } from "./components/Hero/Hero"
import { About } from "./components/About/About"
import { Projects } from "./components/Projects/Projects"
import { Services } from "./components/Services/Services"
import { Skills } from "./components/Skills/Skills"
import { Contact } from "./components/Contact/Contact"
import { Footer } from "./components/Footer/Footer"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      <div className="noise-bg" />
      <GlobalParticles />
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
    </ThemeProvider>
  )
}

export default App
