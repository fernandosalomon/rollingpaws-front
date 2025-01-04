import { useEffect, useState } from "react";
import style from "../styles/UserProfilePage.module.css";
import FormC from "../components/shared/FormC";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import clientAxios from "../helpers/clientAxios";
import PetCard from "../components/PetCard";
import Container from "react-bootstrap/Container";
import CustomTable from "../components/shared/CustomTable";
import { Spinner, Table } from "react-bootstrap";
import CustomSpinner from "../components/shared/CustomSpinner";
import CustomButton from "../components/shared/CustomButton";

const MyPetsView = () => {
  const [showNewPetModal, setShowNewPetModal] = useState(false);
  const [petList, setPetList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const handleCloseNewPetModal = () => setShowNewPetModal(false);
  const handleShowNewPetModal = () => setShowNewPetModal(true);

  const handleRefreshPetList = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const getUserPets = async () => {
        setIsLoading(true);
        const pets = await clientAxios.get("/pet/user", {
          headers: {
            authtoken: token,
          },
        });
        setPetList(pets.data);
        setIsLoading(false);
      };

      getUserPets();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const getUserPets = async () => {
      setIsLoading(true);
      const pets = await clientAxios.get("/pet/user", {
        headers: {
          authtoken: token,
        },
      });
      setPetList(pets.data);
      setIsLoading(false);
    };

    getUserPets();
  }, []);
  if (isLoading) {
    <div className="h-100 w-100 d-flex justify-content-center align-items-center">
      <CustomSpinner />
    </div>
  } else {
    return (
      <>
        <div className={style.viewHeader}>
          <h2 className={style.viewHeaderLabel}>Mis mascotas</h2>
          <p className={style.viewSubHeaderLabel}>
            Agrega toda a tus mascotas así puedas pedir turnos con nuestros
            profesionales.
          </p>
        </div>
        <div className={`${style.viewBody} ms-2 me-0 me-md-5 `}>
          <div className="w-100">
            <button
              className={`${style.addNewPetButton} d-flex gap-2 align-items-center mx-auto`}
              onClick={handleShowNewPetModal}
            >
              <p className="fs-1 m-0">+</p>
              <p className="m-0">Agregar mascota</p>
            </button>
          </div>
          <div className={style.petCardsContainer}>
            {petList.map((pet) => (
              <PetCard
                key={pet.name}
                title={pet.name}
                imageURL={pet.image}
                petData={pet}
                handleRefresh={handleRefreshPetList}
              />
            ))}
          </div>
        </div>
        <Modal show={showNewPetModal} onHide={handleCloseNewPetModal}>
          <Modal.Header closeButton>
            <Modal.Title className="fs-2 ">Agregar mascota</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormC
              variant="new-pet"
              handleCloseModal={handleCloseNewPetModal}
              handleRefresh={handleRefreshPetList}
            />
          </Modal.Body>
        </Modal>
      </>
    );
  }
};

const UserView = () => {
  return (
    <>
      <div className={style.viewHeader}>
        <h2 className={style.viewHeaderLabel}>Información del usuario</h2>
        <p className={style.viewSubHeaderLabel}>
          Completa todos tus datos para que nuestros profesionales puedan estar
          en contacto contigo. Puedes cambiar la información en cualquier
          momento.
        </p>
      </div>
      <div className={`${style.viewBody} ms-2 me-0 me-md-5 `}>
        <FormC variant="user-profile" />
      </div>
    </>
  );
};

const NewAppointmentModal = ({ show, handleClose, handleUpdateData }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-modal="true"
        closeAfterTransition={false}
      >
        <Modal.Header className={style.modalHeader}>
          <button className="btn-close" onClick={handleClose}></button>
        </Modal.Header>
        <Modal.Body className={style.modalBody}>
          <FormC variant="new-appointment" handleCloseModal={handleClose} handleUpdate={handleUpdateData} />
        </Modal.Body>
      </Modal>
    </>
  );
};

const UserAppointments = () => {
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const handleShowNewAppointment = () => setShowNewAppointment(true);
  const handleCloseNewAppointment = () => setShowNewAppointment(false);

  useEffect(() => {
    const getAppointments = async () => {
      setIsLoading(true);
      const token = sessionStorage.getItem("token");
      const res = await clientAxios.get("/appointments/user", {
        headers: {
          authtoken: token,
        }
      })
      setAppointments(res.data);
      setIsLoading(false);
    }

    getAppointments();
  }, [])

  const handleUpdate = async () => {
    setIsLoading(true);
    const token = sessionStorage.getItem("token");
    const res = await clientAxios.get("/appointments/user", {
      headers: {
        authtoken: token,
      }
    })
    setAppointments(res.data);
    setIsLoading(false);
  }

  const labels = [
    { name: "startDate", label: "Fecha", hidden: false },
    { name: "doctor", label: "Veterinario", hidden: false },
    { name: "pet", label: "Mascota", hidden: false },
    { name: "observations", label: "Observaciones", hidden: true },
  ];

  if (isLoading) {
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  } else {
    return (
      <>

        <div className={style.viewHeader}>
          <h2 className={style.viewHeaderLabel}>Mis Turnos</h2>
        </div>
        <div className="d-flex align-items-center justify-content-center w-100">
          <CustomButton
            className="d-flex align-items-center ms-md-auto ms-0 mt-3"
            onClick={handleShowNewAppointment}
            variant="transparent"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-calendar-event me-2"
              viewBox="0 0 16 16"
            >
              <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z" />
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
            </svg>
            <p className="m-0">Pedir Turno</p>
          </CustomButton>
        </div>
        <div className={`${style.viewBody} ms-2 me-0 me-md-5 `}>
          <CustomTable data={appointments} columns={labels} handleUpdateData={handleUpdate} variant="appointments" />
        </div>
        <NewAppointmentModal
          show={showNewAppointment}
          handleClose={handleCloseNewAppointment}
          handleUpdateData={handleUpdate}
        />
      </>
    );
  }
}

