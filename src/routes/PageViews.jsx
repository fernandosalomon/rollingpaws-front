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
    </>
  );
};

export default PageViews;
