import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image"
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { InputGroup } from "react-bootstrap";
import CustomCalendar from "../CustomCalendar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import clientAxios from "../../helpers/clientAxios";
import CustomButton from "./CustomButton";
import style from "../../styles/FormC.module.css";
import CustomSpinner from "./CustomSpinner";

const SignUpForm = ({ handleChangeForm, handleCloseModal }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    setIsSubmiting(true);
    const { firstName, lastName, email, password } = data;

    try {
      const res = await clientAxios.post("/user/register", data);

      handleCloseModal();
      Swal.fire({
        icon: "success",
        title: `Felicidades, te has registrado con exito`,
        text: "En breve te enviaremos un mail con más información.",
        showConfirmButton: false,
        timer: 2500,
      });
      setIsSubmiting(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: `Algo salio mal`,
        text: `${error?.response?.data}`,
        showConfirmButton: false,
        timer: 2500,
      });
      setIsLoading(false);
    }
  });

  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <h2 className={style.formTitle}>Registro</h2>
        <div className="d-flex flex-column flex-md-row align-items-center mb-3">
          <p className="m-0">¿Ya tienes una cuenta?</p>
          <span
            className={style.changeFormLink}
            onClick={() => {
              handleChangeForm("sign-in");
            }}
          >
            Accede desde aquí
          </span>
        </div>
      </div>
      <Form onSubmit={onSubmit} className={style.form}>
        <div className="d-flex gap-2 flex-column flex-md-row">
          <Form.Group className="mb-3 d-grid" controlId="SignUpFirstName">
            <Form.Label className={style.formLabel}>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa tu/s nombre/s"
              className={style.formInput}
              {...register("firstName", {
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
            {errors.firstName && (
              <span className={style.errorMessage}>
                <i className="bi bi-exclamation-circle-fill me-1"></i>
                {errors.firstName.message}
              </span>
            )}
          </Form.Group>

          <Form.Group className="mb-3 d-grid" controlId="SignUpLastName">
            <Form.Label className={style.formLabel}>Apellido</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese tu/s apellido/s"
              className={style.formInput}
              {...register("lastName", {
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
            {errors.lastName && (
              <span className={style.errorMessage}>
                <i className="bi bi-exclamation-circle-fill me-1"></i>
                {errors.lastName.message}
              </span>
            )}
          </Form.Group>
        </div>

        <Form.Group className="mb-3 d-grid" controlId="SignUpEmail">
          <Form.Label className={style.formLabel}>
            Correo Electrónico
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="email@email.com"
            className={style.formInput}
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

        <Form.Group className="mb-3 d-grid" controlId="SignUpPassword">
          <Form.Label className={style.formLabel}>Contraseña</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Crea tu contraseña"
              className={style.formInput}
              {...register("password", {
                required: {
                  value: true,
                  message: "Campo requerido",
                },
                minLength: {
                  value: 8,
                  message: "La contraseña debe contener al menos 8 caracteres",
                },
                pattern: {
                  value:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                  message:
                    "La contraseña debe contener al menos una mayuscula, una minuscula, un número y un caracter especial (@$!%*?&)",
                },
              })}
            />
            <InputGroup.Text
              className={style.passwordEye}
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  class="bi bi-eye-slash"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                  <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  class="bi bi-eye"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                </svg>
              )}
            </InputGroup.Text>
          </InputGroup>
          {errors.password && (
            <span className={style.errorMessage}>
              <i className="bi bi-exclamation-circle-fill me-1"></i>
              {errors.password.message}
            </span>
          )}
        </Form.Group>

        <Form.Group className="mb-3 d-grid" controlId="SignUpRepeatPassword">
          <Form.Label className={style.formLabel}>
            Repetir Contraseña
          </Form.Label>

          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="Confirma tu contraseña"
            className={style.formInput}
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

        <Form.Group
          className="mb-3 d-grid"
          controlId="SignUpTermsAndConditions"
        >
          <Form.Check
            type="checkbox"
            label="Acepto los terminos y condiciones"
            className={style.formCheck}
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

        <CustomButton type="submit" className={style.formSubmitButton} variant="callToAction" disabled={isSubmiting}>
          {
            isSubmiting ?
              <span className="d-flex align-items-center justify-content-center gap-2">
                <CustomSpinner size="sm" />
                <p className="mb-0">Registrando</p>
              </span>
              : "Registrarse"
          }
        </CustomButton>
      </Form>
    </>
  );
};

const SignInForm = ({
  handleChangeForm,
  handleCloseModal,
  handleNavbarRole,
}) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    setIsSubmiting(true);
    const { email, password } = data;

    try {
      const res = await clientAxios.post("/user", {
        email: email,
        password: password,
      });

      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("role", res.data.role);

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
      });
      Toast.fire({
        icon: "success",
        title: "Bienvenido de vuelta!",
      });

      handleCloseModal();
      handleNavbarRole();

      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
      setIsSubmiting(false);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: `Algo salio mal`,
        text: `Codigo ${error?.response?.status}: ${error?.response?.data}`,
        showConfirmButton: false,
        timer: 2500,
      });
      setIsSubmiting(false);
    }
  });

  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <h2 className={style.formTitle}>Iniciar Sesión</h2>
        <div className="d-flex flex-column flex-md-row align-items-center mb-3">
          <p className="m-0">¿No tienes una cuenta?</p>
          <span
            className={style.changeFormLink}
            onClick={() => {
              handleChangeForm("sign-up");
            }}
          >
            Registrate aquí
          </span>
        </div>
      </div>
      <Form onSubmit={onSubmit} className={style.form}>
        <Form.Group className="mb-3 d-grid" controlId="SignUpEmail">
          <Form.Label className={style.formLabel}>
            Correo Electrónico
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese su Email"
            className={style.formInput}
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

        <Form.Group className="mb-3 d-grid" controlId="SignInPassword">
          <Form.Label className={style.formLabel}>Contraseña</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Crea tu contraseña"
              className={style.formInput}
              {...register("password", {
                required: {
                  value: true,
                  message: "Campo requerido",
                },
              })}
            />
            <InputGroup.Text
              className={style.passwordEye}
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  class="bi bi-eye-slash"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                  <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  class="bi bi-eye"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                </svg>
              )}
            </InputGroup.Text>

          </InputGroup>
          <Link className={style.forgotPasswordLink} onClick={() => handleChangeForm("forgot-password")}>¿Olvidaste tu contraseña?</Link>
          {errors.password && (
            <span className={style.errorMessage}>
              <i className="bi bi-exclamation-circle-fill me-1"></i>
              {errors.password.message}
            </span>
          )}
        </Form.Group>

        <CustomButton type="submit" className={style.formSubmitButton} variant="callToAction" disabled={isSubmiting}>
          {
            isSubmiting ?
              <span className="d-flex align-items-center justify-content-center gap-2">
                <CustomSpinner size="sm" />
                <p className="mb-0">Iniciando sesión</p>
              </span>
              : "Iniciar sesión"
          }
        </CustomButton>
      </Form>
    </>
  );
};

const ForgotPasswordForm = ({ handleCloseModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      const res = await clientAxios.put("/user/forgot-password", data);
      setIsLoading(false);
      handleCloseModal();
      Swal.fire({
        icon: "success",
        title: `Revisa tu casilla de correo electrónico`,
        text: "Si el mail ingresado corresponde con un usuario registrado te enviaremos un mail con instrucciones para cambiar tu contraseña.",
        showConfirmButton: false,
        timer: 2500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: `Algo salio mal`,
        text: `${error?.response?.data}`,
        showConfirmButton: false,
        timer: 2500,
      });
    }
  })

  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <h2 className={`${style.formTitle} w-100 text-center`}>Recuperar Contraseña</h2>
        <p className="fs-4 text-center">Ingresa el email con el que te registrarte para que te enviemos un link para recuperar tu contraseña</p>
      </div>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3 d-grid" controlId="SignUpEmail">
          <Form.Label className={style.formLabel}>
            Correo Electrónico
          </Form.Label>
          <Form.Control
            type="text"
            className={style.formInput}
            {...register("email", {
              required: {
                value: true,
                message: "Campo requerido",
              }
            })}
          />
          {errors.email && (
            <span className={style.errorMessage}>
              <i className="bi bi-exclamation-circle-fill me-1"></i>
              {errors.email.message}
            </span>
          )}
        </Form.Group>
        <div className="w-100">
          <CustomButton variant="callToAction" type="submit" className="w-100 mx-auto d-flex gap-2 justify-content-center align-items-center" disabled={isLoading}>{isLoading ?
            <>
              <CustomSpinner />
              <p className="mb-0">Enviando email</p>
            </> : "Enviar email"}</CustomButton>
        </div>
      </Form>
    </>
  )
}

