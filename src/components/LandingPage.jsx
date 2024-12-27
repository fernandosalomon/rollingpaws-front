import { useNavigate } from "react-router-dom";
import style from "../styles/LandingPage.module.css";
import CustomButton from "./shared/CustomButton";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import FormC from "./shared/FormC";

const SignInModal = ({ show, handleClose, handleNavbarRole }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="border-0">
          <button className="btn-close" onClick={handleClose}></button>
        </Modal.Header>
        <Modal.Body className={style.modalBody}>
          <FormC
            variant="sign-in"
            handleCloseModal={handleClose}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

const LandingPage = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const navigate = useNavigate()
  const handleShowSignIn = () => setShowSignIn(true);
  const handleCloseSignIn = () => setShowSignIn(false);

  return (
    <>
      <div className={style.landingWrapper}>
        <div className={style.introTextWrapper}>
          <div className="mb-5">
            <h2 className={style.landingTextHeader}>Clínica Veterinaria</h2>
            <h1 className={style.landingTextHeader}>Rolling Paws</h1>
          </div>
          <p className={style.landingTextSubHeader}>
            Brindamos el mejor cuidado y cariño a tus mascotas en cada etapa de
            su vida. Nuestro equipo trata a cada paciente como parte de la
            familia, asegurando su bienestar y salud siempre.
          </p>
          <div className="w-100 d-flex flex-column flex-sm-row justify-content-center align-items-center mt-4 pe-3">
            <CustomButton variant="callToAction" size="lg" className="w-50" onClick={() => navigate("/nosotros")}>
              Saber más
            </CustomButton>
            <CustomButton variant="secondary" size="lg" className="w-50" onClick={handleShowSignIn}>
              Iniciar Sesión
            </CustomButton>
          </div>
        </div>
      </div>
      <SignInModal
        show={showSignIn}
        handleClose={handleCloseSignIn}
      />
    </>
  );
};

export default LandingPage;
