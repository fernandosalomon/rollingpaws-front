import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import Logo from "../assets/img/simple-logo-nobg.png";
import { Link } from "react-router-dom";
import ButtonC from "./shared/ButtonC";
import "../styles/navbar.css";
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
        <Modal.Header closeButton>
          <Modal.Title>Registrarse</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormC variant="sign-up" />
        </Modal.Body>
      </Modal>
    </>
  );
};

const NavbarC = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  const handleShowSignUp = () => setShowSignUp(true);
  const handleCloseSignUp = () => setShowSignUp(false);

  return (
    <>
      <Navbar expand="lg">
        <Link to="/">
          <Image src={Logo} width={"80px"} alt="Rolling Paws Logo" />
        </Link>
        <Nav className="me-auto">
          <Link to="/nosotros">Nosotros</Link>
          <Link to="/servicios">Servicios</Link>
          <Link to="/productos">Productos</Link>
          <Link to="/Contacto">Contacto</Link>
        </Nav>
        <ButtonC onClick={handleShowSignUp}>Iniciar Sesión</ButtonC>
        <ButtonC>Reservar Cita</ButtonC>
      </Navbar>
      <SignUpModal show={showSignUp} handleClose={handleCloseSignUp} />
    </>
  );
};

export default NavbarC;
