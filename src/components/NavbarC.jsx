import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Logo from "../assets/img/simple-logo-nobg.png";
import { Link } from "react-router-dom";
import ButtonC from "./shared/ButtonC";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import FormC from "./shared/FormC";

const SignUpModal = ({ show, handleClose }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body
          style={{
            position: "relative",
            padding: "24px 32px",
            background: "url(./src/assets/img/paws-bg.svg)",
          }}
        >
          <div
            className=""
            style={{
              position: "absolute",
              top: "0",
              left: "calc(100% - 18px - 7px)",
            }}
          >
            <button
              style={{
                border: 0,
                backgroundColor: "transparent",
                fontSize: "1.5rem",
              }}
              onClick={handleClose}
            >
              X
            </button>
          </div>
          <FormC variant="sign-up" handleCloseModal={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
};
import style from "../styles/Navbar.module.css";

const NavbarC = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  const handleShowSignUp = () => setShowSignUp(true);
  const handleCloseSignUp = () => setShowSignUp(false);

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
              <Nav className={style.NavLinks}>
                <Link to="/nosotros">Nosotros</Link>
                <Link to="/servicios">Servicios</Link>
                <Link to="/productos">Productos</Link>
                <Link to="/Contacto">Contacto</Link>
              </Nav>
              <ButtonC
                className="ms-md-auto ms-0 mt-3"
                onClick={handleShowSignUp}
                variant={"button1"}
              >
                Iniciar Sesión
              </ButtonC>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <SignUpModal show={showSignUp} handleClose={handleCloseSignUp} />
    </>
  );
};

export default NavbarC;
