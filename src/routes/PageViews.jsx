import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import NavbarC from "../components/NavbarC";
import Error404 from "../pages/Error404";
import Pets from "../components/Pets";
import UserProfilePage from "../pages/UserProfilePage";

const PageViews = () => {
  return (
    <>
      <NavbarC />
      <Routes>
        <Route path="/user-profile" element={<UserProfilePage />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
};

export default PageViews;
