import "../../styles/button.css";

const ButtonC = ({ children, onClick, className, ...rest }) => {
  return (
    <button onClick={onClick} className={`customButton ${className}`}>
      {children}
    </button>
  );
};

export default ButtonC;
