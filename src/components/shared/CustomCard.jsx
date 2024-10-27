import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import style from "../../styles/CustomCard.module.css";

const CustomCard = ({
  variant,
  pathToImage,
  title,
  text,
  footer,
  width,
  height,
}) => {
  return (
    <>
      <Card
        className={`${style.cardLayout} ${
          variant === "top" && style.variantTop
        } ${variant === "left" && style.variantLeft}`}
        style={{ width: width, height: height }}
      >
        <div
          className={`${variant === "top" && style.imageVariantTop} ${
            variant === "left" && style.imageVariantLeft
          }`}
        >
          <Image src={pathToImage} alt={title} className={style.cardImage} />
        </div>
        <Card.Body>
          <h2 className={style.cardTitle}>{title}</h2>
          <p className={style.cardText}>{text}</p>
          <div className={style.cardFooter}>{footer}</div>
        </Card.Body>
      </Card>
    </>
  );
};

export default CustomCard;
