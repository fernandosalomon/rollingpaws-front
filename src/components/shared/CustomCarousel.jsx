import prev from "../../assets/img/left-arrow.svg";
import next from "../../assets/img/right-arrow.svg";
import Image from "react-bootstrap/Image";
import style from "../../styles/CustomCarousel.module.css";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const CustomCarouselItem = ({ children }) => {
  return <>{children}</>;
};

export const CustomCarouselHeader = ({ children }) => {
  return <div className={style.carouselHeader}>{children}</div>;
};

export const CustomCarouselCaption = ({ children }) => {
  return <div className={style.carouselCaption}>{children}</div>;
};

export const CustomCarouselPagination = ({ numberOfSlides, currentSlide }) => {
  return (
    <div className={style.paginationContainer}>
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

export const CustomCarousel = ({ children, pagination }) => {
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

  const Slide = ({ children, currentSlide }) => {
    return (
      <motion.div
        initial={{ marginLeft: "-100vw", opacity: 0 }}
        animate={{ marginLeft: 0, opacity: 1 }}
        exit={{ marginLeft: "100vw", opacity: 0 }}
        transition={{ duration: 0.7 }}
      >
        {children[currentSlide]}
      </motion.div>
    );
  };

  return (
    <>
      <div className={style.carouselContainer}>
        <AnimatePresence mode="wait" initial={false}>
          <Slide currentSlide={currentSlide}>{children}</Slide>
        </AnimatePresence>

        <button
          className={`${style.ctrlBtn} ${style.prev}`}
          onClick={handlePrev}
        >
          <Image src={prev} alt="previous" />
        </button>

        <button
          className={`${style.ctrlBtn} ${style.next}`}
          onClick={handleNext}
        >
          <Image src={next} alt="next" />
        </button>
        {pagination && (
          <CustomCarouselPagination
            numberOfSlides={numberOfSlides}
            currentSlide={currentSlide}
          />
        )}
      </div>
    </>
  );
};
