import Card from "react-bootstrap/Card";
import style from "../styles/CustomCard.module.css";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import FormC from "./shared/FormC";
import clientAxios from "../helpers/clientAxios";
import Swal from "sweetalert2";
import Image from "react-bootstrap/Image"

const PetCard = ({ title, imageURL, petData, handleRefresh }) => {
  const [showEditPetModal, setShowEditPetModal] = useState(false);

  const handleCloseEditPetModal = () => setShowEditPetModal(false);
  const handleShowEditPetModal = () => setShowEditPetModal(true);

  const handleDeletePet = async (petData) => {
    try {
      const result = await Swal.fire({
        title: `¿Estas seguro que quieres eliminar a ${petData.name}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, estoy seguro",
        cancelButtonText: "No",
      });

      if (result.isConfirmed) {
        const token = sessionStorage.getItem("token");
        const res = await clientAxios.delete(`/pet/${petData._id}`, {
          headers: {
            authtoken: token,
          }
        });
        await handleRefresh();
        Swal.fire({
          title: `Se elimino a ${petData.name} de tu lista de mascotas`,
          icon: "success",
          showConfirmButton: false,
          timer: 2500,
          toast: true,
          position: "top-right",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Card className={style.cardContainer}>
        <div className={style.cardImageContainer}>
          <Image src={imageURL} alt={title} className={style.cardImage} />
        </div>
        <Card.Body className="px-0">
          <Card.Title className={style.cardTitle}>{title}</Card.Title>
          <div
            className={`${style.cardContent} d-flex gap-2 align-items-center`}
          >
            <button
              className={style.petCardButton}
              onClick={handleShowEditPetModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="bi bi-pencil-square"
                viewBox="0 0 16 16"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  fillRule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                />
              </svg>
            </button>
            <button
              className={style.petCardButton}
              onClick={() => handleDeletePet(petData)}
            >
              <div className={`${style.buttonIcon} ${style.removePetButton}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  className="bi bi-trash-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                </svg>
              </div>
            </button>
          </div>
        </Card.Body>
      </Card>
      <Modal show={showEditPetModal} onHide={handleCloseEditPetModal}>
        <Modal.Header closeButton>
          <Modal.Title className="fs-2 ">Editar Mascota</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormC
            variant="edit-pet"
            handleCloseModal={handleCloseEditPetModal}
            handleRefresh={handleRefresh}
            data={petData}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PetCard;
