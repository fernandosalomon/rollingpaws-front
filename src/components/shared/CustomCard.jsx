import style from "../../styles/CustomCard.module.css";
import Image from "react-bootstrap/Image";

// export const CardImage = ({ src, height, width, className }) => {
//   return (
//     <Image src={src} width={width} height={height} className={className} />
//   );
// };

export const CardImage = ({ src, width, height, className }) => {
  return (
    <div
      className={`${style.image} ${className}`}
      style={{ backgroundImage: `url(${src})`, width: `${width}`, height: `${height}` }}
    ></div>
  );
};

export const CardBody = ({ children, className }) => {
  return <div className={`${style.bodyWrapper} ${className}`}>{children}</div>;
};

export const CardTitle = ({ children, className }) => {
  return <div className={`${style.title} ${className}`}>{children}</div>;
};

export const CardSubtitle = ({ children, className }) => {
  return <div className={`${style.subtitle} ${className}`}>{children}</div>;
};

export const CardText = ({ children, className }) => {
  return <div className={`${style.text} ${className}`}>{children}</div>;
};

export const CustomCard = ({ children, variant, width, height, className }) => {
  return (
    <div
      className={`${style.card} ${variant === "vertical" ? style.vertical : ""
        } ${variant === "horizontal" ? style.horizontal : ""} ${className}`}
      style={{ width: width, height: height }}
    >
      {children}
    </div>
  );
};
