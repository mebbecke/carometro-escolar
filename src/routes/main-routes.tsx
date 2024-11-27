import { Route, Routes } from "react-router-dom"
import Home from "../pages/home"
import Carometro from "../pages/carometro"

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/carometro" element={<Carometro />} />
      {/* <Route path="/about" element={<About />} /> */}
      {/* <Route path="/feedback" element={<Feedback />} /> */}
    </Routes>
  )
}

export default MainRoutes
