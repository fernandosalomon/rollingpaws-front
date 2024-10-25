import Card from "react-bootstrap/Card";
import style from "../../styles/CustomCard.module.css";
import Image from "react-bootstrap/Image";
import ButtonC from "./ButtonC";

const CardImage = ({ src, alt, className }) => {
  return (
    <>
      <div className={style.imageCardContainer}>
        <div className={style.imageWrapper}>
          <Image
            src={src}
            alt={alt}
            className={`${className} ${style.imageCard}`}
          />
        </div>
      </div>
    </>
  );
};

const CardC = ({
  variant,
  width,
  height,
  className,
  pathToImage,
  imagePosition,
  title,
  text,
  button,
  buttonVariant,
  buttonLabel,
  buttonOnClick,
}) => {
  return (
    <>
      <Card
        className={`${style.cardContainer} ${className}`}
        style={{ width: width, height: height }}
      >
        <CardImage src={pathToImage} alt={title} />
        <Card.Body>
          <Card.Title className={style.cardTitle}>{title}</Card.Title>
          <Card.Text className={style.cardText}>{text}</Card.Text>
          {button && (
            <ButtonC
              onClick={buttonOnClick}
              variant={buttonVariant}
              className="mt-3 w-100"
            >
              {buttonLabel}
            </ButtonC>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default CardC;
