import { useState } from "react";
import style from "../styles/UserProfilePage.module.css";
import FormC from "../components/shared/FormC";
import Modal from "react-bootstrap/Modal";

const UserProfilePage = () => {
  const [view, setView] = useState("user");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className={`${style.UserProfilePageContainer} d-flex gap-2`}>
      <div className={style.sideAContainer}>
        <div className={style.optionPanel}>
          <div className={style.optionListContainer}>
            <h4 className={style.optionListHeader}>Opciones</h4>
            <ul className={style.optionList}>
              <li
                className={`${style.optionListItem} ${
                  view === "user" ? style.optionListActive : ""
                }`}
                onClick={() => setView("user")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-person-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path
                    fill-rule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                  />
                </svg>
                <p className="m-0">Cuenta</p>
              </li>
              <li
                className={`${style.optionListItem} ${
                  view === "security" ? style.optionListActive : ""
                }`}
                onClick={() => setView("security")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-lock-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2" />
                </svg>
                <p className="m-0">Seguridad</p>
              </li>
              <li
                className={`${style.optionListItem} ${
                  view === "pets" ? style.optionListActive : ""
                }`}
                onClick={() => setView("pets")}
              >
                <svg width="24" height="24" viewBox="0 0 419.14 403.6">
                  <path d="m281.78 0c-0.88 0.011256-1.79 0.054519-2.69 0.125-35.82 6.1835-55.52 44.064-58.37 77.469-4.17 30.316 9.19 69.266 42.47 76.066 4.83 0.92 9.84 0.5 14.56-0.78 40.08-13.44 58.01-60.908 52.22-100.22-1.69-25.396-20.83-53.009-48.19-52.66zm-151.87 1.625c-22.28 0.5468-39.63 23.138-43.16 44.375-7.441 42.074 11.698 94.35 55.53 107.66 4.11 0.89 8.35 0.98 12.5 0.34 29.63-4.94 42.18-38.15 40.94-64.969-0.89-35.372-19.27-76.273-56-86.218-3.36-0.8909-6.63-1.2661-9.81-1.188zm248.93 119.5c-38.53 2.31-64.95 40.76-68.72 76.66-5.09 25.89 8.71 60.53 38.26 62.6 41.19-0.51 69.3-44.53 70.46-82.41 2.61-25.05-12.15-55.46-40-56.85zm-337.28 8.54c-16.394-0.14-32.517 9.68-37.874 26.34-14.293 44.58 14.408 101.04 61.624 110.41 19.706 3.37 37.018-11.76 41.908-29.97 10.35-38.95-10.915-84.17-46.908-101.85-5.863-3.29-12.334-4.88-18.75-4.93zm172.75 79.93c-32.14 0.07-64.78 16.38-85.59 40.66-22.48 28.3-40.892 61.23-48.095 96.94-8.751 25.7 11.083 55.29 38.565 55.47 33.06 0.91 61.47-21.79 94.34-23.47 27.89-4.25 52.86 10.25 77.94 19.75 21.35 9.13 50.85 5.63 61.75-17.35 8.57-23.41-4.05-48.39-14.5-69.18-21.32-33.76-44.17-69.24-79.13-90.32-14.01-8.68-29.58-12.53-45.28-12.5z" />
                </svg>
                <p className="m-0">Mis mascotas</p>
              </li>
              <li
                className={`${style.optionListItem} ${
                  view === "notification" ? style.optionListActive : ""
                }`}
                onClick={() => setView("notification")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-bell-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
                </svg>
                <p className="m-0">Notificaciones</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={`${style.sideBContainer} flex-fill`}>
        {view === "user" && (
          <>
            <div className={style.viewHeader}>
              <h2 className={style.viewHeaderLabel}>Información del usuario</h2>
              <p className={style.viewSubHeaderLabel}>
                Completa todos tus datos para que nuestros profesionales puedan
                estar en contacto contigo. Puedes cambiar la información en
                cualquier momento.
              </p>
            </div>
            <div className={`${style.viewBody} ms-2 me-0 me-md-5 `}>
              <FormC variant="user-profile" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
