import Card from "react-bootstrap/Card";
import ButtonC from "./ButtonC";
import { motion } from "framer-motion";

const CardC = ({
  variant,
  image,
  title,
  body,
  button,
  buttonContent,
  onClick,
  style,
}) => {
  return (
    <Card style={style}>
      {variant === "services" ? (
        <motion.div
          whileHover={{
            scale: 1.2,
            transition: { duration: 0.3 },
          }}
        >
          <Card.Img src={image} />
        </motion.div>
      ) : (
        <Card.Img src={image} />
      )}
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{body}</Card.Text>
        {button && <ButtonC onClick={onClick}>{buttonContent}</ButtonC>}
      </Card.Body>
    </Card>
  );
};

export default CardC;
