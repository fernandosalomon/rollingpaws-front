import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import NavbarC from "../components/NavbarC";

const PageViews = () => {
  return (
    <>
      <NavbarC />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
};

export default PageViews;
