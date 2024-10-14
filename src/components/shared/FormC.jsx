import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import style from "../../styles/FormC.module.css";

const FormC = ({ variant }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Row>
          <Col sm={12}>
            <Form.Group className="mb-3" controlId="SignUpName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese su Nombre"
                {...register("username", {
                  required: { value: true, message: "Campo requerido" },
                  minLength: {
                    value: 2,
                    message: "Mínimo requerido: 2 caracteres",
                  },
                  maxLength: {
                    value: 40,
                    message: "Máximo permitido: 40 caracteres",
                  },
                  pattern: {
                    value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ][a-zA-ZáéíóúÁÉÍÓÚñÑ' ]*$/,
                    message: "Formato de nombre inválido.",
                  },
                })}
              />
              {errors.username && (
                <span className={style.errorMessage}>
                  <i className="bi bi-exclamation-circle-fill me-1"></i>
                  {errors.username.message}
                </span>
              )}
            </Form.Group>
          </Col>

          <Col sm={12}>
            <Form.Group className="mb-3" controlId="SignUpEmail">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese su Email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Campo requerido",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/,
                    message: "Formato de email inválido.",
                  },
                })}
              />
              {errors.email && (
                <span className={style.errorMessage}>
                  <i className="bi bi-exclamation-circle-fill me-1"></i>
                  {errors.email.message}
                </span>
              )}
            </Form.Group>
          </Col>

          <Col sm={6}>
            <Form.Group className="mb-3" controlId="SignUpPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Campo requerido",
                  },
                  minLength: {
                    value: 8,
                    message:
                      "La contraseña debe contener al menos 8 caracteres",
                  },
                  pattern: {
                    value:
                      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                    message:
                      "La contraseña debe contener al menos una mayuscula, una minuscula, un número y un caracter especial (@$!%*?&)",
                  },
                })}
              />
              {errors.password && (
                <span className={style.errorMessage}>
                  <i className="bi bi-exclamation-circle-fill me-1"></i>
                  {errors.password.message}
                </span>
              )}
            </Form.Group>
          </Col>

          <Col sm={6}>
            <Form.Group className="mb-3" controlId="SignUpRepeatPassword">
              <Form.Label>Repetir Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                {...register("repeatPassword", {
                  validate: (value) =>
                    watch("password") === value ||
                    "Las contraseñas deben coincidir",
                })}
              />
              {errors.repeatPassword && (
                <span className={style.errorMessage}>
                  <i className="bi bi-exclamation-circle-fill me-1"></i>
                  {errors.repeatPassword.message}
                </span>
              )}
            </Form.Group>
          </Col>

          <Col sm={12}>
            <Form.Group className="mb-3" controlId="SignUpTermsAndConditions">
              <Form.Check
                type="checkbox"
                label="Acepto los terminos y condiciones"
                {...register("termsAndConditions", {
                  validate: (value) =>
                    value || "Debe aceptar los terminos y condiciones",
                })}
              />
              {errors.termsAndConditions && (
                <span className={style.errorMessage}>
                  <i className="bi bi-exclamation-circle-fill me-1"></i>
                  {errors.termsAndConditions.message}
                </span>
              )}
            </Form.Group>
          </Col>

          <Col sm={12} className="d-flex justify-content-center">
            <Button variant="primary" type="submit" className="w-75 ">
              Registrarse
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default FormC;
