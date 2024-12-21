import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import HomePage from "../pages/HomePage";
import NavbarC from "../components/NavbarC";
import AboutUsPage from "../components/AboutUsPage";
import LandingPage from "../components/LandingPage";
import Testimonials from "../components/Testimonials";

const PageWrapper = ({children}) => {
  return <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -20}} transition={{duration: 0.3}} style={{height: "calc(100vh - 120px)", display:"flex", flexDirection: "column", justifyContent: "center"}}>{children}</motion.div>
}

const AnimatedRoutes = () => {

  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/comentarios" element={<PageWrapper><Testimonials /></PageWrapper>} />
        <Route path="/nosotros" element={<PageWrapper><AboutUsPage /></PageWrapper>} />
        <Route path="/" element={<PageWrapper><LandingPage /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  )
}

const PageViews = () => {
  return (
    <>
      <NavbarC />
      <AnimatedRoutes />
    </>
  );
};

export default PageViews;
