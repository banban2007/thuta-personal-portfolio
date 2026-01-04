import { Outlet } from "react-router-dom"
import Menu from "./Menu"
import Footer from "./Footer"
import Transition from "../Transition"

const Layout = () => {
  return (
    <>
    {/* <Transition/> */}
      <Menu />
      <main className="min-h-screen relative ">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
