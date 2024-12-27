import { useEffect, useState } from "react";
import clientAxios from "../helpers/clientAxios";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import { Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "./shared/CustomButton";
import FormC from "./shared/FormC";
import Logo from "../assets/img/simple-logo-nobg.png";
import style from "../styles/Navbar.module.css";
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

const NewAppointmentModal = ({ show, handleClose }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-modal="true"
        closeAfterTransition={false}
      >
        <Modal.Header className={style.modalHeader}>
          <button className="btn-close" onClick={handleClose}></button>
        </Modal.Header>
        <Modal.Body className={style.modalBody}>
          <FormC variant="new-appointment" handleCloseModal={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
};

const NavbarC = () => {
  const [userRole, setUserRole] = useState("not-logged");
  const navigate = useNavigate();
  const [showSignIn, setShowSignIn] = useState(false);
  const [showNewAppointment, setShowNewAppointment] = useState(false);

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
      Swal.fire({
        imageUrl: "/src/assets/img/dog-waving-hand.png",
        imageHeight: 200,
        imageAlt: "Dog goodbye",
        title: "Hasta la próxima",
        text: "¡Te esperamos!",
        showConfirmButton: false,
        timer: 2500
      });
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

  const handleShowNewAppointment = () => setShowNewAppointment(true);
  const handleCloseNewAppointment = () => setShowNewAppointment(false);

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
              className="bi bi-three-dots"
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
                  <Link to="/admin/appointment">Turnos</Link>
                </Nav>
              ) : (
                <Nav className={style.NavLinks}>
                  <Link to="/nosotros">Nosotros</Link>
                  <Link to="/servicios">Servicios</Link>
                  <Link to="/tienda">Productos</Link>
                  <Link to="/Contacto">Contacto</Link>
                </Nav>
              )}
              {userRole === "not-logged" && (
                <CustomButton
                  className="ms-md-auto ms-0 mt-3 fs-3 d-flex gap-3 align-items-center justify-content-center"
                  onClick={handleShowSignIn}
                  variant="transparent"
                  size="lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#FD5602" className="bi bi-person-fill" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                  </svg>
                  <p className={style.signInMessage}><span className="fw-semibold">¡Hola! Inicia sesión</span> <br /> o podes registrarte</p>
                </CustomButton>
              )}
              {userRole === "user" && (
                <div className="d-flex align-items-center gap-2">
                  <CustomButton
                    className="d-flex align-items-center ms-md-auto ms-0 mt-3"
                    onClick={handleShowNewAppointment}
                    variant="transparent"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="bi bi-calendar-event me-2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z" />
                      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                    </svg>
                    <p className="m-0">Pedir Turno</p>
                  </CustomButton>
                  <Link to="/tienda">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="#000"
                      class="bi bi-bag"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                    </svg>
                  </Link>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-bell-fill ms-3"
                    viewBox="0 0 16 16"
                    onClick={() => navigate("/user-profile/notifications")}
                    style={{ cursor: "pointer", marginRight: "1rem" }}
                  >
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
                  </svg>
                </div>
              )}

              {(userRole === "user" || userRole === "admin") && (
                <>
                  <Dropdown className="d-flex align-items-center">
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
                          fillRule="evenodd"
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
                          navigate("/user-profile/appointments");
                        }}
                        className={style.userOptionsDropdownMenuItem}
                      >
                        Mis turnos
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
      <NewAppointmentModal
        show={showNewAppointment}
        handleClose={handleCloseNewAppointment}
      />
    </>
  );
};

export default NavbarC;