const EditUserForm = ({ handleCloseModal, userData, handleUpdateData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm();

  useEffect(() => {
    setValue("firstName", userData.firstName);
    setValue("lastName", userData.lastName);
    setValue("email", userData.email);
    setValue("phone", userData.phone);
    setValue("address", userData.address);
    setValue("city", userData.city);
    setValue("province", userData.province);
    setValue("zipCode", userData.zipCode);
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await clientAxios.put(`/user/${userData._id}`, data, {
        headers: {
          authtoken: token,
        },
      });
      handleUpdateData();
      handleCloseModal();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Usuario editado con exito",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      setError("root", {
        message: `Sucedio un error al tratar de editar al usuario. Error: ${error}`,
      });
    }
  });

  return (
    <>
      <Form onSubmit={onSubmit} className={style.form}>
        <h2 className={style.formTitle}>Editar Usuario</h2>

        <div className={style.editUserProfileImageContainer}>
          <img
            src="https://openclipart.org/download/247324/abstract-user-flat-1.svg"
            alt="User Profile Picture"
            className={style.editUserProfileImage}
          />
          <div className={style.editUserProfileImageButtons}>
            <button className={style.editUserButton}>Cambiar Imagen</button>
            <button className={style.cancelButton}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
              </svg>
              <p className="m-0 ms-2 d-inline">Eliminar Imagen</p>
            </button>
          </div>
        </div>

        <div className="d-flex flex-column flex-md-row gap-2">
          <Form.Group className="mb-3 d-grid" controlId="userFirstName">
            <Form.Label className={style.formLabelEditUser}>Nombre</Form.Label>
            <Form.Control
              type="text"
              className={style.formInputEditUser}
              {...register("firstName", {
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
                {errors.userFirstName.message}
              </span>
            )}
          </Form.Group>
          <Form.Group className="mb-3 d-grid" controlId="userLastName">
            <Form.Label className={style.formLabelEditUser}>
              Apellido
            </Form.Label>
            <Form.Control
              type="text"
              className={style.formInputEditUser}
              {...register("lastName", {
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
                  message: "Formato de apellido inválido.",
                },
              })}
            />
            {errors.username && (
              <span className={style.errorMessage}>
                <i className="bi bi-exclamation-circle-fill me-1"></i>
                {errors.userLastName.message}
              </span>
            )}
          </Form.Group>
        </div>

        <Form.Group className="mb-3 d-grid" controlId="userEmail">
          <Form.Label className={style.formLabelEditUser}>
            Correo Electrónico
          </Form.Label>
          <Form.Control
            type="text"
            className={style.formInputEditUser}
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

        <Form.Group className="mb-3 d-grid" controlId="userPhone">
          <Form.Label className={style.formLabelEditUser}>Teléfono</Form.Label>
          <Form.Control
            type="text"
            className={style.formInputEditUser}
            {...register("phone", {
              pattern: {
                value:
                  /^\+?(\d{1,3})?[-.\s]?(\d{1,4})?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
                message: "Formato de teléfono inválido.",
              },
            })}
          />
          {errors.phone && (
            <span className={style.errorMessage}>
              <i className="bi bi-exclamation-circle-fill me-1"></i>
              {errors.phone.message}
            </span>
          )}
        </Form.Group>

        <Row>
          <Col sm={12} md={6}>
            <Form.Group className="mb-3 d-grid" controlId="userAddress">
              <Form.Label className={style.formLabelEditUser}>Dirección</Form.Label>
              <Form.Control
                type="text"
                className={style.formInputEditUser}
                {...register("address", {
                  pattern: {
                    value: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s']+$/,
                    message: "Formato de dirección inválido.",
                  },
                })}
              />
              {errors.address && (
                <span className={style.errorMessage}>
                  <i className="bi bi-exclamation-circle-fill me-1"></i>
                  {errors.address.message}
                </span>
              )}
            </Form.Group>
          </Col>

          <Col sm={12} md={6}>
            <Form.Group className="mb-3 d-grid" controlId="userCity">
              <Form.Label className={style.formLabelEditUser}>Ciudad</Form.Label>
              <Form.Control
                type="text"
                className={style.formInputEditUser}
                {...register("city", {
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
                    message: "Formato de ciudad inválido.",
                  },
                })}
              />
              {errors.userCity && (
                <span className={style.errorMessage}>
                  <i className="bi bi-exclamation-circle-fill me-1"></i>
                  {errors.userCity.message}
                </span>
              )}
            </Form.Group>
          </Col>
        </Row>


        <Row>
          <Col sm={12} md={6}>
            <Form.Group className="mb-3 d-grid" controlId="userProvince">
              <Form.Label className={style.formLabelEditUser}>Provincia</Form.Label>
              <Form.Control
                type="text"
                className={style.formInputEditUser}
                {...register("province", {
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
                    message: "Formato de provincia inválido.",
                  },
                })}
              />
              {errors.userProvince && (
                <span className={style.errorMessage}>
                  <i className="bi bi-exclamation-circle-fill me-1"></i>
                  {errors.userProvince.message}
                </span>
              )}
            </Form.Group>
          </Col>
          <Col sm={12} md={6}>
            <Form.Group className="mb-3 d-grid" controlId="userZipCode">
              <Form.Label className={style.formLabelEditUser}>
                Código Postal
              </Form.Label>
              <Form.Control
                type="text"
                className={style.formInputEditUser}
                {...register("zipCode", {
                  minLength: {
                    value: 4,
                    message: "Mínimo requerido: 4 caracteres",
                  },
                  maxLength: {
                    value: 6,
                    message: "Máximo permitido: 6 caracteres",
                  },
                  pattern: {
                    value:
                      /^\d{5}(?:[-\s]\d{4})?$|^(?:[A-Z0-9]{2,4}\s*[A-Z0-9]{2,4})?$|^\d{4,6}$/,
                    message: "Formato de código postal inválido.",
                  },
                })}
              />
              {errors.userProvince && (
                <span className={style.errorMessage}>
                  <i className="bi bi-exclamation-circle-fill me-1"></i>
                  {errors.userProvince.message}
                </span>
              )}
            </Form.Group>
          </Col>
        </Row>

        <div className={style.editUserFormButtonContainer}>
          <button className={style.editUserButton} type="submit">
            Editar Usuario
          </button>
          <button
            className={style.cancelButton}
            type="button"
            onClick={handleCloseModal}
          >
            Cancelar
          </button>
        </div>
        {errors.root && (
          <span className={style.errorMessage}>{errors.root.message}</span>
        )}
      </Form>
    </>
  );
};

