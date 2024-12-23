import style from "../../styles/CustomButton.module.css";

const CustomButton = ({
  children,
  variant,
  size,
  disabled,
  onClick,
  className,
  type,
  ...rest
}) => {
  return (
    <button
      onClick={onClick}
      className={`${className} ${style.button} ${size === "lg" ? style.buttonLG : ""} ${size === "md" ? style.buttonMD : ""} ${size === "sm" ? style.buttonSM : ""} ${variant === "callToAction" ? style.callToActionButton : ""
        } ${variant === "secondary" ? style.secondaryButton : ""} ${variant === "transparent" ? "" : ""} ${variant === "remove" ? style.removeButton : ""
        } ${disabled ? style.disabled : ""}`}
      type={type ? type : "button"}
    >
      {children}
    </button>
  )
}

export default CustomButton