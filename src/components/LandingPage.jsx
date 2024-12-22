import style from "../styles/LandingPage.module.css";
import CustomButton from "./shared/CustomButton";


const LandingPage = () => {
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
          <CustomButton variant="callToAction" size="lg" className="w-50">
            Saber más
          </CustomButton>
          <CustomButton variant="secondary" size="lg" className="w-50">
            Iniciar Sesión
          </CustomButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
