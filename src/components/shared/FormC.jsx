import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import style from "../../styles/FormC.module.css";
import ButtonC from "./ButtonC";
import { useEffect, useState } from "react";
import clientAxios from "../../helpers/clientAxios";
import Swal from "sweetalert2";
import Spinner from "react-bootstrap/Spinner";

const EditUserForm = ({ handleCloseModal, userID, handleUpdateData }) => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function () {
      try {
        const res = await clientAxios.get(`user/${userID}`);
        setUserData(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm();

  useEffect(() => {
    setValue("username", userData.fullname);
    setValue("email", userData.email);
    setValue("phone", userData.phone);
    setValue("address", userData.address);
  }, [userData]);

  const onSubmit = handleSubmit(async (data) => {
    const { username, email, phone, address } = data;
    console.log(data);

    try {
      const res = await clientAxios.put(`/user/${userID}`, {
        fullname: username,
        email: email,
        phone: phone,
        address: address,
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

  return isLoading ? (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  ) : (
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
                class="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
              </svg>
              <p className="m-0 ms-2 d-inline">Eliminar Imagen</p>
            </button>
          </div>
        </div>

        <Form.Group className="mb-3 d-grid" controlId="userFullName">
          <Form.Label className={style.formLabelEditUser}>Nombre</Form.Label>
          <Form.Control
            type="text"
            className={style.formInputEditUser}
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

const FormC = ({ variant, handleCloseModal, userID, handleUpdateData }) => {
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
      {formType === "edit-user" && (
        <EditUserForm
          handleCloseModal={handleCloseModal}
          userID={userID}
          handleUpdateData={handleUpdateData}
        />
      )}
    </>
  );
};

export default FormC;
