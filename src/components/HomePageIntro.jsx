import Container from "react-bootstrap/Container";
import CustomToggle from "./shared/CustomToggle";

const HomePageIntro = () => {
  return (
    <>
      <div className="intro-wrapper">
        <Container fluid="sm">
          <CustomToggle
            title="¿Quiénes Somos?"
            body="Rolling Paws, es una clínica
            veterinaria donde el bienestar de tus mascotas es la prioridad.
            Nuestro equipo de veterinarios apasionados y experimentados está
            dedicado a proporcionar atención médica de alta calidad en un
            ambiente cálido y acogedor. Ofrecemos una amplia gama de servicios,
            desde chequeos rutinarios hasta tratamientos especializados,
            asegurando que tu compañero peludo reciba el mejor cuidado posible.
            ¡Confía en nosotros para mantener a tus mascotas felices y
            saludables!"
            className={"mb-5"}
          />

          <CustomToggle
            title="¿Por qué elegirnos?"
            body="En Rolling Paws, nos destacamos por nuestro compromiso con la salud y
          el bienestar de tus mascotas. Nuestro equipo de veterinarios altamente
          capacitados ofrece atención personalizada y compasiva, utilizando
          tecnología de vanguardia para diagnósticos y tratamientos precisos.
          Además, contamos con un ambiente acogedor y seguro que garantiza una
          experiencia positiva tanto para ti como para tu mascota. Nos
          enorgullece ofrecer servicios integrales, desde chequeos rutinarios
          hasta cuidados especializados, asegurando que tu compañero peludo
          reciba el mejor cuidado posible. ¡Elige Rolling Paws y descubre la
          diferencia en el cuidado veterinario!"
          />
        </Container>
      </div>
    </>
  );
};

export default HomePageIntro;
