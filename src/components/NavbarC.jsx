import { useEffect, useState } from "react";
import clientAxios from "../helpers/clientAxios";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import { Dropdown, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "./shared/CustomButton";
import FormC from "./shared/FormC";
import Logo from "../assets/img/simple-logo-nobg.png";
import style from "../styles/Navbar.module.css";
import Swal from "sweetalert2";
import axios from "axios";

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

const WeatherBar = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState(null);

  const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY

  useEffect(() => {
    setIsLoading(true);
    let latitude, longitude = null;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
          setLocation({ latitude, longitude })
        }, (error) => console.log("Ocurrio un error al obtener la posición del usuario: ", error)
      );
      setIsLoading(false);
    }
  }, [])

  useEffect(() => {

    const fetchWeatherApi = async () => {
      setIsLoading(true);
      if (location !== null) {
        console.log(location);
        try {
          const weather = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${location.latitude},${location.longitude}&aqi=no`);
          setWeatherData(weather.data);
          setIsLoading(false);
        } catch (error) {
          console.log(error)
        }
      } else {
        console.error('Tu navegador no soporta geolocalización.');
      }
    }
    fetchWeatherApi();
  }, [location])

  useEffect(() => console.log(weatherData.location), [weatherData])

  return (
    <div className={style.weatherDataContainer}>
      <div className={style.contactInfoNavbar}>
        <div className="d-flex align-items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
          </svg>
          <p className="mb-0 fs-5">+54 381 4123456</p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill="currentColor"
            className="bi bi-whatsapp"
            viewBox="0 0 16 16"
          >
            <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
          </svg>
          <p className="mb-0 fs-5">+54 381 4123456</p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
          </svg>
          <p className="mb-0 fs-5">Calle Falsa 123, San Miguel de Tucumán, Tucumán</p>
        </div>
      </div>
      {
        !isLoading ?
          <div className="d-flex align-items-center gap-2">
            <Image src={weatherData?.current?.condition?.icon} alt={weatherData?.current?.condition?.text} className={style.weatherDataIcon} />
            <p className="mb-0 fw-semibold">{`${weatherData?.current?.temp_c}°C`}</p>
          </div>
          :
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
      }
    </div>)


}

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
      <WeatherBar />
      <Navbar expand="md" className={style.Navbar} sticky="top">
        <Container fluid>
          <Link to={userRole === "admin" ? "/admin" : "/"}>
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
                  <Link to="/admin/appointments">Turnos</Link>
                  <Link to="/admin/messages">Mensajes</Link>
                  <Link to="/admin/services">Servicios</Link>
                </Nav>
              ) : (
                <Nav className={style.NavLinks}>
                  <Link to="/nosotros">Nosotros</Link>
                  <Link to="/servicios">Servicios</Link>
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
