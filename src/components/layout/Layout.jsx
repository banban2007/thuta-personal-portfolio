import { Outlet } from "react-router-dom"
import Menu from "./Menu"
import Footer from "./Footer"
import { motion } from "framer-motion"

const Layout = () => {
  return (
    <>
      <Menu />
      <motion.div
        className="fixed inset-0 bg-[#1E1E1E] z-100 pointer-events-none"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        style={{ originY: 1 }} // အောက်ကနေ အပေါ်ကို တက်သွားအောင်
      />
      <main className="min-h-screen relative ">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
