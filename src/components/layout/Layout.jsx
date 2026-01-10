import { Outlet } from "react-router-dom"
import Menu from "./Menu"
import Footer from "./Footer"


const Layout = () => {
  return (
    <>
      <Menu />
      <main className="min-h-screen relative ">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
