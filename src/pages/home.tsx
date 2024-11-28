import { useNavigate } from "react-router-dom"
import { Button } from "../components/button"

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Olá Professor/a!</h1>
        <p>Seja bem vindo/a ao gerador de carômetro!</p>
      </div>

      <div>
        <Button type="button" onClick={() => navigate("/carometro")}>
          Gerador de carômetro
        </Button>
      </div>
    </div>
  )
}

export default Home
