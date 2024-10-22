import Card from "react-bootstrap/Card";
import ButtonC from "./ButtonC";
import style from "../../styles/CustomCard.module.css";

const CardC = ({
  variant,
  pathToImage,
  imagePosition,
  title,
  text,
  button,
}) => {
  return (
    <>
      <Card className={style.cardContainer}>
        <div className={style.cardImageContainer}>
          <Card.Img
            variant={imagePosition}
            src={pathToImage}
            className={style.cardImage}
          />
        </div>
        <Card.Body>
          <Card.Title className={style.cardTitle}>{title}</Card.Title>
          <Card.Text className={style.cardText}>{text}</Card.Text>
          {button}
        </Card.Body>
      </Card>
    </>
  );
};

export default CardC;
