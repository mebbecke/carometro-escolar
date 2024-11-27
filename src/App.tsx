import { BrowserRouter } from "react-router-dom"
import Layout from "./components/layout"
import MainRoutes from "./routes/main-routes"

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <MainRoutes />
      </Layout>
    </BrowserRouter>
  )
}

export default App
