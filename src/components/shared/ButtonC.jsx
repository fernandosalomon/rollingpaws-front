import style from "../../styles/CustomButton.module.css";

const ButtonC = ({ children, onClick, isDisabled, className, ...rest }) => {
  return (
    <button
      onClick={onClick}
      className={`${className} ${style.navbarButton}`}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default ButtonC;
