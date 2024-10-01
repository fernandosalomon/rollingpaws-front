import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import Logo from "../assets/img/simple-logo-nobg.png";
import { Link } from "react-router-dom";
import ButtonC from "./shared/ButtonC";
import "../styles/navbar.css";

const NavbarC = () => {
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
        <ButtonC>Iniciar Sesión</ButtonC>
        <ButtonC>Reservar Cita</ButtonC>
      </Navbar>
    </>
  );
};

export default NavbarC;
