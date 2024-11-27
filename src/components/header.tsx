import { Button } from "./button"

const Header = () => {
  return (
    <header className="flex w-full flex-row items-center justify-between bg-[#4F8CC9] px-10 py-5">
      <h1 className="text-2xl font-bold text-white">Carômetro</h1>
      <nav>
        <ul className="flex flex-row gap-3 text-white">
          <li>
            <a href="/" className="hover:text-[#E4F0FB]">
              início
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

      <div className="flex items-center gap-2">
        {/* TODO: Botão de doações */}
        <Button variant="secondary">Faça uma doação</Button>
      </div>
    </header>
  )
}

export default Header
