import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import style from "../../styles/FormC.module.css";
import ButtonC from "./ButtonC";
import { useEffect, useState } from "react";
import clientAxios from "../../helpers/clientAxios";
import Swal from "sweetalert2";
import Container from "react-bootstrap/Container";
import CustomCalendar from "../CustomCalendar";

const SignUpForm = ({ handleChangeForm, handleCloseModal }) => {
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
      <Form onSubmit={onSubmit} className={style.form}>
        <h2 className={style.formTitle}>Registrarse</h2>

        <Form.Group className="mb-3 d-grid" controlId="SignUpName">
          <Form.Label className={style.formLabel}>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese su Nombre"
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
            type="password"
            placeholder="Password"
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
        <Form.Text className="d-block text-center mt-3">
          ¿Ya tienes una cuenta?{" "}
          <spam
            className={style.changeFormLink}
            onClick={() => {
              handleChangeForm("sign-in");
            }}
          >
            Accede desde aquí
          </spam>
        </Form.Text>
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

const SignInForm = ({ handleChangeForm }) => {
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
      <Form onSubmit={onSubmit} className={style.form}>
        <h2 className={style.formTitle}>Iniciar Sesión</h2>

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
        <Form.Text className="d-block text-center mt-3">
          ¿No tienes una cuenta?
          <spam
            className={style.changeFormLink}
            onClick={() => {
              handleChangeForm("sign-up");
            }}
          >
            Registrate aquí
          </spam>
        </Form.Text>
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

const GetAppointmentForm = () => {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [hour, setHour] = useState("");
  const [minutes, setMinutes] = useState("");

  const doctorsList = ["Dra. Jane Doe", "Dr. Jonh Doe", "Dra. Alice Pan"];
  const petList = [];
  const availableHours = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
  ];

  const handleSetDate = (year, month, day) => {
    setYear(year);
    setMonth(month);
    setDay(day);
  };

  const handleSetHour = (hourString) => {
    const [hour, minutes] = hourString.split(":");
    setHour(hour);
    setMinutes(minutes);
  };

  useEffect(() => {
    const appointment = new Date(year, month, day, hour, minutes);
    console.log(appointment);
  }, [year, month, day, hour, minutes]);

  return (
    <Container>
      <Form>
        <Form.Group className="mb-3" controlId="selectDoctorInput">
          <Form.Label>Selecciona el veterinario</Form.Label>
          <Form.Select aria-label="Select Doctor">
            {doctorsList.map((doctor) => (
              <option key={doctor}>{doctor}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="selectDoctorInput">
          <Form.Label>Selecciona la mascota</Form.Label>
          <Form.Select aria-label="Select Pet">
            {petList.map((pet) => (
              <option key={pet}>{pet}</option>
            ))}
          </Form.Select>
        </Form.Group>
      </Form>
      <div className={style.datePickerContainer}>
        <CustomCalendar border={false} handleSetDate={handleSetDate} />
        <div style={{ maxHeight: "344px" }}>
          <h4 className={style.timeSelectHeader}>Horarios</h4>
          <div className={style.timeSelectContainer}>
            {availableHours.map((time) => (
              <p
                key={time}
                className={
                  time === `${hour}:${minutes}` ? style.selectedHour : ""
                }
                onClick={() => {
                  handleSetHour(time);
                }}
              >
                {time}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

const FormC = ({ variant, handleCloseModal }) => {
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
        />
      )}
      {formType === "get-appointment" && <GetAppointmentForm />}
    </>
  );
};

export default FormC;
