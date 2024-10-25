import style from "../styles/LandingPage.module.css";
import ButtonC from "./shared/ButtonC";

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
          <ButtonC className="w-75 mt-5" variant={"button1"}>
            Reservar Cita
          </ButtonC>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
