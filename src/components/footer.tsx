import { Github, Globe } from "lucide-react"

const Footer = () => {
  return (
    <footer className="mt-6 flex w-full items-center justify-center gap-2 py-2">
      <p>2024 | Marina Ebbecke |</p>
      <a
        href="https://marinaebbecke.dev.br"
        target="_blank"
        className="hover:text-[#B0B0B0]"
      >
        <Globe className="size-5" />
      </a>
      <a
        href="https://github.com/mebbecke/carometro-escolar"
        target="_blank"
        className="hover:text-[#B0B0B0]"
      >
        <Github className="size-5" />
      </a>
    </footer>
  )
}

export default Footer
