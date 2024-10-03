import Image from "react-bootstrap/Image";
import testimonial1 from "../assets/img/testimonial-1.jpg";
import {
  CustomCarrousel,
  CustomCarrouselItem,
  CustomCarrouselImage,
  CustomCarrouselCaption,
  CustomCarrouselPagination,
} from "./shared/CustomCarrousel";
import { useEffect } from "react";

const Testimonials = () => {
  useEffect(() => {
    console.log(testimonial1);
  }, []);

  return (
    <>
      <CustomCarrousel>
        <CustomCarrouselItem>
          <div className="testimonials-wrapper">
            <CustomCarrouselImage src={testimonial1} alt="testimonial-image" />
            <CustomCarrouselCaption>
              <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1">
                <h2 className="mt-3">Juan Perez</h2>
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
            </CustomCarrouselCaption>
          </div>
        </CustomCarrouselItem>
        <CustomCarrouselItem>
          <div className="testimonials-wrapper">
            <CustomCarrouselImage src={testimonial1} alt="testimonial-image" />
            <CustomCarrouselCaption>
              <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1">
                <h2 className="mt-3">Juan Perez</h2>
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
            </CustomCarrouselCaption>
          </div>
        </CustomCarrouselItem>
        <CustomCarrouselItem>
          <div className="testimonials-wrapper">
            <CustomCarrouselImage src={testimonial1} alt="testimonial-image" />
            <CustomCarrouselCaption>
              <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1">
                <h2 className="mt-3">Juan Perez</h2>
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
            </CustomCarrouselCaption>
          </div>
        </CustomCarrouselItem>

        <CustomCarrouselPagination />
      </CustomCarrousel>
    </>
  );
};

export default Testimonials;
