import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import NavbarC from "../components/NavbarC";
import Footer from "../components/Footer";
import AboutUsPage from "../components/AboutUsPage";
import LandingPage from "../components/LandingPage";
import Testimonials from "../components/Testimonials";
import ServicesPage from "../components/ServicesPage";
import ContactUsPage from "../components/ContactUsPage";
import DoctorsPage from "../components/DoctorsPage";
import AboutPlans from "../components/AboutPlans";
import Error404 from "../pages/Error404";
import UserProfilePage from "../pages/UserProfilePage";
import AdminAppointments from "../components/AdminAppointments";
import style from "../styles/PageView.module.css";
import AdminPage from "../pages/AdminPage";
import AdminUser from "../components/AdminUser";
import ForgotPassword from "../pages/ForgotPassword";
import PrivateRoute from "../components/PrivateRoute";
import AdminPrivateRoute from "../components/AdminPrivateRoute";


const PageWrapper = ({ children, className }) => {
  return <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className={`${style.pageWrapper} ${className}`}>{children}</motion.div>
}

const AnimatedRoutes = () => {

  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>

        <Route path="/admin/appointment" element={<AdminPrivateRoute><AdminAppointments /></AdminPrivateRoute>} />
        <Route path="/admin/users" element={<AdminPrivateRoute><AdminUser /></AdminPrivateRoute>} />
        <Route path="/admin" element={<AdminPrivateRoute><AdminPage /></AdminPrivateRoute>} />
        <Route
          path="/user-profile/information"
          element={<PrivateRoute><UserProfilePage viewParam="user" /></PrivateRoute>}
        />
        <Route
          path="/user-profile/security"
          element={<PrivateRoute><UserProfilePage viewParam="security" /></PrivateRoute>}
        />
        <Route
          path="/user-profile/pets"
          element={<PrivateRoute><UserProfilePage viewParam="pets" /></PrivateRoute>}
        />
        <Route
          path="/user-profile/appointments"
          element={<PrivateRoute><UserProfilePage viewParam="appointments" /></PrivateRoute>}
        />
        <Route
          path="/user-profile/notifications"
          element={<PrivateRoute><UserProfilePage viewParam="notification" /></PrivateRoute>}
        />
        <Route path="/forgot-password/:auth" element={<ForgotPassword />} />
        <Route path="/acerca-planes" element={<PageWrapper><AboutPlans /></PageWrapper>} />
        <Route path="/contacto" element={<PageWrapper><ContactUsPage /></PageWrapper>} />
        <Route path="/servicios" element={<PageWrapper><ServicesPage /></PageWrapper>} />
        <Route path="/nosotros/veterinarios" element={<PageWrapper><DoctorsPage /></PageWrapper>} />
        <Route path="/nosotros/comentarios" element={<PageWrapper><Testimonials /></PageWrapper>} />
        <Route path="/nosotros" element={<PageWrapper><AboutUsPage /></PageWrapper>} />
        <Route path="/" element={<PageWrapper className={style.overflowHidden}><LandingPage /></PageWrapper>} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </AnimatePresence>
  )
}



const PageViews = () => {

  const location = useLocation();

  return (
    <>
      <NavbarC />
      <AnimatedRoutes />
      {location.pathname !== "/" && <Footer />}
    </>
  );
};

export default PageViews;
