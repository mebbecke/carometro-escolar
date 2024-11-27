import Footer from "./footer"
import Header from "./header"

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen w-full flex-col">
      <Header />
      <main className="flex h-full flex-1 flex-col items-center justify-center">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