const UserProfilePage = ({ viewParam }) => {
  const [view, setView] = useState(viewParam || "user");
  const navigate = useNavigate();
  const userRole = sessionStorage.getItem("role");

  return (
    <div className={`${style.UserProfilePageContainer} d-flex gap-2`}>
      <div className={style.sideAContainer}>
        <div className={style.optionPanel}>
          <div className={style.optionListContainer}>
            <h4 className={style.optionListHeader}>Opciones</h4>
            <ul className={style.optionList}>
              <li
                className={`${style.optionListItem} ${view === "user" ? style.optionListActive : ""
                  }`}
                onClick={() => {
                  setView("user");
                  navigate("/user-profile/informacion");
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-person-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path
                    fillRule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                  />
                </svg>
                <p className="m-0 text-nowrap">Cuenta</p>
              </li>
              <li
                className={`${style.optionListItem} ${view === "security" ? style.optionListActive : ""
                  }`}
                onClick={() => {
                  setView("security");
                  navigate("/user-profile/seguridad");
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-lock-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2" />
                </svg>
                <p className="m-0 text-nowrap">Seguridad</p>
              </li>
              {
                userRole === "user" &&
                <>
                  <li
                    className={`${style.optionListItem} ${view === "pets" ? style.optionListActive : ""
                      }`}
                    onClick={() => {
                      setView("pets");
                      navigate("/user-profile/mascotas");
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 419.14 403.6">
                      <path d="m281.78 0c-0.88 0.011256-1.79 0.054519-2.69 0.125-35.82 6.1835-55.52 44.064-58.37 77.469-4.17 30.316 9.19 69.266 42.47 76.066 4.83 0.92 9.84 0.5 14.56-0.78 40.08-13.44 58.01-60.908 52.22-100.22-1.69-25.396-20.83-53.009-48.19-52.66zm-151.87 1.625c-22.28 0.5468-39.63 23.138-43.16 44.375-7.441 42.074 11.698 94.35 55.53 107.66 4.11 0.89 8.35 0.98 12.5 0.34 29.63-4.94 42.18-38.15 40.94-64.969-0.89-35.372-19.27-76.273-56-86.218-3.36-0.8909-6.63-1.2661-9.81-1.188zm248.93 119.5c-38.53 2.31-64.95 40.76-68.72 76.66-5.09 25.89 8.71 60.53 38.26 62.6 41.19-0.51 69.3-44.53 70.46-82.41 2.61-25.05-12.15-55.46-40-56.85zm-337.28 8.54c-16.394-0.14-32.517 9.68-37.874 26.34-14.293 44.58 14.408 101.04 61.624 110.41 19.706 3.37 37.018-11.76 41.908-29.97 10.35-38.95-10.915-84.17-46.908-101.85-5.863-3.29-12.334-4.88-18.75-4.93zm172.75 79.93c-32.14 0.07-64.78 16.38-85.59 40.66-22.48 28.3-40.892 61.23-48.095 96.94-8.751 25.7 11.083 55.29 38.565 55.47 33.06 0.91 61.47-21.79 94.34-23.47 27.89-4.25 52.86 10.25 77.94 19.75 21.35 9.13 50.85 5.63 61.75-17.35 8.57-23.41-4.05-48.39-14.5-69.18-21.32-33.76-44.17-69.24-79.13-90.32-14.01-8.68-29.58-12.53-45.28-12.5z" />
                    </svg>
                    <p className="m-0 text-nowrap">Mis mascotas</p>
                  </li>
                  <li className={`${style.optionListItem} ${view === "appointments" ? style.optionListActive : ""
                    }`}
                    onClick={() => {
                      setView("appointments");
                      navigate("/user-profile/turnos");
                    }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-calendar-event" viewBox="0 0 16 16">
                      <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z" />
                      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                    </svg>
                    <p className="mb-0 text-nowrap">Mis turnos</p>
                  </li>
                </>
              }
            </ul>
          </div>
        </div>
      </div>
      <div className={`${style.sideBContainer} flex-fill`}>
        {view === "user" && <UserView />}
        {view === "pets" && <MyPetsView />}
        {view === "security" &&
          (
            <Container fluid="md" className="mt-5 px-5">
              <h2 className="fs-2">Cambiar Contraseña</h2>
              <p className="fs-4 mb-4">Para cambiar su contraseña, por favor ingrese su contraseña actual y a continuación la nueva contraseña</p>
              <FormC variant="change-password" />
            </Container>
          )}
        {view === "appointments" && <UserAppointments />}
      </div>
    </div>
  );
};

export default UserProfilePage;
