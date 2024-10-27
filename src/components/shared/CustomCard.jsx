import style from "../../styles/CustomCard.module.css";
import Image from "react-bootstrap/Image";

export const CardImage = ({ src, alt, className, position }) => {
  console.log(className);
  return (
    <div className={`${className ? className : ""} ${style.imageContainer}`}>
      <Image src={src} alt={alt} />
    </div>
  );
};

export const CardHeader = ({ children, className }) => {
  return <h2 className={`${style.header} ${className}`}>{children}</h2>;
};

export const CardSubheader = ({ children, className }) => {
  return <h2 className={`${style.subheader} ${className}`}>{children}</h2>;
};

export const CardBody = ({ children, className }) => {
  return <div className={`${style.body} ${className}`}>{children}</div>;
};

export const CardText = ({ children, className }) => {
  return <h2 className={`${style.cardContent} ${className}`}>{children}</h2>;
};

export const CardFooter = ({ children, className }) => {
  return <div className={`${style.footer} ${className}`}>{children}</div>;
};

export const CustomCard = ({ children, variant, width, height, className }) => {
  return (
    <>
      <div
        className={`${style.card} ${className}`}
        style={{
          width: width ? width : "100%",
          height: height ? height : "100%",
        }}
      >
        {children}
      </div>
    </>
  );
};
