import { useState } from "react";
import AdminUser from "../components/AdminUser";
import style from "../styles/AdminPage.module.css"
import AdminAppointments from "../components/AdminAppointments";
import AdminMessages from "../components/AdminMessages";


const AdminPage = () => {
  const [view, setView] = useState(0);

  return (
    <>
      <div className={style.container}>
        <div className={style.sideA}>
          <div className={style.sideMenu}>
            <h4 className={style.sideMenuHeader}>Opciones</h4>
            <ul className={style.sideMenuItems}>
              <li className={`${style.sideMenuItem} ${view === 0 ? style.selected : ""}`} onClick={() => setView(0)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                </svg>
                <p className="mb-0">Usuarios</p>
              </li>
              <li className={`${style.sideMenuItem} ${view === 1 ? style.selected : ""}`} onClick={() => setView(1)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar-event" viewBox="0 0 16 16">
                  <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z" />
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                </svg>
                <p className="mb-0">Citas</p>
              </li>
              <li className={`${style.sideMenuItem} ${view === 2 ? style.selected : ""}`} onClick={() => setView(2)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-fill" viewBox="0 0 16 16">
                  <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9 9 0 0 0 8 15" />
                </svg>
                <p className="mb-0">Mensajes</p>
              </li>
            </ul>
          </div>
        </div >
        <div className={style.sideB}>
          {view === 0 && <AdminUser />}
          {view === 1 && <AdminAppointments />}
          {view === 2 && <AdminMessages />}
        </div>
      </div>
    </>
  )
};

export default AdminPage;
