import { useState } from "react";
import style from "../../styles/Slideshow.module.css";
import { motion } from "framer-motion";

export const Slide = ({ children }) => {
  return <div className={style.Slide}>{children}</div>;
};

const SlideshowSlider = ({ children, currentSlide }) => {
  return (
    <motion.div
      className={style.SlideshowSlider}
      animate={{ transform: `translate(${-currentSlide * 100}%)` }}
      transition={{ ease: "easeOut", duration: 1 }}
    >
      {children}
    </motion.div>
  );
};

const SlideshowPagination = ({ numberOfSlides, currentSlide }) => {
  return (
    <div
      className={style.paginationContainer}
      style={{
        bottom: "10px",
        left: `calc(50% - ${(numberOfSlides - 1) * 14}px)`,
      }}
    >
      {[...Array(numberOfSlides)].map((_, count) => (
        <div
          className={`${style.pagination} ${
            currentSlide === count && style.pagination__active
          }`}
          key={count}
        ></div>
      ))}
    </div>
  );
};

const ControlButton = ({ variant, onClick }) => {
  return (
    <>
      <button
        className={`${style.ctrlBtn} ${
          variant === "prevButton" ? style.prev : ""
        } ${variant === "nextButton" ? style.next : ""}`}
        onClick={onClick}
      >
        {variant === "prevButton" && (
          <svg fill="#000000" width="800px" height="800px" viewBox="0 0 24 24">
            <path d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z" />
          </svg>
        )}
        {variant === "nextButton" && (
          <svg fill="#000000" width="800px" height="800px" viewBox="0 0 24 24">
            <path d="M10 19a1 1 0 0 1-.64-.23 1 1 0 0 1-.13-1.41L13.71 12 9.39 6.63a1 1 0 0 1 .15-1.41 1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 10 19z" />
          </svg>
        )}
      </button>
    </>
  );
};

export const Slideshow = ({ children, pagination, backgroundColor }) => {
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
      <div
        className={style.Slideshow}
        style={{ backgroundColor: backgroundColor }}
      >
        <ControlButton variant="prevButton" onClick={handlePrev} />
        <ControlButton variant="nextButton" onClick={handleNext} />
        <SlideshowSlider
          handlePrev={handlePrev}
          handleNext={handleNext}
          currentSlide={currentSlide}
        >
          <div className={style.SlideshowSliderWrapper}>{children}</div>
        </SlideshowSlider>
        {pagination && (
          <SlideshowPagination
            numberOfSlides={numberOfSlides}
            currentSlide={currentSlide}
          />
        )}
      </div>
    </>
  );
};
