import style from "../../styles/CustomButton.module.css";

const ButtonC = ({
  children,
  variant,
  onClick,
  isDisabled,
  className,
  ...rest
}) => {
  return (
    <button
      onClick={onClick}
      className={`${className} ${
        variant === "button1" && style.navbarButton1
      } ${variant === "button2" && style.navbarButton2}`}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default ButtonC;
