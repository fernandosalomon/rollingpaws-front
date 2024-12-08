import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import style from "../../styles/FormC.module.css";
import ButtonC from "./ButtonC";
import { useEffect, useState } from "react";
import clientAxios from "../../helpers/clientAxios";
import Swal from "sweetalert2";
import Spinner from "react-bootstrap/Spinner";
import { Button, ButtonGroup } from "react-bootstrap";

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

const EditUserForm = ({ handleCloseModal, userID, handleUpdateData }) => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const res = await clientAxios.get(`user/${userID}`);
        setUserData(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

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
  }, [userData]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await clientAxios.put(`/user/${userID}`, data);
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

const EditPetForm = ({ data, handleCloseModal, handleUpdateData }) => {
  const [petSex, setPetSex] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm();

  useEffect(() => {
    setValue("name", data.name);
    setValue("specie", data.specie);
    setValue("breed", data.breed);
    setValue("sex", data.sex);
    setValue("size", data.size);
    setValue("age", data.age);
    setValue("health", data.health);
    setValue("observations", data.observations);
  }, []);

  const onSubmit = handleSubmit(async (petData) => {
    try {
      const res = await clientAxios.put(`/pet/${data._id}`, petData);
      handleUpdateData();
      handleCloseModal();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Mascota editada con exito",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      setError("root", {
        message: `Sucedio un error al tratar de editar la mascota. Error: ${error}`,
      });
    }
  });

  return (
    <Form onSubmit={onSubmit} className={style.form}>
      <h2 className={style.formTitle}>Editar Usuario</h2>

      <div className="d-flex gap-5 align-items-center mb-4">
        <div className={style.petImageInputContainer}>
          <img
            src="https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Dog-512.png"
            alt="petImage"
            className={style.petImageInput}
          />
        </div>
        <div className="d-flex flex-column gap-3">
          <button
            className={`${style.formButton} ${style.editUserButton} d-flex gap-2 align-items-center`}
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
            className={`${style.cancelButton} d-flex gap-2 align-items-center`}
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

      <Form.Group className="mb-3 w-100" controlId="petName">
        <Form.Label className={style.inputFieldLabel}>Nombre</Form.Label>
        <Form.Control
          type="text"
          className={style.inputField}
          {...register("name", {
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

      <div className="d-flex gap-2 mb-3">
        <div className="w-50">
          <h5 className={style.inputFieldLabel}>Especie</h5>
          <Form.Select
            aria-label="PetSpecie"
            className={style.inputField}
            {...register("specie")}
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
            {...register("breed")}
          />
        </div>
      </div>

      <div className="d-flex gap-2 mb-3">
        <div className="w-50">
          <h5 className={style.inputFieldLabel}>Sexo</h5>
          <ButtonGroup
            aria-label="petSex"
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
            aria-label="petSize"
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

      <div className="mb-3">
        <div className="d-flex gap-2">
          <div className="w-50">
            <h5 className={style.inputFieldLabel}>Edad</h5>
            <Form.Select
              aria-label="petAge"
              className={style.inputField}
              {...register("age")}
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
              aria-label="petHealth"
              className={style.inputField}
              {...register("health")}
            >
              <option value="1">Desconocido</option>
              <option value="2">Mala</option>
              <option value="3">Buena</option>
              <option value="4">Exelente</option>
            </Form.Select>
          </div>
        </div>
      </div>

      <Form.Group className="mb-3 w-100" controlId="petDescription">
        <Form.Label className={style.inputFieldLabel}>Descripción</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Agrega una breve descripción de tu mascota"
          style={{ height: "100px" }}
          className={style.inputField}
          {...register("observations")}
        />
      </Form.Group>

      <div className={style.editUserFormButtonContainer}>
        <button className={style.editUserButton} type="submit">
          Editar Mascota
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
  );
};

const FormC = ({
  variant,
  handleCloseModal,
  userID,
  handleUpdateData,
  data,
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
        />
      )}
      {formType === "edit-user" && (
        <EditUserForm
          handleCloseModal={handleCloseModal}
          userID={userID}
          handleUpdateData={handleUpdateData}
        />
      )}
      {formType === "edit-pet" && (
        <EditPetForm
          handleCloseModal={handleCloseModal}
          data={data}
          handleUpdateData={handleUpdateData}
        />
      )}
    </>
  );
};

export default FormC;
