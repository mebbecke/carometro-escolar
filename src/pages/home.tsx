import { useNavigate } from "react-router-dom"
import kidsInClassrom from "../assets/kids-image.jpg"
import { Button } from "../components/button"

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-10">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Olá Professor/a!</h1>
        <p>Seja bem vindo/a ao gerador de carômetro!</p>
      </div>

      <div>
        <img
          src={kidsInClassrom}
          alt="Crianças em sala de aula"
          className="rounded-lg object-cover"
        />
      </div>

      <div>
        <Button type="button" onClick={() => navigate("/carometro")}>
          Faça seu carômetro
        </Button>
      </div>
    </div>
  )
}

export default Home
