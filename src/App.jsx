import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/layout/Layout';
import Index from './pages/Index';
import Identity from './pages/Identity';
import Stack from './pages/Stack';
import Work from './pages/Work';
import Preloader from './components/Preloader';
import Journey from './pages/Journey';

function App() {
  const location = useLocation();

  return (
    <>
      <Preloader />
      {/* exitBeforeEnter အစား mode="wait" ကိုသုံးပါ */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="/identity" element={<Identity />} />
            <Route path="/stack" element={<Stack />} />
            <Route path="/journey" element={<Journey />} />
            <Route path="/work" element={<Work />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;




// import { createBrowserRouter } from "react-router-dom"
// import Layout from "../components/layout/Layout"

// import Index from "../pages/Index"
// import Identity from "../pages/Identity"
// import Stack from "../pages/Stack"
// import Work from "../pages/Work"

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       {
//         index: true,
//         element: <Index />,
//       },
//       {
//         path: "identity",
//         element: <Identity />,
//       },
//       {
//         path: "stack",
//         element: <Stack />,
//       },
//       {
//         path: "work",
//         element: <Work />,
//       },
//     ],
//   },
// ])


