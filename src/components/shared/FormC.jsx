import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import style from "../../styles/FormC.module.css";
import ButtonC from "./ButtonC";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useEffect, useState } from "react";
import clientAxios from "../../helpers/clientAxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { InputGroup } from "react-bootstrap";
import CustomCalendar from "../CustomCalendar";

const SignUpForm = ({ handleChangeForm, handleCloseModal }) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const { username, email, password } = data;

    try {
      const res = await clientAxios.post("/user/register", {
        fullname: username,
        email: email,
        password: password,
      });

      handleCloseModal();
      Swal.fire({
        icon: "success",
        title: `Felicidades, te has registrado con exito`,
        text: "En breve te enviaremos un mail con más información.",
        showConfirmButton: false,
        timer: 2500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: `Algo salio mal`,
        text: `${error.response.data}`,
        showConfirmButton: false,
        timer: 2500,
      });
    }
  });

  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <h2>Registro</h2>
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
        <Form.Group className="mb-3 d-grid" controlId="SignUpName">
          <Form.Label className={style.formLabel}>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Juan Carlos"
            className={style.formInput}
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

        <ButtonC type="submit" className={style.formSubmitButton}>
          Registrarse
        </ButtonC>
      </Form>
      <div className={style.dividerBar}>
        <div></div>
        <p>O</p>
      </div>

      <button className={style.accessWithGoogleBtn} onClick={() => {}}>
        <svg
          width="30px"
          height="30px"
          viewBox="-3 0 262 262"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid"
        >
          <path
            d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
            fill="#4285F4"
          />
          <path
            d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
            fill="#34A853"
          />
          <path
            d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
            fill="#FBBC05"
          />
          <path
            d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
            fill="#EB4335"
          />
        </svg>
        <p className="m-0">Acceder con Google</p>
      </button>
    </>
  );
};