const UserProfileForm = () => {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const profilePicRef = useRef(null)

  useEffect(() => {
    const getUserData = async () => {
      try {
        setIsLoading(true);
        const userToken = sessionStorage.getItem("token");
        const userData = await clientAxios.get("/user/self", {
          headers: {
            authtoken: userToken,
          },
        });
        setUserData(userData.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, []);

  const handleClickChangeProfilePic = () => {
    const fileInput = document.getElementById("inputFileProfilePic");
    fileInput.click();
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const handleRefreshUserData = async () => {
    try {
      setIsLoading(true);
      const userToken = sessionStorage.getItem("token");
      const userData = await clientAxios.get("/user/self", {
        headers: {
          authtoken: userToken,
        },
      });
      setUserData(userData.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error)
    }
  }

  const profilePicWatch = watch("profilePic");

  useEffect(() => {
    setValue("email", userData.email);
    setValue("firstName", userData.firstName);
    setValue("lastName", userData.lastName);
    setValue("address", userData.address);
    setValue("city", userData.city);
    setValue("province", userData.province);
    setValue("zipCode", userData.zipCode);
    setValue("phone", userData.phone);
  }, [userData]);

  useEffect(() => {
    if (profilePicRef.current !== null && profilePicWatch?.length > 0) {
      profilePicRef.current.src = URL.createObjectURL(profilePicWatch[0]);
    }
  }, [profilePicWatch])

  const onSubmit = handleSubmit(async (data) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([key, value]) => value !== undefined)
    );

    const { profilePic, ...updatedData } = { ...filteredData };

    try {

      setIsUploading(true);
      const token = sessionStorage.getItem("token");
      const res = await clientAxios.put(`/user/${userData._id}`, updatedData, {
        headers: {
          authtoken: token,
        },
      });

      if (profilePic?.length) {
        const formData = new FormData()
        formData.append("profilePic", profilePic[0]);
        const token = sessionStorage.getItem("token");
        const imageRes = await clientAxios.post(`/user/profile-pic/${userData._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            authtoken: token,
          }
        })
      }

      handleRefreshUserData();
      setIsUploading(false);

      Swal.fire({
        icon: "success",
        title: `Datos actualizados con exito`,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 2500,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: `Hubo un error al tratar de actualizar los datos. Error: ${error}`,
        showConfirmButton: false,
        timer: 2500,
      });
      setIsUploading(false);
    }
  });

  const handleDeleteProfilePic = async (e) => {
    e.preventDefault();
    const confirm = await Swal.fire({
      title: "¿Seguro que quieres eliminar la imagen de perfil?",
      text: "Esta acción no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminarla"
    })

    if (confirm.isConfirmed) {
      try {
        const token = sessionStorage.getItem("token");
        const result = await clientAxios.put(`/user/${userData._id}`, { profilePic: "https://res.cloudinary.com/dqpq2d0es/image/upload/v1734977722/user-default-pic_y72gar.png" }, {
          headers: {
            authtoken: token,
          },
        })
        Swal.fire({
          icon: "success",
          title: `Imagen de perfil eliminada`,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 2500,
        });
        handleRefreshUserData();
      } catch (error) {
        console.log(error)
        Swal.fire({
          icon: "error",
          title: `Hubo un error al tratar de eliminar la imagen de perfil. Error: ${error}`,
          showConfirmButton: false,
          timer: 2500,
        });
      }
    }
  }


  if (isLoading) {
    return (
      <CustomSpinner />
    )
  } else {
    return (
      <>
        <Form className={style.form} onSubmit={onSubmit}>

          <div className="d-flex flex-column flex-md-row align-items-center gap-4">
            <div className={style.profileImageContainer}>
              <Image src={userData.profilePic} alt="User Profile Picture" ref={profilePicRef} />
            </div>
            <div className="d-flex flex-column align-items-center justify-content-start">
              <Form.Control
                type="file"
                placeholder="Imagen de perfil"
                hidden
                {...register("profilePic")}
                id="inputFileProfilePic"
              />
              <CustomButton variant="transparent" className={style.changeImageButton} size="lg" onClick={(e) => { e.preventDefault(); handleClickChangeProfilePic() }}>
                <span className="d-flex justify-content-center align-items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-card-image" viewBox="0 0 16 16">
                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                    <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54L1 12.5v-9a.5.5 0 0 1 .5-.5z" />
                  </svg>
                  <p className="mb-0">Cambiar Imagen</p>
                </span>
              </CustomButton>
              <CustomButton variant="remove" className={style.removeImageButtonSize} size="lg" onClick={handleDeleteProfilePic}>
                <span className="d-flex justify-content-center align-items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                  </svg>
                  <p className="mb-0">Borrar Imagen</p>
                </span>
              </CustomButton>
            </div>
          </div>

          <Form.Group controlId="userEmail">
            <Form.Label className={style.formLabel}>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              className={`${style.formInput}`}
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

          <div className="d-flex flex-column flex-md-row gap-3">
            <Form.Group controlId="userFirstName" className="flex-fill">
              <Form.Label className={style.formLabel}>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre"
                className={style.formInput}
                {...register("firstName", {
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
              {errors.firstName && (
                <span className={style.errorMessage}>
                  <i className="bi bi-exclamation-circle-fill me-1"></i>
                  {errors.firstName.message}
                </span>
              )}
            </Form.Group>
            <Form.Group controlId="userLastName" className="flex-fill">
              <Form.Label className={style.formLabel}>Apellido</Form.Label>
              <Form.Control
                type="text"
                placeholder="Apellido"
                className={style.formInput}
                {...register("lastName", {
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
              {errors.lastName && (
                <span className={style.errorMessage}>
                  <i className="bi bi-exclamation-circle-fill me-1"></i>
                  {errors.lastName.message}
                </span>
              )}
            </Form.Group>
          </div>

          <div className="d-flex flex-column flex-md-row gap-3">
            <Form.Group controlId="userAddress" className="flex-fill">
              <Form.Label className={style.formLabel}>Dirección</Form.Label>
              <Form.Control
                type="text"
                placeholder="Dirección"
                className={style.formInput}
                {...register("address", {
                  minLength: {
                    value: 2,
                    message: "Mínimo requerido: 2 caracteres",
                  },
                  maxLength: {
                    value: 40,
                    message: "Máximo permitido: 40 caracteres",
                  },
                  pattern: {
                    value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ1-9][a-zA-ZáéíóúÁÉÍÓÚñÑ'1-9 ]*$/,
                    message: "Formato de dirección inválido.",
                  },
                })}
              />
              {errors.address && (
                <span className={style.errorMessage}>
                  <i className="bi bi-exclamation-circle-fill me-1"></i>
                  {errors.address.message}
                </span>
              )}
            </Form.Group>
            <Form.Group controlId="userCity" className="flex-fill">
              <Form.Label className={style.formLabel}>Ciudad</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ciudad"
                className={style.formInput}
                {...register("city", {
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
                    message: "Formato de ciudad inválido.",
                  },
                })}
              />
              {errors.city && (
                <span className={style.errorMessage}>
                  <i className="bi bi-exclamation-circle-fill me-1"></i>
                  {errors.city.message}
                </span>
              )}
            </Form.Group>
          </div>

          <div className="d-flex flex-column flex-md-row gap-3">
            <Form.Group controlId="userProvince" className="flex-fill">
              <Form.Label className={style.formLabel}>Provincia</Form.Label>
              <Form.Control
                type="text"
                placeholder="Provincia"
                className={style.formInput}
                {...register("province", {
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
                    message: "Formato de provincia inválido.",
                  },
                })}
              />
              {errors.province && (
                <span className={style.errorMessage}>
                  <i className="bi bi-exclamation-circle-fill me-1"></i>
                  {errors.province.message}
                </span>
              )}
            </Form.Group>
            <Form.Group controlId="userZipCode">
              <Form.Label className={style.formLabel}>
                Código Postal
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Código Postal"
                className={style.formInput}
                value={userData.zipCode}
                {...register("zipCode", {
                  minLength: {
                    value: 1,
                    message: "Mínimo requerido: 1 caracteres",
                  },
                  maxLength: {
                    value: 4,
                    message: "Máximo permitido: 4 caracteres",
                  },
                  pattern: {
                    value: /^\d{4}$/,
                    message: "Formato de código postal incorrecto.",
                  },
                })}
              />
              {errors.zipCode && (
                <span className={style.errorMessage}>
                  <i className="bi bi-exclamation-circle-fill me-1"></i>
                  {errors.zipCode.message}
                </span>
              )}
            </Form.Group>
          </div>

          <Form.Group controlId="userPhone">
            <Form.Label className={style.formLabel}>Teléfono</Form.Label>
            <Form.Control
              type="text"
              placeholder="Teléfono"
              className={`${style.formInput}`}
              {...register("phone", {
                pattern: {
                  value:
                    /^\+?(\d{1,3})?[-.\s]?(\d{1,4})?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
                  message: "Formato de número de teléfono incorrecto.",
                },
              })}
            />
            {errors.phone && (
              <span className={style.errorMessage}>
                <i className="bi bi-exclamation-circle-fill me-1"></i>
                {errors.phone.message}
              </span>
            )}
          </Form.Group>

          <CustomButton
            variant="callToAction"
            type="submit"
            disabled={isUploading}
          >
            <span className="d-flex align-items-center justify-content-center">
              {isUploading && <CustomSpinner size="sm" />}
              <p className="mb-0">{isUploading ? "Guardando cambios" : "Guardar cambios"}</p>
            </span>
          </CustomButton>
        </Form>
      </>
    );
  }
};

const NewPetForm = ({ handleCloseModal, handleRefresh }) => {
  const [petSex, setPetSex] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const petImageRef = useRef(null)

  const { register, handleSubmit, watch } = useForm();

  const handleClickChangePetPic = () => {
    const fileInput = document.getElementById("inputFilePetImage");
    fileInput.click();
  }

  const profilePicWatch = watch("petImage");

  useEffect(() => {
    if (petImageRef.current !== null && profilePicWatch?.length > 0) {
      petImageRef.current.src = URL.createObjectURL(profilePicWatch[0]);
    }
  }, [profilePicWatch])

  const onSubmit = handleSubmit(async (data) => {
    setIsUploading(true);
    const petData = {
      name: data.petName,
      specie: data.petSpecie,
      breed: data.petBreed,
      sex: petSex,
      size: data.petSize,
      age: data.petAge,
      health: data.petHealth,
      observations: data.petDescription,
    };

    try {
      const token = sessionStorage.getItem("token");
      const res = await clientAxios.post("/pet/", petData, {
        headers: {
          authtoken: token,
        },
      });

      if (data.petImage[0]) {
        const formData = new FormData()
        formData.append("image", data.petImage[0]);
        const imageRes = await clientAxios.put(`/pet/image/${res.data._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            authtoken: token,
          }
        })
      }

      handleCloseModal();
      await handleRefresh();
      setIsUploading(false);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
      });
      Toast.fire({
        icon: "success",
        title: "Mascota creada con exito",
      });
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <Form
        onSubmit={onSubmit}
        className={`${style.form} d-flex flex-column gap-2`}
      >
        <div className="d-flex flex-column flex-md-row gap-4 align-items-center ">
          <div className={style.petImageInputContainer}>
            <img
              src="https://res.cloudinary.com/dqpq2d0es/image/upload/v1734985899/default-pet-image_abs6xm.png"
              alt="newPetImage"
              className={style.petImageInput}
              ref={petImageRef}
            />
          </div>
          <div className="d-flex flex-column align-items-center justify-content-start">
            <Form.Control
              type="file"
              placeholder="Imagen de mascota"
              hidden
              {...register("petImage")}
              id="inputFilePetImage"
            />
            <CustomButton variant="transparent" className={style.changeImageButton} size="lg" onClick={handleClickChangePetPic}>
              <span className="d-flex justify-content-center align-items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-card-image" viewBox="0 0 16 16">
                  <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                  <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54L1 12.5v-9a.5.5 0 0 1 .5-.5z" />
                </svg>
                <p className="mb-0">Subir una imagen</p>
              </span>
            </CustomButton>
          </div>

        </div>

        <Form.Group className="mb-3 w-100" controlId="newPetName">
          <Form.Label className={style.formLabel}>
            Nombre de tu mascota
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Agrega el nombre de tu mascota"
            className={style.formInput}
            {...register("petName", {
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
        </Form.Group>

        <div className="d-flex gap-2">
          <div className="w-50">
            <h5 className={style.formLabel}>Especie</h5>
            <Form.Select
              aria-label="PetSpecie"
              className={style.formInput}
              {...register("petSpecie")}
            >
              <option value="0">Perro</option>
              <option value="1">Gato</option>
              <option value="2">Ave</option>
              <option value="3">Roedor</option>
              <option value="4">Reptil</option>
              <option value="5">Pez</option>
              <option value="6">Anfibio</option>
            </Form.Select>
          </div>
          <div className="w-50">
            <h5 className={style.formLabel}>Raza</h5>
            <Form.Control
              aria-label="petBreed"
              className={style.formInput}
              {...register("petBreed")}
            />
          </div>
        </div>

        <div className="d-flex gap-2">
          <div className="w-50">
            <h5 className={style.formLabel}>Sexo</h5>
            <ButtonGroup
              aria-label="newPetSex"
              className={style.sexCheckButtonsContainer}
            >
              <Button
                className={`${style.sexCheckButton} ${petSex === "0" ? style.active : ""
                  }`}
                onClick={() => setPetSex("0")}
              >
                Macho
              </Button>
              <Button
                className={`${style.sexCheckButton} ${petSex === "1" ? style.active : ""
                  }`}
                onClick={() => setPetSex("1")}
              >
                Hembra
              </Button>
            </ButtonGroup>
          </div>
          <div className="w-50">
            <h5 className={style.formLabel}>Tamaño</h5>
            <Form.Select
              aria-label="newPetSize"
              className={style.formInput}
              {...register("petSize")}
            >
              <option value="1">Muy pequeño (0 - 1 Kg)</option>
              <option value="2">Pequeño (1 a 10 Kg)</option>
              <option value="3">Mediano (10 a 25 Kg)</option>
              <option value="4">Grande (25 a 50 Kg)</option>
              <option value="5">Muy Grande (más de 50 Kg)</option>
            </Form.Select>
          </div>
        </div>
        <div>
          <div className="d-flex gap-2">
            <div className="w-50">
              <h5 className={style.formLabel}>Edad</h5>
              <Form.Select
                aria-label="newPetAge"
                className={style.formInput}
                {...register("petAge")}
              >
                <option value="1">Cachorro (0 - 1 Año)</option>
                <option value="2">Joven (1 a 5 Años)</option>
                <option value="3">Adulto (5 - 10 Años)</option>
                <option value="4">Senior (Más de 10 Años)</option>
              </Form.Select>
            </div>
            <div className="w-50">
              <h5 className={style.formLabel}>Salud</h5>
              <Form.Select
                aria-label="newPetHealth"
                className={style.formInput}
                {...register("petHealth")}
              >
                <option value="1">Desconocido</option>
                <option value="2">Mala</option>
                <option value="3">Buena</option>
                <option value="4">Exelente</option>
              </Form.Select>
            </div>
          </div>
        </div>
        <Form.Group className="mb-3 w-100" controlId="newPetDescription">
          <Form.Label className={style.formLabel}>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Agrega una breve descripción de tu mascota"
            style={{ height: "100px" }}
            className={style.formInput}
            {...register("petDescription")}
          />
        </Form.Group>
        <CustomButton
          variant="callToAction"
          type="submit"
          disabled={isUploading}
        >
          <span className="d-flex align-items-center justify-content-center">
            {isUploading && <CustomSpinner size="sm" />}
            <p className="mb-0">{isUploading ? "Guardando cambios" : "Guardar cambios"}</p>
          </span>
        </CustomButton>

      </Form>
    </>
  );
};

const EditPetForm = ({ handleCloseModal, petData, handleRefresh }) => {
  const [petSex, setPetSex] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const petImageRef = useRef(null)

  const { register, handleSubmit, setValue, watch } = useForm();

  useEffect(() => {
    if (petData) {
      setPetSex(petData.sex);
      setValue("petName", petData.name);
      setValue("petSpecie", petData.specie);
      setValue("petBreed", petData.breed);
      setValue("petSize", petData.size);
      setValue("petAge", petData.age);
      setValue("petHealth", petData.health);
      setValue("petDescription", petData.observations);
    }
  }, []);

  const handleClickChangePetPic = () => {
    const fileInput = document.getElementById("inputFilePetImage");
    fileInput.click();
  }

  const profilePicWatch = watch("petImage");

  useEffect(() => {
    if (petImageRef.current !== null && profilePicWatch?.length > 0) {
      petImageRef.current.src = URL.createObjectURL(profilePicWatch[0]);
    }
  }, [profilePicWatch])

  const onSubmit = handleSubmit(async (data) => {

    setIsUploading(true);
    const petUpdatedData = {
      name: data.petName,
      specie: data.petSpecie,
      breed: data.petBreed,
      sex: petSex,
      size: data.petSize,
      age: data.petAge,
      health: data.petHealth,
      observations: data.petDescription,
    };

    try {
      const token = sessionStorage.getItem("token");
      const res = await clientAxios.put(`/pet/${petData._id}`, petUpdatedData, {
        headers: {
          authtoken: token,
        }
      });

      if (data.petImage[0]) {
        const formData = new FormData()
        formData.append("image", data.petImage[0]);
        const imageRes = await clientAxios.put(`/pet/image/${petData._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            authtoken: token,
          }
        })
      }

      handleCloseModal();
      await handleRefresh();
      setIsUploading(false);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
      });
      Toast.fire({
        icon: "success",
        title: "Mascota modificada con exito",
      });
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <Form
        onSubmit={onSubmit}
        className={`${style.form} d-flex flex-column gap-2`}
      >
        <div className="d-flex flex-column flex-md-row gap-4 align-items-center mb-2">
          <div className={style.petImageInputContainer}>
            <img
              src={petData.image || "https://res.cloudinary.com/dqpq2d0es/image/upload/v1734985899/default-pet-image_abs6xm.png"}
              alt="newPetImage"
              className={style.petImageInput}
              ref={petImageRef}
            />
          </div>
          <div className="d-flex flex-column align-items-center justify-content-start">
            <Form.Control
              type="file"
              placeholder="Imagen de mascota"
              hidden
              {...register("petImage")}
              id="inputFilePetImage"
            />
            <CustomButton variant="transparent" className={style.changeImageButton} size="lg" onClick={handleClickChangePetPic}>
              <span className="d-flex justify-content-center align-items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-card-image" viewBox="0 0 16 16">
                  <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                  <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54L1 12.5v-9a.5.5 0 0 1 .5-.5z" />
                </svg>
                <p className="mb-0">Subir una imagen</p>
              </span>
            </CustomButton>
          </div>

        </div>

        <Form.Group className="mb-3 w-100" controlId="newPetName">
          <Form.Label className={style.formLabel}>
            Nombre de tu mascota
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Agrega el nombre de tu mascota"
            className={style.formInput}
            {...register("petName", {
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
        </Form.Group>

        <div className="d-flex gap-2">
          <div className="w-50">
            <h5 className={style.formLabel}>Especie</h5>
            <Form.Select
              aria-label="PetSpecie"
              className={style.formInput}
              {...register("petSpecie")}
            >
              <option value="0">Perro</option>
              <option value="1">Gato</option>
              <option value="2">Ave</option>
              <option value="3">Roedor</option>
              <option value="4">Reptil</option>
              <option value="5">Pez</option>
              <option value="6">Anfibio</option>
            </Form.Select>
          </div>
          <div className="w-50">
            <h5 className={style.formLabel}>Raza</h5>
            <Form.Control
              aria-label="petBreed"
              className={style.formInput}
              {...register("petBreed")}
            />
          </div>
        </div>

        <div className="d-flex gap-2">
          <div className="w-50">
            <h5 className={style.formLabel}>Sexo</h5>
            <ButtonGroup
              aria-label="newPetSex"
              className={style.sexCheckButtonsContainer}
            >
              <Button
                className={`${style.sexCheckButton} ${petSex === "0" ? style.active : ""
                  }`}
                onClick={() => setPetSex("0")}
              >
                Macho
              </Button>
              <Button
                className={`${style.sexCheckButton} ${petSex === "1" ? style.active : ""
                  }`}
                onClick={() => setPetSex("1")}
              >
                Hembra
              </Button>
            </ButtonGroup>
          </div>
          <div className="w-50">
            <h5 className={style.formLabel}>Tamaño</h5>
            <Form.Select
              aria-label="newPetSize"
              className={style.formInput}
              {...register("petSize")}
            >
              <option value="1">Muy pequeño (0 - 1 Kg)</option>
              <option value="2">Pequeño (1 a 10 Kg)</option>
              <option value="3">Mediano (10 a 25 Kg)</option>
              <option value="4">Grande (25 a 50 Kg)</option>
              <option value="5">Muy Grande (más de 50 Kg)</option>
            </Form.Select>
          </div>
        </div>
        <div>
          <div className="d-flex gap-2">
            <div className="w-50">
              <h5 className={style.formLabel}>Edad</h5>
              <Form.Select
                aria-label="newPetAge"
                className={style.formInput}
                {...register("petAge")}
              >
                <option value="1">Cachorro (0 - 1 Año)</option>
                <option value="2">Joven (1 a 5 Años)</option>
                <option value="3">Adulto (5 - 10 Años)</option>
                <option value="4">Senior (Más de 10 Años)</option>
              </Form.Select>
            </div>
            <div className="w-50">
              <h5 className={style.formLabel}>Salud</h5>
              <Form.Select
                aria-label="newPetHealth"
                className={style.formInput}
                {...register("petHealth")}
              >
                <option value="1">Desconocido</option>
                <option value="2">Mala</option>
                <option value="3">Buena</option>
                <option value="4">Exelente</option>
              </Form.Select>
            </div>
          </div>
        </div>
        <Form.Group className="mb-3 w-100" controlId="newPetDescription">
          <Form.Label className={style.formLabel}>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Agrega una breve descripción de tu mascota"
            style={{ height: "100px" }}
            className={style.formInput}
            {...register("petDescription")}
          />
        </Form.Group>
        <CustomButton
          variant="callToAction"
          type="submit"
          disabled={isUploading}
        >
          <span className="d-flex align-items-center justify-content-center">
            {isUploading && <CustomSpinner size="sm" />}
            <p className="mb-0">{isUploading ? "Guardando cambios" : "Guardar cambios"}</p>
          </span>
        </CustomButton>

      </Form>
    </>
  );
};

const NewAppointmentForm = ({ handleCloseModal }) => {
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedMinute, setSelectedMinute] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [petList, setPetList] = useState([]);
  const [doctorList, setDoctorList] = useState([]);
  const [doctorFreeHours, setDoctorFreeHours] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const selectDateTimeBoxRef = useRef(null);
  const confirmAppointmentRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const handleSetDate = (year, month, date) => {
    setSelectedDay(date);
    setSelectedMonth(month);
    setSelectedYear(year);
  };

  const handleSetTime = (time) => {
    const [hour, minutes] = time.split(":");
    setSelectedHour(hour);
    setSelectedMinute(minutes);
  };

  const onSubmit = handleSubmit(async (data) => {
    const newAppointmentData = {
      startDate: new Date(
        selectedYear,
        selectedMonth,
        selectedDay,
        selectedHour,
        selectedMinute
      ),
      endDate: new Date(
        selectedYear,
        selectedMonth,
        selectedDay,
        selectedHour,
        selectedMinute + 60,
      ),
      pet: petList[data.pet]._id || null,
      doctor: doctorList[data.doctor]._id,
      observations: data.observations,
    };
    const token = sessionStorage.getItem("token");

    if (!token) {
      Swal.fire({
        title: "Oops! No sabemos como llegaste aquí",
        text: "Tienes que estar identificado para reservar una cita",
        icon: "error",
      });
      return null;
    } else {
      try {
        const token = sessionStorage.getItem("token");
        const newAppointment = await clientAxios.post(
          "/appointments",
          newAppointmentData,
          { headers: { authtoken: token } }
        );
        if (newAppointment) {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Tu cita fue reservada con exito",
            text: "Te esperamos",
            showConfirmButton: false,
            timer: 1000,
          });
          handleCloseModal();
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Tu cita no se pudo reservar",
          text: `Error: ${error.response.data}`,
          showConfirmButton: false,
          timer: 2500,
        });
      }
    }
  });

  useEffect(() => {
    const getPetList = async () => {
      setIsLoading(true);
      const token = sessionStorage.getItem("token");
      try {
        const petList = await clientAxios.get("/pet/", {
          headers: {
            authtoken: token,
          },
        });
        setPetList(petList.data)
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    const getDoctorsList = async () => {
      try {
        setIsLoading(true);
        const token = sessionStorage.getItem("token");
        const doctors = await clientAxios.get("/doctor/", {
          headers: {
            authtoken: token,
          },
        });
        setDoctorList(doctors.data)
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    getPetList();
    getDoctorsList();
  }, []);

  useEffect(() => {
    const getDoctorFreeHours = async () => {
      try {
        setIsLoading(true);
        const token = sessionStorage.getItem("token");
        const doctors = await clientAxios.get(`/doctor/clinic-hours/${selectedDoctor}&${new Date(selectedYear, selectedMonth, selectedDay)}`, {
          headers: {
            authtoken: token,
          },
        });
        setDoctorFreeHours(doctors.data)
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }

    if (selectedDoctor) {
      getDoctorFreeHours();
    }
  }, [selectedDoctor, selectedYear, selectedMonth, selectedDay])

  const petSelectWatch = watch("pet");
  const doctorSelectWatch = watch("doctor");

  useEffect(() => {
    setSelectedPet(petSelectWatch);
    setSelectedDoctor(doctorSelectWatch);
  }, [petSelectWatch, doctorSelectWatch]);


  if (isLoading) {
    return (
      <CustomSpinner />
    )
  } else {
    return (
      <>
        <h2 className={style.formTitle}>Nuevo turno</h2>
        <Form className={style.form} onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className={style.formLabel}>
              Seleccione la mascota
            </Form.Label>
            <Form.Select
              aria-label="Select Pet"
              className={style.formInput}
              {...register("pet")}
            >
              <option value="" defaultValue="" disabled hidden>Seleccione su mascota...</option>
              {petList.map((pet, index) => (
                <option value={index}>{pet.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className={style.formLabel}>
              Seleccione el veterinario
            </Form.Label>
            <Form.Select
              aria-label="Select Doctor"
              className={style.formInput}
              {...register("doctor")}
            >
              <option value="" defaultValue="" disabled hidden>Seleccione al veterinario...</option>
              {doctorList.map((doctor, index) => (
                <option value={index} onClick={() => setSelectedDoctor(doctor._id)}>{doctor.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className={style.formLabel}>
              Motivo de la visita
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              {...register("observations")}
              className={style.textArea}
            />
          </Form.Group>

          <div className={`${style.datePickerContainer}`} ref={selectDateTimeBoxRef}>
            {selectedDoctor && selectedPet &&
              <>
                <CustomCalendar
                  border
                  handleSetDate={handleSetDate}
                  allowPreviousDates={false}
                  selectedDate={new Date(selectedYear, selectedMonth, selectedDay)}
                />
                <div className={style.dateTimeSelectorContainer}>
                  <h4 className={style.timePickerHeader}>Horarios</h4>
                  <div className={style.timePickerContainer}>
                    {doctorFreeHours.map((hour) => (
                      <p
                        className={`${style.timePickerContent} ${hour === `${selectedHour}:${selectedMinute}`
                          ? style.active
                          : ""
                          }`}
                        key={hour}
                        onClick={() => {
                          handleSetTime(hour);
                        }}
                      >
                        {hour}
                      </p>
                    ))}
                  </div>
                </div>
              </>
            }

          </div>

          <div
            className={
              selectedDay &&
                selectedMonth !== null &&
                selectedYear &&
                selectedHour &&
                selectedMinute &&
                selectedPet &&
                selectedDoctor
                ? "d-block"
                : "d-none"
            }
            ref={confirmAppointmentRef}
          >
            <p className={style.newAppointmentConfirmText}>
              ¿Confirma la cita para el día
              <span className="fw-bold mx-1">
                {selectedDay}/{selectedMonth + 1}/{selectedYear}
              </span>
              a las
              <span className="fw-bold mx-1">
                {selectedHour}:{selectedMinute}
              </span>
              hs. para su mascota
              <span className="fw-bold mx-1">
                {petList[petSelectWatch]?.name}
              </span>
              con el veterinario
              <span className="fw-bold mx-1">{`${doctorList[doctorSelectWatch]?.name}`}</span>?
            </p>
            <div className="d-flex gap-2 w-100 justify-content-center">
              <button
                className={`${style.formButton} ${style.saveButton}`}
                type="submit"
              >
                Confirmar
              </button>
              <button
                className={`${style.formButton} ${style.cancelButton}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleCloseModal();
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </Form>
      </>
    );
  }
};

const EditAppointmentForm = ({
  appointmentData,
  handleCloseModal,
  handleUpdateCalendar,
  variant,
}) => {

  const [isLoading, setIsLoading] = useState(false);
  const [doctorList, setDoctorList] = useState([]);
  const [showStartDateTimeOptions, setShowStartDateTimeOptions] = useState(false)
  const [showEndDateTimeOptions, setShowEndDateTimeOptions] = useState(false)

  const [selectedStartYear, setSelectedStartYear] = useState(null);
  const [selectedStartMonth, setSelectedStartMonth] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedStartHour, setSelectedStartHour] = useState(null);
  const [selectedStartMinutes, setSelectedStartMinutes] = useState(null);

  const [selectedEndYear, setSelectedEndYear] = useState(null);
  const [selectedEndMonth, setSelectedEndMonth] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedEndHour, setSelectedEndHour] = useState(null);
  const [selectedEndMinutes, setSelectedEndMinutes] = useState(null);

  const [selectedDoctor, setSelectedDoctor] = useState(null)

  const [availableHours, setAvailableHours] = useState([])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const getDoctorsList = async () => {
      try {
        setIsLoading(true);
        const token = sessionStorage.getItem("token");
        const res = await clientAxios("/doctor/", {
          headers: {
            authtoken: token,
          },
        });
        setDoctorList(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error)
      }
    }

    getDoctorsList();


    setSelectedStartYear(new Date(appointmentData.startDate).getUTCFullYear());
    setSelectedStartMonth(new Date(appointmentData.startDate).getUTCMonth() + 1);
    setSelectedStartDate(new Date(appointmentData.startDate).getUTCDate());
    setSelectedStartHour(new Date(appointmentData.startDate).getUTCHours())
    setSelectedStartMinutes(new Date(appointmentData.startDate).getUTCMinutes())

    if (variant === "edit-appointment-admin") {
      setSelectedEndYear(new Date(appointmentData.endDate).getUTCFullYear());
      setSelectedEndMonth(new Date(appointmentData.endDate).getUTCMonth() + 1);
      setSelectedEndDate(new Date(appointmentData.endDate).getUTCDate());
      setSelectedEndHour(new Date(appointmentData.endDate).getUTCHours())
      setSelectedEndMinutes(`${new Date(appointmentData.endDate).getUTCMinutes() < 10 ? "0" : ""}${new Date(appointmentData.endDate).getUTCMinutes()}`)
    }
  }, [])

  useEffect(() => {
    const doctorID = doctorList.findIndex((doctor) => doctor._id === appointmentData.doctor);
    console.log(doctorID, appointmentData.doctor)
    setSelectedDoctor(doctorID);
    setValue("doctor", doctorID);
  }, [doctorList])

  useEffect(() => {
    const getAvailableDoctorHours = async () => {
      try {
        setIsLoading(true);
        const token = sessionStorage.getItem("token");
        const res = await clientAxios(`/doctor/clinic-hours/${doctorList[selectedDoctor]._id}&${new Date(selectedStartYear, selectedStartMonth, selectedStartDate)}`, {
          headers: {
            authtoken: token,
          },
        });
        setAvailableHours(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error)
      }
    }

    if (selectedDoctor !== undefined && selectedDoctor !== null && selectedDoctor !== -1) {
      getAvailableDoctorHours();
    }
  }, [selectedDoctor])

  const handleSetStartDate = (year, month, date) => {
    setSelectedStartYear(year);
    setSelectedStartMonth(month);
    setSelectedStartDate(date);
  }

  const handleSetEndDate = (year, month, date) => {
    setSelectedEndYear(year);
    setSelectedEndMonth(month);
    setSelectedEndDate(date);
  }

  const handleSetStartTime = (hour, minutes) => {
    setSelectedStartHour(hour);
    setSelectedStartMinutes(minutes);
  }

  const handleSetEndTime = (hour, minutes) => {
    setSelectedEndHour(hour);
    setSelectedEndMinutes(minutes);
  }

  useEffect(() => {

    setValue("startDate", `${selectedStartDate}/${selectedStartMonth}/${selectedStartYear}`);
    setValue("startTime", `${selectedStartHour}:${selectedStartMinutes}`);
    variant === "edit-appointment-admin" && setValue("endDate", `${selectedEndDate}/${selectedEndMonth}/${selectedEndYear}`);
    variant === "edit-appointment-admin" && setValue("endTime", `${selectedEndHour}:${selectedEndMinutes}`);
    setValue("observations", appointmentData.observations);

  }, [selectedStartDate, selectedStartMonth, selectedStartYear, selectedStartHour, selectedStartMinutes, selectedEndDate, selectedEndMonth, selectedEndYear, selectedEndHour, selectedEndMinutes])

  const onSubmit = handleSubmit(async (data) => {

    const startDate = new Date(
      selectedStartYear,
      selectedStartMonth,
      selectedStartDate,
      selectedStartHour,
      selectedStartMinutes
    );

    let endDate = null;

    if (variant === "edit-appointment-admin") {
      endDate = new Date(
        selectedEndYear,
        selectedEndMonth,
        selectedEndDate,
        selectedEndHour,
        selectedEndMinutes
      );
    } else {
      endDate = new Date(
        selectedStartYear,
        selectedStartMonth,
        selectedStartDate,
        selectedStartHour,
        selectedStartMinutes + 60,
      );
    }

    const updatedAppointmentData = {
      startDate: startDate,
      endDate: endDate,
      doctor: doctorList[selectedDoctor]._id,
      observations: data.observations,
    };

    try {
      const token = sessionStorage.getItem("token");
      const updatedAppointment = await clientAxios.put(
        `/appointments/${appointmentData._id}`,
        updatedAppointmentData, {
        headers: {
          authtoken: token,
        },
      }
      );
      if (updatedAppointment) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "La cita fue modificada con exito",
          showConfirmButton: false,
          timer: 1000,
        });
        handleCloseModal();
        handleUpdateCalendar();
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "La cita no pudo ser modificada",
        text: `Error: ${error.response.data}`,
        showConfirmButton: false,
        timer: 2500,
      });
    }

  })

  if (isLoading) {
    return (
      <CustomSpinner />
    )
  } else {
    return (
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="doctorSelect" onFocus={() => { setShowStartDateTimeOptions(false); setShowEndDateTimeOptions(false); }}>
          <Form.Label className={style.formLabel}>Veterinario</Form.Label>
          <Form.Select aria-label="doctorSelect" className={style.formInput} {...register("doctor")} >
            <option value="" defaultValue="" disabled hidden>Seleccione al veterinario...</option>
            {
              doctorList.map((doctor, index) =>
                <option value={index} onClick={() => setSelectedDoctor(index)}>{`${doctor.name}`}</option>
              )
            }
          </Form.Select>
        </Form.Group>


        <Form.Group className="mb-3" controlId="StartDateTimeSelect" onFocus={() => { setShowStartDateTimeOptions(true); setShowEndDateTimeOptions(false); }}>
          <Form.Label className={style.formLabel}>Inicio</Form.Label>
          <div className="d-flex gap-2">
            <InputGroup className="mb-3">
              <InputGroup.Text id="startDate">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar-event" viewBox="0 0 16 16">
                  <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z" />
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                </svg>
              </InputGroup.Text>
              <Form.Control
                className={style.formInput}
                aria-label="startDate"
                aria-describedby="startDate"
                {...register("startDate")}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="startTime">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock-fill" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                </svg>
              </InputGroup.Text>
              <Form.Control
                className={style.formInput}
                aria-label="startTime"
                aria-describedby="startTime"
                {...register("startTime")}
              />
            </InputGroup>
          </div>
          {showStartDateTimeOptions && (
            <div className="mt-4 d-flex justify-content-center">
              <CustomCalendar
                border
                selectedDate={
                  new Date(selectedStartYear, selectedStartMonth, selectedStartDate)
                }
                handleSetDate={handleSetStartDate}
              />
              <div className={style.timePickerContainer}>
                {availableHours.map((hour) => (
                  <p
                    className={`${style.timePickerContent} ${hour === `${selectedStartHour}:${selectedStartMinutes}`
                      ? style.active
                      : ""
                      }`}
                    key={hour}
                    onClick={() => {
                      handleSetStartTime(hour.split(":")[0], hour.split(":")[1]);
                    }}
                  >
                    {hour}
                  </p>
                ))}
              </div>
            </div>
          )}
        </Form.Group >

        {
          variant === "edit-appointment-admin" &&
          <Form.Group className="mb-3" controlId="EndDateTimeSelect" onFocus={() => { setShowEndDateTimeOptions(true); setShowStartDateTimeOptions(false) }} >
            <Form.Label className={style.formLabel}>Fin</Form.Label>
            <div className="d-flex gap-2">
              <InputGroup className="mb-3">
                <InputGroup.Text id="EndDate">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar-event" viewBox="0 0 16 16">
                    <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z" />
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                  </svg>
                </InputGroup.Text>
                <Form.Control
                  className={style.formInput}
                  aria-label="EndDate"
                  aria-describedby="EndDate"
                  {...register("endDate")}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="EndTime">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                  </svg>
                </InputGroup.Text>
                <Form.Control
                  className={style.formInput}
                  aria-label="EndTime"
                  aria-describedby="EndTime"
                  {...register("endTime")}
                />
              </InputGroup>
            </div>
            {showEndDateTimeOptions && (
              <div className="mt-4 d-flex justify-content-center">
                <CustomCalendar
                  border
                  selectedDate={
                    new Date(selectedEndYear, selectedEndMonth, selectedEndDate)
                  }
                  handleSetDate={handleSetEndDate}
                />
                <div className={style.timePickerContainer}>
                  {availableHours.map((hour) => (
                    <p
                      className={`${style.timePickerContent} ${hour === `${selectedEndHour}:${selectedEndMinutes}`
                        ? style.active
                        : ""
                        }`}
                      key={hour}
                      onClick={() => {
                        handleSetEndTime(hour.split(":")[0], hour.split(":")[1]);
                      }}
                    >
                      {hour}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </Form.Group >
        }

        <Form.Group className="mb-3" controlId="observations" onFocus={() => { setShowStartDateTimeOptions(false); setShowEndDateTimeOptions(false); }}>
          <Form.Label>Observaciones</Form.Label>
          <Form.Control as="textarea" rows={3} className={style.textArea} {...register("observations")} />
        </Form.Group>

        <div className="w-100 mx-auto">
          <CustomButton variant="callToAction" size="lg" className="w-100 mx-auto" type="submit">Guardar datos</CustomButton>
        </div>
      </Form >
    )
  }

};

const ContactUsForm = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const result = await clientAxios.post("/messages/", { ...data, type: "contact" })

      if (result.status === 201) {
        Swal.fire({
          icon: "success",
          title: `Tu mensaje fue enviado con exito`,
          text: `En breve nos pondremos en contacto contigo`,
          showConfirmButton: false,
          timer: 2500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: `Algo salio mal`,
          text: `Codigo ${result.status}: ${result.message}`,
          showConfirmButton: false,
          timer: 2500,
        });
      }

    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: "error",
        title: `Algo salio mal`,
        text: `Codigo ${error?.response?.status}: ${error?.response?.data}`,
        showConfirmButton: false,
        timer: 2500,
      });
    }
  })

  return (
    <Form onSubmit={onSubmit}>
      <Row>
        <Col sm={12} md={6}>
          <Form.Group className="mb-3" controlId="contactUsName">
            <Form.Label className={style.formLabel}>Nombre</Form.Label>
            <Form.Control type="text" placeholder="Ingresa tu nombre" className={style.formInput} {...register("contactName", {
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
            })} />
            {errors.contactName && (
              <span className={style.errorMessage}>
                <i className="bi bi-exclamation-circle-fill me-1"></i>
                {errors.contactName.message}
              </span>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="contactUsEmail">
            <Form.Label className={style.formLabel}>Email</Form.Label>
            <Form.Control type="email" placeholder="Ingresa tu email" className={style.formInput} {...register("contactEmail", {
              required: {
                value: true,
                message: "Campo requerido",
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/,
                message: "Formato de email inválido.",
              },
            })} />
            {errors.contactEmail && (
              <span className={style.errorMessage}>
                <i className="bi bi-exclamation-circle-fill me-1"></i>
                {errors.contactEmail.message}
              </span>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="contactUsPhone">
            <Form.Label className={style.formLabel}>Teléfono</Form.Label>
            <Form.Control type="text" placeholder="Ingresa tu número de teléfono" className={style.formInput} {...register("contactPhone", {
              pattern: {
                value:
                  /^\+?(\d{1,3})?[-.\s]?(\d{1,4})?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
                message: "Formato de número de teléfono incorrecto.",
              },
            })} />
            {errors.contactPhone && (
              <span className={style.errorMessage}>
                <i className="bi bi-exclamation-circle-fill me-1"></i>
                {errors.contactPhone.message}
              </span>
            )}
          </Form.Group>
        </Col>
        <Col sm={12} md={6}>
          <Form.Group className="mb-3 w-100" controlId="contactUsMessage">
            <Form.Label className={style.formLabel}>Mensaje</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Dejanos un mensaje"
              style={{ height: "210px", resize: "none", padding: "1rem" }}
              className={style.formInput}
              {...register("contactMessage", {
                required: {
                  value: true,
                  message: "Campo obligatorio."
                },
                min: 1,
                max: {
                  value: 200,
                  message: "El mensaje no puede contener más de 200 caracteres."
                },
                pattern: {
                  value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ'0-9\s/$\-_.,()]+$/,
                  message: "El mensaje contiene caracteres no válidos.",
                }
              })}
            />
            {errors.contactMessage && (
              <span className={style.errorMessage}>
                <i className="bi bi-exclamation-circle-fill me-1"></i>
                {errors.contactMessage.message}
              </span>
            )}
          </Form.Group>
        </Col>
        <Col sm={12} className="d-flex justify-content-center">
          <CustomButton variant="callToAction" className="w-100 mt-5" type="submit">Enviar mensaje</CustomButton>
        </Col>
      </Row>
    </Form>
  );
}

const PlansInformationForm = () => {
  const [selectedPlan, SetSelectedPlan] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {

    const messageData = {
      type: "plans",
      ...data,
      selectedPlan: selectedPlan,
    }

    try {
      const result = await clientAxios.post("/messages/", messageData)

      if (result.status === 201) {
        Swal.fire({
          icon: "success",
          title: `Tu mensaje fue enviado con exito`,
          text: `En breve nos pondremos en contacto contigo`,
          showConfirmButton: false,
          timer: 2500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: `Algo salio mal`,
          text: `Codigo ${result.status}: ${result.message}`,
          showConfirmButton: false,
          timer: 2500,
        });
      }

    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: "error",
        title: `Algo salio mal`,
        text: `Codigo ${error?.response?.status}: ${error?.response?.data}`,
        showConfirmButton: false,
        timer: 2500,
      });
    }
  })

  return (
    <Form className={style.form} onSubmit={onSubmit}>
      <Row>
        <Col xs={12} md={6}>
          <Form.Group className="mb-3" controlId="PlansInformationName">
            <Form.Label className={style.formLabel}>Nombre</Form.Label>
            <Form.Control type="text" placeholder="Ingresa tu nombre" className={style.formInput} {...register("contactName", {
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
            })} />
            {errors.contactName && (
              <span className={style.errorMessage}>
                <i className="bi bi-exclamation-circle-fill me-1"></i>
                {errors.contactName.message}
              </span>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="PlansInformationEmail">
            <Form.Label className={style.formLabel}>Email</Form.Label>
            <Form.Control type="email" placeholder="Ingresa tu email" className={style.formInput} {...register("contactEmail", {
              required: {
                value: true,
                message: "Campo requerido",
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/,
                message: "Formato de email inválido.",
              },
            })} />
            {errors.contactEmail && (
              <span className={style.errorMessage}>
                <i className="bi bi-exclamation-circle-fill me-1"></i>
                {errors.contactEmail.message}
              </span>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="PlansInformationPhone">
            <Form.Label className={style.formLabel}>Teléfono</Form.Label>
            <Form.Control type="text" placeholder="Ingresa tu número de teléfono" className={style.formInput} {...register("contactPhone", {
              pattern: {
                value:
                  /^\+?(\d{1,3})?[-.\s]?(\d{1,4})?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
                message: "Formato de número de teléfono incorrecto.",
              },
            })} />
            {errors.contactPhone && (
              <span className={style.errorMessage}>
                <i className="bi bi-exclamation-circle-fill me-1"></i>
                {errors.contactPhone.message}
              </span>
            )}
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
          <Form.Group className="mb-3 w-100 " controlId="selectedPlan">
            <Form.Label className={style.formLabel}>Plan que te interesa</Form.Label>

            <div className="d-flex gap-1 flex-column">
              <Form.Check
                inline
                type="radio"
                label="Primeros Pasos"
                name="planes"
                value="primeros-pasos"
                id="radioBtnPrimerosPasos"
                className={style.formCheck}
                onClick={() => SetSelectedPlan(0)}
              />
              <Form.Check
                inline
                type="radio"
                label="Madurando"
                name="planes"
                value="madurando"
                id="radioBtnMadurando"
                className={style.formCheck}
                onClick={() => SetSelectedPlan(1)}
              />
              <Form.Check
                inline
                type="radio"
                label="Adultos"
                name="planes"
                value="adultos"
                id="radioBtnAdultos"
                className={style.formCheck}
                onClick={() => SetSelectedPlan(2)}
              />
            </div>

          </Form.Group>
          <Form.Group className="mb-3" controlId="plansInformationMessage">
            <Form.Label className={style.formLabel}>Dejanos un mensaje</Form.Label>
            <Form.Control
              as="textarea"
              style={{ height: '105px', resize: "none" }}
              name="message"
              className={`${style.formInput} p-3`}
              {...register("contactMessage", {
                min: 1,
                max: {
                  value: 200,
                  message: "El mensaje no puede contener más de 200 caracteres."
                },
                pattern: {
                  value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ'0-9\s/$\-_.,()]+$/,
                  message: "El mensaje contiene caracteres no válidos.",
                }
              })}
            />
          </Form.Group>
        </Col>
        <Col xs={12}>
          <CustomButton variant="callToAction" className="w-100 mx-auto mt-5" type="submit">Enviar mensaje</CustomButton>
        </Col>
      </Row>
    </Form>
  );
}

const ChangePasswordForm = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatNewPassword, setShowRepeatNewPassword] = useState(false);


  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    if (data.newPassword === data.repeatNewPassword) {
      try {
        const token = sessionStorage.getItem("token");
        if (token) {
          const res = await clientAxios.put("/user/change-password", { oldPassword: data.oldPassword, newPassword: data.newPassword }, {
            headers: {
              authtoken: token,
            }
          });

          Swal.fire({
            icon: "success",
            title: `La contraseña se modificó con exito`,
            showConfirmButton: false,
            timer: 2500,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: `Acceso denegado`,
            text: `Token de acceso no autorizado`,
            showConfirmButton: false,
            timer: 2500,
          });
        }
      }
      catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: `Algo salio mal`,
          text: `${error?.response?.data}`,
          showConfirmButton: false,
          timer: 2500,
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: `Las contraseñas no coinciden`,
        showConfirmButton: false,
        timer: 2500,
      });
    }


  })

  return (
    <Form onSubmit={onSubmit}>

      <Form.Group className="mb-3 d-grid" controlId="oldPassword">
        <Form.Label className={style.formLabel}>Contraseña Actual</Form.Label>
        <InputGroup>
          <Form.Control
            type={showOldPassword ? "text" : "password"}
            className={style.formInput}
            {...register("oldPassword", {
              required: {
                value: true,
                message: "Campo requerido",
              },
            })}
          />
          <InputGroup.Text
            className={style.passwordEye}
            onClick={() => {
              setShowOldPassword(!showOldPassword);
            }}
          >
            {showOldPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                class="bi bi-eye-slash"
                viewBox="0 0 16 16"
              >
                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                class="bi bi-eye"
                viewBox="0 0 16 16"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
              </svg>
            )}
          </InputGroup.Text>
        </InputGroup>
        {errors.oldPassword && (
          <span className={style.errorMessage}>
            <i className="bi bi-exclamation-circle-fill me-1"></i>
            {errors.oldPassword.message}
          </span>
        )}
      </Form.Group>

      <Form.Group className="mb-3 d-grid" controlId="newPassword">
        <Form.Label className={style.formLabel}>Nueva Contraseña</Form.Label>
        <InputGroup>
          <Form.Control
            type={showNewPassword ? "text" : "password"}
            className={style.formInput}
            {...register("newPassword", {
              required: {
                value: true,
                message: "Campo requerido",
              },
              minLength: {
                value: 8,
                message: "La contraseña debe contener al menos 8 caracteres",
              },
              pattern: {
                value:
                  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                message:
                  "La contraseña debe contener al menos una mayuscula, una minuscula, un número y un caracter especial (@$!%*?&)",
              },
            })}
          />
          <InputGroup.Text
            className={style.passwordEye}
            onClick={() => {
              setShowNewPassword(!showNewPassword);
            }}
          >
            {showNewPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                class="bi bi-eye-slash"
                viewBox="0 0 16 16"
              >
                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                class="bi bi-eye"
                viewBox="0 0 16 16"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
              </svg>
            )}
          </InputGroup.Text>
        </InputGroup>
        {errors.newPassword && (
          <span className={style.errorMessage}>
            <i className="bi bi-exclamation-circle-fill me-1"></i>
            {errors.newPassword.message}
          </span>
        )}
      </Form.Group>

      <Form.Group className="mb-3 d-grid" controlId="repeatNewPassword">
        <Form.Label className={style.formLabel}>Repetir nueva Contraseña</Form.Label>
        <InputGroup>
          <Form.Control
            type={showRepeatNewPassword ? "text" : "password"}
            className={style.formInput}
            {...register("repeatNewPassword", {
              required: {
                value: true,
                message: "Campo requerido",
              },
              validate: (value) => value === getValues("newPassword") || "Las contraseñas deben coincidir"
            })}
          />
          <InputGroup.Text
            className={style.passwordEye}
            onClick={() => {
              setShowRepeatNewPassword(!showRepeatNewPassword);
            }}
          >
            {showRepeatNewPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                class="bi bi-eye-slash"
                viewBox="0 0 16 16"
              >
                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                class="bi bi-eye"
                viewBox="0 0 16 16"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
              </svg>
            )}
          </InputGroup.Text>
        </InputGroup>
        {errors.repeatNewPassword && (
          <span className={style.errorMessage}>
            <i className="bi bi-exclamation-circle-fill me-1"></i>
            {errors.repeatNewPassword.message}
          </span>
        )}
      </Form.Group>

      <div className="w-100">
        <CustomButton variant="callToAction" type="submit" className="w-100 mx-auto">Cambiar contraseña</CustomButton>
      </div>
    </Form>
  )
}

