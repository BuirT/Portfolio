export interface ProjectConfig {
  id: number
  key: string
  technologies: string[]
  links: {
    github?: string
    githubWinform?: string
  }
  images: string[]
}

export const PROJECTS_CONFIG: ProjectConfig[] = [
  {
    id: 1,
    key: "newspay",
    technologies: ["React.js", "Node.js", "SQL Server", "C# .NET", "Ollama AI"],
    links: {
      github: "https://github.com/BuirT/DATN-nhuanbutweb",
      githubWinform: "https://github.com/BuirT/DATN-nhuanbutwinform",
    },
    images: Array.from({ length: 16 }, (_, i) => `${import.meta.env.BASE_URL}images/projects/newspay/${i + 1}.png`)
  },
  {
    id: 2,
    key: "webvatlieuxaydung",
    technologies: ["PHP", "MySQL", "Vanilla CSS", "JavaScript"],
    links: {
      github: "https://github.com/BuirT/WebVatlieuxaydung",
    },
    images: Array.from({ length: 17 }, (_, i) => `${import.meta.env.BASE_URL}images/projects/vatlieuxaydung/(${i + 1}).jpeg`)
  },
  {
    id: 3,
    key: "btflix",
    technologies: ["Next.js", "React.js", "Tailwind CSS", "Node.js"],
    links: {
      github: "https://github.com/BuirT/BTFlix",
    },
    images: Array.from({ length: 16 }, (_, i) => `${import.meta.env.BASE_URL}images/projects/BTFlix/(${i + 1}).jpeg`)
  },
  {
    id: 4,
    key: "datnhethongcanhbaodien",
    technologies: ["HTML5", "CSS3", "JavaScript", "IoT"],
    links: {
      github: "https://github.com/TriDung3010/DATNhethongcanhbaodien",
    },
    images: [
      `${import.meta.env.BASE_URL}images/projects/hethongcanhbaodien/iot.JPG`,
      `${import.meta.env.BASE_URL}images/projects/hethongcanhbaodien/dashboard (1).png`,
      `${import.meta.env.BASE_URL}images/projects/hethongcanhbaodien/dashboard (2).png`,
      `${import.meta.env.BASE_URL}images/projects/hethongcanhbaodien/dashboard (3).png`,
      `${import.meta.env.BASE_URL}images/projects/hethongcanhbaodien/login.png`
    ]
  }
]
