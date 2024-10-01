import "../styles/HomePageBanner.css";
import ButtonC from "./shared/ButtonC";

const HomePageBanner = () => {
  return (
    <div className="main-wrapper">
      <div className="banner-wrapper">
        <h2 className="main-title mb-3">Rolling Paws</h2>
        <h3 className="subtitle mb-5">Siempre al lado de tu mascota</h3>
        <div>
          <ButtonC>Sobre Nosotros</ButtonC>
          <ButtonC>Reservar Cita</ButtonC>
        </div>
      </div>
    </div>
  );
};

export default HomePageBanner;