const ChangePasswordWithTokenForm = ({ token }) => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatNewPassword, setShowRepeatNewPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    if (data.newPassword === data.repeatNewPassword) {
      try {
        if (token) {
          const res = await clientAxios.put("/user/change-password-token", { newPassword: data.newPassword }, {
            headers: {
              authtoken: token,
            }
          });

          Swal.fire({
            icon: "success",
            title: `La contraseña se modificó con exito`,
            showConfirmButton: false,
            timer: 2500,
          });
          navigate("/");
        } else {
          Swal.fire({
            icon: "error",
            title: `Acceso denegado`,
            text: `Token de acceso no autorizado`,
            showConfirmButton: false,
            timer: 2500,
          });
        }
      }
      catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: `Algo salio mal`,
          text: `${error?.response?.data}`,
          showConfirmButton: false,
          timer: 2500,
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: `Las contraseñas no coinciden`,
        showConfirmButton: false,
        timer: 2500,
      });
    }


  })

  return (
    <Form onSubmit={onSubmit}>

      <Form.Group className="mb-3 d-grid" controlId="newPassword">
        <Form.Label className={style.formLabel}>Nueva Contraseña</Form.Label>
        <InputGroup>
          <Form.Control
            type={showNewPassword ? "text" : "password"}
            className={style.formInput}
            {...register("newPassword", {
              required: {
                value: true,
                message: "Campo requerido",
              },
              minLength: {
                value: 8,
                message: "La contraseña debe contener al menos 8 caracteres",
              },
              pattern: {
                value:
                  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                message:
                  "La contraseña debe contener al menos una mayuscula, una minuscula, un número y un caracter especial (@$!%*?&)",
              },
            })}
          />
          <InputGroup.Text
            className={style.passwordEye}
            onClick={() => {
              setShowNewPassword(!showNewPassword);
            }}
          >
            {showNewPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                class="bi bi-eye-slash"
                viewBox="0 0 16 16"
              >
                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                class="bi bi-eye"
                viewBox="0 0 16 16"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
              </svg>
            )}
          </InputGroup.Text>
        </InputGroup>
        {errors.newPassword && (
          <span className={style.errorMessage}>
            <i className="bi bi-exclamation-circle-fill me-1"></i>
            {errors.newPassword.message}
          </span>
        )}
      </Form.Group>

      <Form.Group className="mb-3 d-grid" controlId="repeatNewPassword">
        <Form.Label className={style.formLabel}>Repetir contraseña</Form.Label>
        <InputGroup>
          <Form.Control
            type={showRepeatNewPassword ? "text" : "password"}
            className={style.formInput}
            {...register("repeatNewPassword", {
              required: {
                value: true,
                message: "Campo requerido",
              },
              validate: (value) => value === getValues("newPassword") || "Las contraseñas deben coincidir"
            })}
          />
          <InputGroup.Text
            className={style.passwordEye}
            onClick={() => {
              setShowRepeatNewPassword(!showRepeatNewPassword);
            }}
          >
            {showRepeatNewPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                class="bi bi-eye-slash"
                viewBox="0 0 16 16"
              >
                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                class="bi bi-eye"
                viewBox="0 0 16 16"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
              </svg>
            )}
          </InputGroup.Text>
        </InputGroup>
        {errors.repeatNewPassword && (
          <span className={style.errorMessage}>
            <i className="bi bi-exclamation-circle-fill me-1"></i>
            {errors.repeatNewPassword.message}
          </span>
        )}
      </Form.Group>

      <div className="w-100">
        <CustomButton variant="callToAction" type="submit" className="w-100 mx-auto">Cambiar contraseña</CustomButton>
      </div>
    </Form>
  )
}

