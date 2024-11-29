import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import PageViews from "./routes/PageViews";
import { useEffect } from "react";
import clientAxios from "./helpers/clientAxios";

const App = () => {
  useEffect(() => {
    const logoutBeforeUnload = (e) => {
      if (sessionStorage.getItem("token") !== null) {
        const token = sessionStorage.getItem("token");
        try {
          const res = clientAxios.put(
            "/user/logout",
            {},
            {
              headers: {
                authtoken: token,
              },
            }
          );

          sessionStorage.removeItem("role");
          sessionStorage.removeItem("token");
        } catch (error) {
          console.log(error);
        }
      }
    };
    window.addEventListener("beforeunload", logoutBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", logoutBeforeUnload);
    };
  }, []);

  return (
    <Router>
      <PageViews />
    </Router>
  );
};

export default App;