const SignInForm = ({
  handleChangeForm,
  handleCloseModal,
  handleNavbarRole,
}) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
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
    } catch (error) {
      console.log("CHAu");
      Swal.fire({
        icon: "error",
        title: `Algo salio mal`,
        text: `${error.response.data}`,
        showConfirmButton: false,
        timer: 2500,
      });
    }
  });

  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <h2>Iniciar Sesión</h2>
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

        <Form.Group className="mb-3 d-grid" controlId="SignUpPassword">
          <Form.Label className={style.formLabel}>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            className={style.formInput}
            {...register("password", {
              required: {
                value: true,
                message: "Campo requerido",
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

        <ButtonC type="submit" className={style.formSubmitButton}>
          Iniciar Sesión
        </ButtonC>
      </Form>
      <div className={style.dividerBar}>
        <div></div>
        <p>O</p>
      </div>

      <button className={style.accessWithGoogleBtn} onClick={() => {}}>
        <svg
          width="30px"
          height="30px"
          viewBox="-3 0 262 262"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid"
        >
          <path
            d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
            fill="#4285F4"
          />
          <path
            d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
            fill="#34A853"
          />
          <path
            d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
            fill="#FBBC05"
          />
          <path
            d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
            fill="#EB4335"
          />
        </svg>
        <p className="m-0">Acceder con Google</p>
      </button>
    </>
  );
};

const PetForm = ({ handleCloseModal, petData, handleRefresh }) => {
  const [petSex, setPetSex] = useState(0);
  const [petImageURL, setPetImageURL] = useState(
    "http://localhost:5173/src/assets/img/default-pet-image.png"
  );

  const { register, handleSubmit, setValue } = useForm();

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

  const onSubmit = handleSubmit(async (data) => {
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

    const token = sessionStorage.getItem("token");

    try {
      const res = await clientAxios.post("/pet/", petData, {
        headers: {
          authtoken: token,
        },
      });
      handleCloseModal();
      await handleRefresh();
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
        <div className="d-flex gap-5 align-items-center">
          <div className={style.petImageInputContainer}>
            <img
              src={petImageURL}
              alt="newPetImage"
              className={style.petImageInput}
            />
          </div>
          <div className="d-flex flex-column">
            <button
              className={`${style.formButton} d-flex gap-2 align-items-center`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-image"
                viewBox="0 0 16 16"
              >
                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z" />
              </svg>
              <p className="m-0">Cambiar Imagen</p>
            </button>
            <button
              className={`${style.formButton} ${style.removeImageButton} d-flex gap-2 align-items-center`}
            >
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
              <p className="m-0">Eliminar Imagen</p>
            </button>
          </div>
        </div>

        <Form.Group className="mb-3 w-100" controlId="newPetName">
          <Form.Label className={style.inputFieldLabel}>
            Nombre de tu mascota
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Agrega el nombre de tu mascota"
            className={style.inputField}
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
            <h5 className={style.inputFieldLabel}>Especie</h5>
            <Form.Select
              aria-label="PetSpecie"
              className={style.inputField}
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
            <h5 className={style.inputFieldLabel}>Raza</h5>
            <Form.Control
              aria-label="petBreed"
              className={style.inputField}
              {...register("petBreed")}
            />
          </div>
        </div>

        <div className="d-flex gap-2">
          <div className="w-50">
            <h5 className={style.inputFieldLabel}>Sexo</h5>
            <ButtonGroup
              aria-label="newPetSex"
              className={style.sexCheckButtonsContainer}
            >
              <Button
                className={`${style.sexCheckButton} ${
                  petSex === 0 ? style.active : ""
                }`}
                onClick={() => setPetSex(0)}
              >
                Macho
              </Button>
              <Button
                className={`${style.sexCheckButton} ${
                  petSex === 1 ? style.active : ""
                }`}
                onClick={() => setPetSex(1)}
              >
                Hembra
              </Button>
            </ButtonGroup>
          </div>
          <div className="w-50">
            <h5 className={style.inputFieldLabel}>Tamaño</h5>
            <Form.Select
              aria-label="newPetSize"
              className={style.inputField}
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
              <h5 className={style.inputFieldLabel}>Edad</h5>
              <Form.Select
                aria-label="newPetAge"
                className={style.inputField}
                {...register("petAge")}
              >
                <option value="1">Cachorro (0 - 1 Año)</option>
                <option value="2">Joven (1 a 5 Años)</option>
                <option value="3">Adulto (5 - 10 Años)</option>
                <option value="4">Senior (Más de 10 Años)</option>
              </Form.Select>
            </div>
            <div className="w-50">
              <h5 className={style.inputFieldLabel}>Salud</h5>
              <Form.Select
                aria-label="newPetHealth"
                className={style.inputField}
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
          <Form.Label className={style.inputFieldLabel}>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Agrega una breve descripción de tu mascota"
            style={{ height: "100px" }}
            className={style.inputField}
            {...register("petDescription")}
          />
        </Form.Group>
        <div className="w-100">
          <button
            type="submit"
            className={`${style.formButton} ${style.saveButton}`}
          >
            Agregar
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
      </Form>
    </>
  );
};

const UserProfileForm = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const userToken = sessionStorage.getItem("token");

    const getUserData = async () => {
      try {
        const userData = await clientAxios.get("/user/self", {
          headers: {
            authtoken: userToken,
          },
        });
        return userData.data;
      } catch (error) {
        console.log(error);
      }
    };

    (async function () {
      const user = await getUserData();
      setUserData(user);
    })();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

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

  const onSubmit = handleSubmit(async (data) => {
    const updateData = Object.fromEntries(
      Object.entries(data).filter(([key, value]) => value !== undefined)
    );
    try {
      const res = await clientAxios.put(`/user/${userData._id}`, updateData);
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
    }
  });

  return (
    <>
      <Form className={style.formContainer} onSubmit={onSubmit}>
        <Form.Group controlId="userEmail">
          <Form.Label className={style.inputFieldLabel}>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            className={`${style.inputField}`}
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
            <Form.Label className={style.inputFieldLabel}>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre"
              className={style.inputField}
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
            <Form.Label className={style.inputFieldLabel}>Apellido</Form.Label>
            <Form.Control
              type="text"
              placeholder="Apellido"
              className={style.inputField}
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
            <Form.Label className={style.inputFieldLabel}>Dirección</Form.Label>
            <Form.Control
              type="text"
              placeholder="Dirección"
              className={style.inputField}
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
            <Form.Label className={style.inputFieldLabel}>Ciudad</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ciudad"
              className={style.inputField}
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
            <Form.Label className={style.inputFieldLabel}>Provincia</Form.Label>
            <Form.Control
              type="text"
              placeholder="Provincia"
              className={style.inputField}
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
            <Form.Label className={style.inputFieldLabel}>
              Código Postal
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Código Postal"
              className={style.inputField}
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
          <Form.Label className={style.inputFieldLabel}>Teléfono</Form.Label>
          <Form.Control
            type="text"
            placeholder="Teléfono"
            className={`${style.inputField}`}
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

        <button
          type="submit"
          className={`${style.formButton} ${style.saveButton} mt-2`}
        >
          Guardar cambios
        </button>
      </Form>
    </>
  );
};

const NewAppointmentForm = () => {
  return (
    <div>
      <CustomCalendar />
    </div>
  );
};

const FormC = ({
  variant,
  handleCloseModal,
  handleNavbarRole,
  data,
  handleRefresh,
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
      {formType === "new-pet" && (
        <>
          <PetForm
            handleCloseModal={handleCloseModal}
            petData={data}
            handleRefresh={handleRefresh}
          />
        </>
      )}
      {formType === "user-profile" && (
        <>
          <UserProfileForm />
        </>
      )}

      {formType === "new-appointment" && (
        <>
          <NewAppointmentForm />
        </>
      )}
    </>
  );
};

export default FormC;