const EditServiceForm = ({ serviceData, handleCloseModal, handleUpdateData }) => {
  const serviceImageRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  useEffect(() => {
    setValue("serviceName", serviceData.name);
    setValue("serviceDescription", serviceData.description)
  }, [])

  const handleClickChangeServicePic = () => {
    const fileInput = document.getElementById("inputFileServiceImage");
    fileInput.click();
  }

  const serviceImageWatch = watch("serviceImage");

  useEffect(() => {
    if (serviceImageRef.current !== null && serviceImageWatch?.length > 0) {
      serviceImageRef.current.src = URL.createObjectURL(serviceImageWatch[0]);
    }
  }, [serviceImageWatch])

  const onSubmit = handleSubmit(async (data) => {
    setIsUploading(true);
    if (data.serviceImage[0]) {
      const formData = new FormData()
      formData.append("image", data.serviceImage[0]);
      try {
        const res = await clientAxios.put(`/services/image/${serviceData._id}`, formData)
      } catch (error) {
        console.log(error)
        Swal.fire({
          icon: "error",
          title: `Algo salio mal`,
          text: `${error?.response?.data}`,
          showConfirmButton: false,
          timer: 2500,
        });
      }
    }

    try {
      const res = await clientAxios.put(`/services/${serviceData._id}`, { name: data.serviceName, description: data.serviceDescription })
      handleCloseModal();
      handleUpdateData();
      setIsUploading(false);
      Swal.fire({
        icon: "success",
        title: `La información del servicio se actualizó con exito`,
        showConfirmButton: false,
        timer: 2500,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: `Algo salio mal`,
        text: `${error?.response?.data}`,
        showConfirmButton: false,
        timer: 2500,
      });
    }

  })

  return (
    <Form onSubmit={onSubmit}>
      <div className="d-flex gap-5 align-items-center">
        <div className={style.serviceImageInputContainer}>
          <img
            src={serviceData.image || "https://res.cloudinary.com/dqpq2d0es/image/upload/v1734985899/default-pet-image_abs6xm.png"}
            alt="serviceImage"
            className={style.serviceImageInput}
            ref={serviceImageRef}
          />
        </div>
        <div className="d-flex flex-column align-items-center justify-content-start">
          <Form.Control
            type="file"
            placeholder="Imagen del servicio"
            hidden
            {...register("serviceImage")}
            id="inputFileServiceImage"
          />
          <CustomButton variant="transparent" className={style.changeImageButton} size="lg" onClick={handleClickChangeServicePic}>
            <span className="d-flex justify-content-center align-items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-card-image" viewBox="0 0 16 16">
                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54L1 12.5v-9a.5.5 0 0 1 .5-.5z" />
              </svg>
              <p className="mb-0">Subir una imagen</p>
            </span>
          </CustomButton>
        </div>

      </div>

      <Form.Group className="mb-3 w-100" controlId="editServiceName">
        <Form.Label className={style.formLabel}>
          Nombre
        </Form.Label>
        <Form.Control
          type="text"
          className={style.formInput}
          {...register("serviceName", {
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
      </Form.Group>

      <Form.Group className="mb-3 w-100" controlId="editServiceDescription">
        <Form.Label className={style.formLabel}>Descripción</Form.Label>
        <Form.Control
          as="textarea"
          style={{ height: "100px" }}
          className={style.formInput}
          {...register("serviceDescription")}
        />
      </Form.Group>

      <div className="w-100">
        <CustomButton variant="callToAction" type="submit" className="w-100 mx-auto" disabled={isUploading}>{isUploading ?
          <div className="d-flex gap-2 justify-content-center align-items-center">
            <CustomSpinner />
            <p className="mb-0">Actualizando servicio</p>
          </div>
          : "Actualizar servicio"}</CustomButton>
      </div>
    </Form>
  )
}

const NewServiceForm = ({ handleCloseModal, handleUpdateData }) => {
  const serviceImageRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();


  const handleClickChangeServicePic = () => {
    const fileInput = document.getElementById("inputFileServiceImage");
    fileInput.click();
  }

  const serviceImageWatch = watch("serviceImage");

  useEffect(() => {
    if (serviceImageRef.current !== null && serviceImageWatch?.length > 0) {
      serviceImageRef.current.src = URL.createObjectURL(serviceImageWatch[0]);
    }
  }, [serviceImageWatch])

  const onSubmit = handleSubmit(async (data) => {


    try {
      setIsUploading(true);
      const newService = await clientAxios.post(`/services/`, { name: data.serviceName, description: data.serviceDescription })

      if (data.serviceImage[0]) {
        const formData = new FormData()
        formData.append("image", data.serviceImage[0]);
        try {
          const newServiceImage = await clientAxios.put(`/services/image/${newService.data.data._id}`, formData)
        } catch (error) {
          console.log(error)
          Swal.fire({
            icon: "error",
            title: `Algo salio mal`,
            text: `${error?.response?.data}`,
            showConfirmButton: false,
            timer: 2500,
          });
        }
      }

      handleCloseModal();
      handleUpdateData();
      setIsUploading(false);
      Swal.fire({
        icon: "success",
        title: `La información del servicio se actualizó con exito`,
        showConfirmButton: false,
        timer: 2500,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: `Algo salio mal`,
        text: `${error?.response?.data}`,
        showConfirmButton: false,
        timer: 2500,
      });
    }

  })

  return (
    <Form onSubmit={onSubmit}>
      <div className="d-flex gap-5 align-items-center">
        <div className={style.serviceImageInputContainer}>
          <img
            src="https://res.cloudinary.com/dqpq2d0es/image/upload/v1735503761/add-image-default-icon_bqjkwv.png"
            alt="serviceImage"
            className={style.serviceImageInput}
            ref={serviceImageRef}
          />
        </div>
        <div className="d-flex flex-column align-items-center justify-content-start">
          <Form.Control
            type="file"
            placeholder="Imagen del servicio"
            hidden
            {...register("serviceImage")}
            id="inputFileServiceImage"
          />
          <CustomButton variant="transparent" className={style.changeImageButton} size="lg" onClick={handleClickChangeServicePic}>
            <span className="d-flex justify-content-center align-items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-card-image" viewBox="0 0 16 16">
                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54L1 12.5v-9a.5.5 0 0 1 .5-.5z" />
              </svg>
              <p className="mb-0">Subir una imagen</p>
            </span>
          </CustomButton>
        </div>

      </div>

      <Form.Group className="mb-3 w-100" controlId="editServiceName">
        <Form.Label className={style.formLabel}>
          Nombre
        </Form.Label>
        <Form.Control
          type="text"
          className={style.formInput}
          placeholder="Agrega el nombre del servicio..."
          {...register("serviceName", {
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
      </Form.Group>

      <Form.Group className="mb-3 w-100" controlId="editServiceDescription">
        <Form.Label className={style.formLabel}>Descripción</Form.Label>
        <Form.Control
          as="textarea"
          style={{ height: "100px" }}
          placeholder="Agrega una breve descripción del servicio..."
          className={style.formInput}
          {...register("serviceDescription")}
        />
      </Form.Group>

      <div className="w-100">
        <CustomButton variant="callToAction" type="submit" className="w-100 mx-auto" disabled={isUploading}>{isUploading ?
          <div className="d-flex gap-2">
            <CustomSpinner />
            <p className="mb-0">Creando servicio</p>
          </div>
          : "Crear servicio"}</CustomButton>
      </div>
    </Form>
  )
}

const FormC = ({
  variant,
  handleCloseModal,
  handleNavbarRole,
  data,
  handleRefresh,
  handleUpdate,
}) => {
  const [formType, setFormType] = useState(variant);

  const handleChangeForm = (form) => {
    setFormType(form);
  };

  return (
    <>
      {formType === "sign-up" && (
        <SignUpForm
          handleChangeForm={handleChangeForm}
          handleCloseModal={handleCloseModal}
        />
      )}
      {formType === "sign-in" && (
        <SignInForm
          handleChangeForm={handleChangeForm}
          handleCloseModal={handleCloseModal}
          handleNavbarRole={handleNavbarRole}
        />
      )}
      {
        formType === "forgot-password" && (
          <ForgotPasswordForm handleCloseModal={handleCloseModal} />
        )
      }
      {formType === "new-pet" && (
        <NewPetForm
          handleCloseModal={handleCloseModal}
          handleRefresh={handleRefresh}
        />
      )}
      {formType === "edit-pet" && (
        <EditPetForm
          handleCloseModal={handleCloseModal}
          petData={data}
          handleRefresh={handleRefresh}
        />
      )}
      {formType === "user-profile" && (
        <UserProfileForm />
      )}
      {formType === "contact-us" && (
        <ContactUsForm />
      )}
      {formType === "plans-information" && (
        <PlansInformationForm />
      )}
      {formType === "edit-user" && (
        <EditUserForm
          handleCloseModal={handleCloseModal}
          userData={data}
          handleUpdateData={handleUpdate}
        />
      )}
      {formType === "new-appointment" && (
        <>
          <NewAppointmentForm handleCloseModal={handleCloseModal} />
        </>
      )}
      {(formType === "edit-appointment-user" || formType === "edit-appointment-admin") && (
        <>
          <EditAppointmentForm
            appointmentData={data}
            handleCloseModal={handleCloseModal}
            handleUpdateCalendar={handleUpdate}
            variant={formType}
          />
        </>
      )}
      {
        formType === "change-password" && (
          <ChangePasswordForm />
        )
      }
      {
        formType === "change-password-token" && (
          <ChangePasswordWithTokenForm token={data} />
        )
      }
      {
        formType === "edit-services" && (
          <EditServiceForm serviceData={data} handleCloseModal={handleCloseModal} handleUpdateData={handleUpdate} />
        )
      }
      {
        formType === "new-service" && (
          <NewServiceForm handleCloseModal={handleCloseModal} handleUpdateData={handleUpdate} />
        )
      }
    </>
  );
};

export default FormC;
