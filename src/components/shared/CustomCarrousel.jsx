import prev from "../../assets/img/left-arrow.svg";
import next from "../../assets/img/right-arrow.svg";
import Image from "react-bootstrap/Image";
import style from "../../styles/CustomCarrousel.module.css";
import { useState } from "react";

export const CustomCarrouselItem = ({ children }) => {
  return <>{children}</>;
};

export const CustomCarrousel = ({ children }) => {
  const [numberOfSlides, setNumberOfSlides] = useState(children.length);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {
    if (currentSlide <= 0) {
      setCurrentSlide(numberOfSlides - 1);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleNext = () => {
    if (currentSlide >= numberOfSlides - 1) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  return (
    <>
      <div className={style.mainWrapper}>
        <button
          className={`${style.ctrlBtn} ${style.prev}`}
          onClick={handlePrev}
        >
          <Image src={prev} alt="previous" />
        </button>

        {children[currentSlide]}

        <button
          className={`${style.ctrlBtn} ${style.next}`}
          onClick={handleNext}
        >
          <Image src={next} alt="next" />
        </button>
      </div>
    </>
  );
};
