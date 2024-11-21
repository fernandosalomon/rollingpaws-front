import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Logo from "../assets/img/simple-logo-nobg.png";
import { Link, useNavigate } from "react-router-dom";
import ButtonC from "./shared/ButtonC";
import style from "../styles/Navbar.module.css";
import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";

const NavbarC = () => {
  const [userRole, setUserRole] = useState("not-logged");
  const navigate = useNavigate();

  const handleCloseSession = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const res = await clientAxios.post("/user/logout", {
        headers: {
          authtoken: token,
        },
      });
      setUserRole("not-logged");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar expand="md" className={style.Navbar}>
        <Container fluid>
          <Link to="/">
            <Image
              src={Logo}
              alt="Rolling Paws Logo"
              className={style.LogoImage}
            />
          </Link>
          <Navbar.Toggle
            aria-controls="navbar-collapse"
            className={style.NavbarToggler}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              fill="currentColor"
              class="bi bi-three-dots"
              viewBox="0 0 16 16"
            >
              <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
            </svg>
          </Navbar.Toggle>
          <Navbar.Collapse id="navbar-collapse" className="mt-3 mt-md-0">
            <div className="w-100 d-flex flex-column justify-content-center flex-md-row">
              {userRole === "admin" ? (
                <Nav className={style.NavLinks}>
                  <Link to="/admin/users">Usuarios</Link>
                  <Link to="/admin/appointments">Turnos</Link>
                </Nav>
              ) : (
                <Nav className={style.NavLinks}>
                  <Link to="/nosotros">Nosotros</Link>
                  <Link to="/servicios">Servicios</Link>
                  <Link to="/productos">Productos</Link>
                  <Link to="/Contacto">Contacto</Link>
                </Nav>
              )}
              {userRole === "not-logged" && (
                <ButtonC className="ms-md-auto ms-0 mt-3">
                  Iniciar Sesión
                </ButtonC>
              )}
              {userRole === "user" && (
                <>
                  <Link to="/store">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-bag"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                    </svg>
                  </Link>
                </>
              )}
              {userRole === "user" ||
                (userRole === "admin" && (
                  <>
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-person-circle"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                          <path
                            fill-rule="evenodd"
                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                          />
                        </svg>
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => {
                            navigate("/user/profile");
                          }}
                        >
                          Editar Perfil
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleCloseSession}>
                          Cerrar Sesión
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </>
                ))}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarC;
