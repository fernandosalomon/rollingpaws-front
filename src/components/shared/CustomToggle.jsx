import { useState } from "react";

const ToggleTitle = ({ children }) => {
  return (
    <>
      <h2 className="intro-title">{children}</h2>
      <span className="horizontal-bar"></span>
    </>
  );
};

const ToggleText = ({ children, show }) => {
  return (
    <>
      <p className={`intro-text ${show ? "" : "truncate"}`}>{children}</p>
    </>
  );
};

export const CustomToggle = ({ title, body, className }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <>
      <div className={className}>
        <ToggleTitle>{title}</ToggleTitle>
        <ToggleText show={show}>{body}</ToggleText>
        <button className="read-more-btn" onClick={handleShow}>
          {show ? "Mostrar menos" : "Leer Más"}
        </button>
      </div>
    </>
  );
};

export default CustomToggle;
