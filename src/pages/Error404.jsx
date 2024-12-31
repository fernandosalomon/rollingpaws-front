import Image from "react-bootstrap/Image"
import style from "../styles/Error404.module.css"
import CustomButton from "../components/shared/CustomButton";
import { useNavigate } from "react-router-dom";

const Error404 = () => {

  const navigate = useNavigate();

  return <div className={style.error404Wrapper}>
    <Image src={"https://res.cloudinary.com/dqpq2d0es/image/upload/v1735664218/error404_img_qtvdn0.jpg"} alt="Error 404 Image" width={"300px"} />
    <h2 className={style.error404Title}>Woof Woof! Woof Woof!</h2>
    <h3 className={style.error404Text}>Parece que a esta página se la comió el perro y no podemos presentarla</h3>
    <CustomButton variant="callToAction" onClick={() => navigate(-1)}>Regresame a donde estaba</CustomButton>

  </div>;
};

export default Error404;
