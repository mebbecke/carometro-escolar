import Footer from "./footer"
import Header from "./header"

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <Header />
      <main className="flex h-full max-w-[90%] flex-1 flex-col lg:max-w-[70%]">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
