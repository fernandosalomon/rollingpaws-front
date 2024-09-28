import "../../styles/button.css";

const ButtonC = ({ children, onClick, ...rest }) => {
  return (
    <button onClick={onClick} className="customButton">
      {children}
    </button>
  );
};

export default ButtonC;
