import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Logo from "../assets/img/simple-logo-nobg.png";
import { Link, useNavigate } from "react-router-dom";
import ButtonC from "./shared/ButtonC";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import FormC from "./shared/FormC";
import style from "../styles/Navbar.module.css";
import { Dropdown } from "react-bootstrap";
import clientAxios from "../helpers/clientAxios";
import Swal from "sweetalert2";

const SignInModal = ({ show, handleClose, handleNavbarRole }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className={style.modalHeader}>
          <button className="btn-close" onClick={handleClose}></button>
        </Modal.Header>
        <Modal.Body className={style.modalBody}>
          <FormC
            variant="sign-in"
            handleCloseModal={handleClose}
            handleNavbarRole={handleNavbarRole}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

const NavbarC = () => {
  const [userRole, setUserRole] = useState("not-logged");
  const navigate = useNavigate();
  const [showSignIn, setShowSignIn] = useState(false);

  const handleCloseSession = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const res = await clientAxios.put(
        "/user/logout",
        {},
        {
          headers: {
            authtoken: token,
          },
        }
      );
      setUserRole("not-logged");
      sessionStorage.removeItem("role");
      sessionStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowSignIn = () => setShowSignIn(true);
  const handleCloseSignIn = () => setShowSignIn(false);

  const handleNavbarRole = () => {
    const userRoleSS = sessionStorage.getItem("role");
    if (userRoleSS) {
      setUserRole(userRoleSS);
    }
  };

  useEffect(() => {
    handleNavbarRole();
  }, []);

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
                <ButtonC
                  className="ms-md-auto ms-0 mt-3"
                  onClick={handleShowSignIn}
                >
                  Iniciar Sesión
                </ButtonC>
              )}
              {userRole === "user" && (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-bell-fill"
                    viewBox="0 0 16 16"
                    onClick={() => navigate("/user-profile/notifications")}
                    style={{ cursor: "pointer", marginRight: "1rem" }}
                  >
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
                  </svg>
                </>
              )}
              {userRole === "user" && (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="#000"
                    style={{ cursor: "pointer", marginRight: "1rem" }}
                    className="bi bi-bag"
                    viewBox="0 0 16 16"
                    onClick={() => navigate("/store")}
                  >
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                  </svg>
                </>
              )}

              {(userRole === "user" || userRole === "admin") && (
                <>
                  <Dropdown>
                    <Dropdown.Toggle
                      id="userOptionsDropdown"
                      className={style.userOptionsDropdownIcon}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="#000"
                        className="bi bi-person-circle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                        <path
                          fill-rule="evenodd"
                          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                        />
                      </svg>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className={style.userOptionsDropdownMenu}>
                      <Dropdown.Item
                        onClick={() => {
                          navigate("/user-profile/information");
                        }}
                        className={style.userOptionsDropdownMenuItem}
                      >
                        Editar Perfil
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          navigate("/user-profile/pets");
                        }}
                        className={style.userOptionsDropdownMenuItem}
                      >
                        Mis Mascotas
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          navigate("/booking");
                        }}
                        className={style.userOptionsDropdownMenuItem}
                      >
                        Reservar turno
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        onClick={handleCloseSession}
                        className={style.userOptionsDropdownMenuItem}
                      >
                        Cerrar Sesión
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <SignInModal
        show={showSignIn}
        handleClose={handleCloseSignIn}
        handleNavbarRole={handleNavbarRole}
      />
    </>
  );
};

export default NavbarC;
