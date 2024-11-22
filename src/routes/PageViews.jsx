import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import NavbarC from "../components/NavbarC";
import Pets from "../components/Pets";

const PageViews = () => {
  return (
    <>
      <NavbarC />
      <Routes>
        <Route path="/pets" element={<Pets />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
};

export default PageViews;
