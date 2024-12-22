import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import NavbarC from "../components/NavbarC";
import AboutUsPage from "../components/AboutUsPage";
import LandingPage from "../components/LandingPage";
import Testimonials from "../components/Testimonials";
import ServicesPage from "../components/ServicesPage";
import ContactUsPage from "../components/ContactUsPage";
import style from "../styles/PageView.module.css"
import DoctorsPage from "../components/DoctorsPage";
import AboutPlans from "../components/AboutPlans";

const PageWrapper = ({ children }) => {
  return <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className={style.pageWrapper}>{children}</motion.div>
}

const AnimatedRoutes = () => {

  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/acerca-planes" element={<PageWrapper><AboutPlans /></PageWrapper>} />
        <Route path="/contacto" element={<PageWrapper><ContactUsPage /></PageWrapper>} />
        <Route path="/servicios" element={<PageWrapper><ServicesPage /></PageWrapper>} />
        <Route path="/nosotros/veterinarios" element={<PageWrapper><DoctorsPage /></PageWrapper>} />
        <Route path="/nosotros/comentarios" element={<PageWrapper><Testimonials /></PageWrapper>} />
        <Route path="/nosotros" element={<PageWrapper><AboutUsPage /></PageWrapper>} />
        <Route path="/" element={<PageWrapper><LandingPage /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  )
}
import Error404 from "../pages/Error404";
import Pets from "../components/Pets";
import UserProfilePage from "../pages/UserProfilePage";

const PageViews = () => {
  return (
    <>
      <NavbarC />
      <Routes>
        <Route
          path="/user-profile/information"
          element={<UserProfilePage viewParam="user" />}
        />
        <Route
          path="/user-profile/security"
          element={<UserProfilePage viewParam="security" />}
        />
        <Route
          path="/user-profile/pets"
          element={<UserProfilePage viewParam="pets" />}
        />
        <Route
          path="/user-profile/notifications"
          element={<UserProfilePage viewParam="notification" />}
        />
        <Route path="/pets" element={<Pets />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <AnimatedRoutes />
    </>
  );
};

export default PageViews;
