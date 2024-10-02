import Image from "react-bootstrap/Image";
import testimonial from "../assets/img/testimonial-1.jpg";
import prev from "../assets/img/left-arrow.svg";
import next from "../assets/img/right-arrow.svg";
import { CustomCarrousel, CustomCarrouselItem } from "./shared/CustomCarrousel";

const Testimonials = () => {
  return (
    <>
      <CustomCarrousel>
        <CustomCarrouselItem>
          <div className="testimonials-wrapper">
            <div className="testimonials--img">
              <Image src={testimonial} alt="testimonial-1" />
            </div>
            <div className="testimonials--text">
              <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1">
                <h2>Juan Perez</h2>
                <div className="d-flex gap-2 mb-4">
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                </div>
                <p className="text-center font-italic testimonials-comment">
                  “La atención en esta veterinaria es excepcional. Siempre
                  cuidan de nuestras mascotas con cariño y profesionalismo. ¡Los
                  recomiendo sin dudarlo!”
                </p>
              </div>
            </div>
          </div>
        </CustomCarrouselItem>
        <CustomCarrouselItem>
          <div className="testimonials-wrapper">
            <div className="testimonials--img">
              <Image src={testimonial} alt="testimonial-1" />
            </div>
            <div className="testimonials--text">
              <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1">
                <h2>Pablo Castro</h2>
                <div className="d-flex gap-2 mb-4">
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                </div>
                <p className="text-center font-italic testimonials-comment">
                  “La atención en esta veterinaria es excepcional. Siempre
                  cuidan de nuestras mascotas con cariño y profesionalismo. ¡Los
                  recomiendo sin dudarlo!”
                </p>
              </div>
            </div>
          </div>
        </CustomCarrouselItem>
        <CustomCarrouselItem>
          <div className="testimonials-wrapper">
            <div className="testimonials--img">
              <Image src={testimonial} alt="testimonial-1" />
            </div>
            <div className="testimonials--text">
              <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1">
                <h2>Mariano Cuevas</h2>
                <div className="d-flex gap-2 mb-4">
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                </div>
                <p className="text-center font-italic testimonials-comment">
                  “La atención en esta veterinaria es excepcional. Siempre
                  cuidan de nuestras mascotas con cariño y profesionalismo. ¡Los
                  recomiendo sin dudarlo!”
                </p>
              </div>
            </div>
          </div>
        </CustomCarrouselItem>
      </CustomCarrousel>
    </>
  );
};

export default Testimonials;
