import Image from "react-bootstrap/Image";
import {
  CustomCarousel,
  CustomCarouselItem,
  CustomCarouselHeader,
  CustomCarouselCaption,
  CustomCarouselPagination,
} from "./shared/CustomCarousel";

const RatingStars = ({ rating }) => {
  return (
    <div className="d-flex gap-2 mb-4">
      {[...Array(Math.ceil(rating))].map((_, count) => (
        <i className="bi bi-star-fill" key={count}></i>
      ))}
      {[...Array(5 - Math.ceil(rating))].map((_, count) => (
        <i className="bi bi-star" key={5 - count}></i>
      ))}
    </div>
  );
};

const Testimonials = () => {
  return (
    <>
      <CustomCarousel pagination={true}>
        <CustomCarouselItem>
          <CustomCarouselHeader>
            <div className="testimonials-avatars-wrapper">
              <div className="testimonials-avatars testimonials-avatars-owner">
                <Image src="./src/assets/img/testimonials/dueño-0002.jfif" />
              </div>
              <div className="testimonials-avatars testimonials-avatars-pet">
                <Image src="./src/assets/img/testimonials/mascota-0002.jpeg" />
              </div>
            </div>
          </CustomCarouselHeader>
          <CustomCarouselCaption>
            <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1">
              <h2 className="mt-3">Juan Perez</h2>
              <RatingStars rating={4} />
              <p className="text-center font-italic testimonials-comment">
                “¡Rolling Paws es increíble! El equipo es súper amable y
                profesional. Mi perrito siempre sale feliz y saludable después
                de cada visita. ¡No podría pedir un mejor cuidado para mi
                mascota!
              </p>
            </div>
          </CustomCarouselCaption>
        </CustomCarouselItem>
        <CustomCarouselItem>
          <div className="testimonials-wrapper">
            <CustomCarouselHeader>
              <div className="testimonials-avatars-wrapper">
                <div className="testimonials-avatars testimonials-avatars-owner">
                  <Image src="./src/assets/img/testimonials/dueño-0003.webp" />
                </div>
                <div className="testimonials-avatars testimonials-avatars-pet">
                  <Image src="./src/assets/img/testimonials/mascota-0004.png" />
                </div>
              </div>
            </CustomCarouselHeader>
            <CustomCarouselCaption>
              <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1">
                <h2 className="mt-3">Emiliana Torres</h2>
                <RatingStars rating={5} />
                <p className="text-center font-italic testimonials-comment">
                  “¡Rolling Paws es increíble! El equipo es súper amable y
                  profesional. Mi perrita siempre sale feliz y saludable después
                  de cada visita. ¡No podría pedir un mejor cuidado para mi
                  mascota!“
                </p>
              </div>
            </CustomCarouselCaption>
          </div>
        </CustomCarouselItem>
        <CustomCarouselItem>
          <div className="testimonials-wrapper">
            <CustomCarouselHeader>
              <div className="testimonials-avatars-wrapper">
                <div className="testimonials-avatars testimonials-avatars-owner">
                  <Image src="./src/assets/img/testimonials/dueño-0004.jfif"></Image>
                </div>
                <div className="testimonials-avatars testimonials-avatars-pet">
                  <Image src="./src/assets/img/testimonials/mascota-0003.jpeg"></Image>
                </div>
              </div>
            </CustomCarouselHeader>
            <CustomCarouselCaption>
              <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1">
                <h2 className="mt-3">Marcos Serrano</h2>
                <RatingStars rating={4} />
                <p className="text-center font-italic testimonials-comment">
                  “Rolling Paws ofrece un buen servicio veterinario. El personal
                  es competente y mi gato siempre recibe la atención necesaria.
                  Estoy satisfecho con su trabajo.”
                </p>
              </div>
            </CustomCarouselCaption>
          </div>
        </CustomCarouselItem>
      </CustomCarousel>
    </>
  );
};

export default Testimonials;
