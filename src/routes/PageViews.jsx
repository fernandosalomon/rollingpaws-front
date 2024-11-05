import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import NavbarC from "../components/NavbarC";
import Appointments from "../pages/Appointments";

const PageViews = () => {
  return (
    <>
      <NavbarC />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/appointment" element={<Appointments />} />
      </Routes>
    </>
  );
};

export default PageViews;
