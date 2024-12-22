import style from "../../styles/CustomButton.module.css";

const CustomButton = ({
  children,
  variant,
  size,
  disabled,
  onClick,
  className,
  ...rest
}) => {
  return (
    <button
      onClick={onClick}
      className={`${className} ${style.button} ${size === "lg" ? style.buttonLG : ""} ${size === "md" ? style.buttonMD : ""} ${size === "sm" ? style.buttonSM : ""} ${variant === "callToAction" ? style.callToActionButton : ""
        } ${variant === "secondary" ? style.secondaryButton : ""} ${variant === "transparent" ? "" : ""} ${disabled ? style.disabled : ""}`}
    >
      {children}
    </button>
  )
}

export default CustomButton