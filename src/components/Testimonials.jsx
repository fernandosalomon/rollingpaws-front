import Image from "react-bootstrap/Image";
import { Slideshow, Slide } from "./shared/Slideshow";
import style from "../styles/Testimonials.module.css";

const RatingStars = ({ rating }) => {
  return (
    <div className="d-flex gap-2">
      {[...Array(Math.ceil(rating))].map((_, count) => (
        <i
          className={`bi bi-star-fill ${style.star} ${style.starFilled}`}
          key={count}
        ></i>
      ))}
      {[...Array(5 - Math.ceil(rating))].map((_, count) => (
        <i className={`bi bi-star ${style.star}`} key={5 - count}></i>
      ))}
    </div>
  );
};

const Testimonials = () => {
  return (
    <>
      <h2 className={style.title}>Opiniones</h2>
      <h3 className={style.subtitle}>
        Tus opiniones nos alientan a seguir brindando un servicio de calidad
      </h3>
      <Slideshow pagination backgroundColor="transparent">
        <Slide>
          <div className={style.testimonialContainer}>
            <p className={style.testimonialComment}>
              “¡Rolling Paws es increíble! El equipo es súper amable y
              profesional. Mi perrito siempre sale feliz y saludable después de
              cada visita. ¡No podría pedir un mejor cuidado para mi mascota!“
            </p>
            <div className={style.testimonialFooter}>
              <div className={style.testimonialAvatarsWrapper}>
                <div
                  className={`${style.testimonialAvatar} ${style.testimonialAvatarOwner}`}
                >
                  <Image src="./src/assets/img/testimonials/dueño-0002.jfif" />
                </div>
                <div
                  className={`${style.testimonialAvatar} ${style.testimonialAvatarPet}`}
                >
                  <Image src="./src/assets/img/testimonials/mascota-0002.jpeg" />
                </div>
              </div>
              <div className="d-flex flex-column justify-content-center gap-2 ms-4">
                <h2 className={style.testimonialName}>Juan Perez</h2>
                <RatingStars rating={5} />
              </div>
            </div>
          </div>
        </Slide>
        <Slide>
          <div className={style.testimonialContainer}>
            <p className={style.testimonialComment}>
              “¡Rolling Paws es increíble! El equipo es súper amable y
              profesional. Mi perrita siempre sale feliz y saludable después de
              cada visita. ¡No podría pedir un mejor cuidado para mi mascota!“
            </p>
            <div className={style.testimonialFooter}>
              <div className={style.testimonialAvatarsWrapper}>
                <div
                  className={`${style.testimonialAvatar} ${style.testimonialAvatarOwner}`}
                >
                  <Image src="./src/assets/img/testimonials/dueño-0003.png" />
                </div>
                <div
                  className={`${style.testimonialAvatar} ${style.testimonialAvatarPet}`}
                >
                  <Image src="./src/assets/img/testimonials/mascota-0003.jfif" />
                </div>
              </div>
              <div className="d-flex flex-column justify-content-center gap-2 ms-4">
                <h2 className={style.testimonialName}>Emiliana Torres</h2>
                <RatingStars rating={5} />
              </div>
            </div>
          </div>
        </Slide>
        <Slide>
          <div className={style.testimonialContainer}>
            <p className={style.testimonialComment}>
              “Rolling Paws ofrece un buen servicio veterinario. El personal es
              competente y mi gato siempre recibe la atención necesaria. Estoy
              satisfecho con su trabajo.”
            </p>
            <div className={style.testimonialFooter}>
              <div className={style.testimonialAvatarsWrapper}>
                <div
                  className={`${style.testimonialAvatar} ${style.testimonialAvatarOwner}`}
                >
                  <Image src="./src/assets/img/testimonials/dueño-0004.jfif" />
                </div>
                <div
                  className={`${style.testimonialAvatar} ${style.testimonialAvatarPet}`}
                >
                  <Image src="./src/assets/img/testimonials/mascota-0004.jfif" />
                </div>
              </div>
              <div className="d-flex flex-column justify-content-center gap-2 ms-4">
                <h2 className={style.testimonialName}>Marcos Serrano</h2>
                <RatingStars rating={4} />
              </div>
            </div>
          </div>
        </Slide>
      </Slideshow>
    </>
  );
};

export default Testimonials;
