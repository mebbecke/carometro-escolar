import { useState } from "react"
import { MenuIcon, X } from "lucide-react"
import * as Dialog from "@radix-ui/react-dialog"
import { Button } from "./button"

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <header className="mb-4 flex w-full flex-row items-center justify-between bg-[#4F8CC9] px-10 py-5">
      <a href="/">
        <h1 className="cursor:pointer text-2xl font-bold text-white">
          Carômetro
        </h1>
      </a>

      {/* Mobile Sidebar */}
      <Dialog.Root open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <Dialog.Trigger className="lg:hidden">
          <Button variant="primary" size="full">
            <MenuIcon />
          </Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-40 bg-black opacity-30" />
          <Dialog.Content className="fixed bottom-0 right-0 top-0 z-50 flex w-80 flex-col bg-[#f5f5f5]">
            <div className="flex flex-row items-center justify-between p-6">
              <Dialog.Title className="text-2xl font-bold">Menu</Dialog.Title>
              <Dialog.Close className="flex w-full justify-end">
                <X />
              </Dialog.Close>
            </div>
            <nav className="border-y border-y-gray-400 p-6">
              <Dialog.Close>
                <ul className="space-y-4 text-start">
                  <li>
                    <a href="/">início</a>
                  </li>
                  <li>
                    <a href="/carometro">gerar carômetro</a>
                  </li>
                  <li>
                    <a href="#">sobre</a>
                  </li>
                  <li>
                    <a href="#">feedback</a>
                  </li>
                </ul>
              </Dialog.Close>
            </nav>
            <div className="flex justify-center p-6">
              <div className="flex items-center gap-2">
                <Button>Faça uma doação</Button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Desktop Navbar */}
      <nav className="hidden lg:flex">
        <ul className="flex flex-row gap-3 text-white">
          <li>
            <a href="/" className="hover:text-[#E4F0FB]">
              início
            </a>
          </li>
          .
          <li>
            <a href="/carometro" className="hover:text-[#E4F0FB]">
              gerar carômetro
            </a>
          </li>
          .
          <li>
            <a href="#" className="hover:text-[#E4F0FB]">
              sobre
            </a>
          </li>
          .
          <li>
            <a href="#" className="hover:text-[#E4F0FB]">
              feedback
            </a>
          </li>
        </ul>
      </nav>

      <div className="hidden items-center gap-2 lg:flex">
        <Button variant="secondary">Faça uma doação</Button>
      </div>
    </header>
  )
}

export default Header
