import { Route, Routes } from "react-router-dom"
import { About } from "../pages/about"
import Carometro from "../pages/carometro"
import Home from "../pages/home"

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/carometro" element={<Carometro />} />
      <Route path="/about" element={<About />} />
      {/* <Route path="/feedback" element={<Feedback />} /> */}
    </Routes>
  )
}

export default MainRoutes
