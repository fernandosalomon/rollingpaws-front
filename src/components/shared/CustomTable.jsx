import Table from "react-bootstrap/Table";
import style from "../../styles/CustomTable.module.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useEffect, useRef, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import Modal from "react-bootstrap/Modal";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import FormC from "./FormC";
import clientAxios from "../../helpers/clientAxios";
import Swal from "sweetalert2";
import Card from "react-bootstrap/Card";
import {
  petAge,
  petHealth,
  petSex,
  petSize,
  petSpecie,
} from "../../helpers/petFieldsDictionary";
import Container from "react-bootstrap/Container";
import { ModalHeader } from "react-bootstrap";

const Sort = ({ data, handleData, sortBy }) => {

  const [sortDirection, setSortDirection] = useState(false);

  const newData = [...data];

  if (sortDirection) {
    newData.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) { return -1; }
      if (a[sortBy] > b[sortBy]) { return 1; }
      return 0;
    })
  } else {
    newData.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) { return 1; }
      if (a[sortBy] > b[sortBy]) { return -1; }
      return 0;
    })
  }

  const handleSortData = () => {
    handleData(newData);
    setSortDirection(!sortDirection);
  }

  return (
    < div className={style.sortButton}>
      {
        sortDirection ?
          < svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sort-down" viewBox="0 0 16 16" onClick={handleSortData}>
            <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z" />
          </svg >
          :
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sort-up" viewBox="0 0 16 16" onClick={handleSortData}>
            <path d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.5.5 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z" />
          </svg>
      }
    </div >
  )
}

const SearchBar = ({ data, filterColumns, handleData, className }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchColumnIndex, setSearchColumnIndex] = useState(0);


  const handleChange = (e) => {
    setSearchQuery(e.target.value.trim().toLowerCase());
  };


  const filterData = (data) => {

    const result = data.filter((element) => {
      if (typeof element[filterColumns[searchColumnIndex].name] === "string") {
        const value = element[filterColumns[searchColumnIndex].name].trim().toLowerCase();
        if (value) {
          return value.includes(searchQuery)
        } else {
          return [];
        }
      }
    });

    handleData(result);
  };

  useEffect(() => filterData(data), [searchQuery]);

  return (
    <Form className={`d-flex w-75 ms-auto gap-2 ${className}`}>
      <Form.Group className="mb-3" controlId="filterBySelect">
        <Form.Select
          aria-label="search bar select"
          onChange={(e) => setSearchColumnIndex(e.target.value)}
          className={style.querySelect}
        >
          {filterColumns.map((column, index) => (
            <option key={index} value={index}>
              {column.label}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <InputGroup>
        <InputGroup.Text id="searchIcon" className={style.searchIcon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </InputGroup.Text>
        <Form.Control
          placeholder="Buscar..."
          aria-label="searchFilter"
          aria-describedby="search filter"
          className={style.queryInput}
          onChange={handleChange}
        />
      </InputGroup>
    </Form>
  );
};

const CustomPagination = ({
  totalElements,
  currentPage,
  paginate,
  elementsPerPage,
  handleElementsPerPage,
}) => {
  const pageNumber = [];
  const active = currentPage;

  for (let i = 1; i <= Math.ceil(totalElements / elementsPerPage); i++) {
    pageNumber.push(i);
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalElements / elementsPerPage)) {
      paginate(currentPage + 1);
    }
  };

  const handleSetElementsPerPage = (e) => {
    handleElementsPerPage(e.target.value);
  }

  return (
    <div className="d-flex justify-content-between px-3">
      <Form.Group className="d-flex align-items-center justify-content-center gap-3">
        <Form.Label className="fs-5 text-nowrap">Elementos por página</Form.Label>
        <Form.Select aria-label="Elements per page" onChange={handleSetElementsPerPage}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </Form.Select>
      </Form.Group>
      <Pagination size="lg" className={style.paginationContainer}>
        <Pagination.First onClick={() => paginate(1)} className={style.paginationButton} />
        <Pagination.Prev onClick={handlePrevPage} className={style.paginationButton} />
        {pageNumber.map((number) => (
          <Pagination.Item
            key={number}
            active={number === active}
            onClick={() => paginate(number)}
            className={style.paginationItem}
          >
            {number}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={handleNextPage} className={style.paginationButton} />
        <Pagination.Last
          onClick={() => paginate(Math.ceil(totalElements / elementsPerPage))}
          className={style.paginationButton} />
      </Pagination>
    </div>
  );
};

const View = ({ variant, data, handleUpdateData }) => {
  const [show, setShow] = useState(false);
  const [view, setView] = useState(0);

  const availablePlans = {
    0: "Primeros Pasos",
    1: "Madurando",
    2: "Adultos"
  }

  const handleClose = () => {
    setShow(false);
    setView(0);
    variant === "messages" && handleUpdateData();
  };
  const handleShow = () => setShow(true);

  const handleReadMessage = () => {
    const readMessage = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const res = clientAxios.put(`/messages/${data._id}`, {}, {
          headers: {
            authtoken: token,
          }
        });
      } catch (error) {
        console.log(error)
      }
    }

    readMessage();
  }

  return (
    <>
      <button
        className={`${style.customTableButton} ${style.moreInfoButton}`}
        onClick={() => { handleShow(); variant === "messages" && handleReadMessage(); }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="bi bi-eye"
          viewBox="0 0 16 16"
        >
          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
        </svg>
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName={style.CRUDviewModal}
      >
        <Modal.Header closeButton className="border-0" />
        <Modal.Body>
          {variant === "user" && (
            <>
              <Nav fill variant="tabs">
                <Nav.Item>
                  <Nav.Link onClick={() => setView(0)}>Personal</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link onClick={() => setView(1)}>Mascotas</Nav.Link>
                </Nav.Item>
              </Nav>
              {view === 0 && (
                <div className="d-flex flex-column flex-md-row justify-content-center align-items-center mt-4">
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <div className="d-flex justify-content-center align-items-center rouded overflow-hidden mx-3" style={{ width: "150px", height: "150px", borderRadius: "50%" }}>
                      <Image
                        src={data.profilePic}
                        alt="User Image"
                        style={{ width: "200px" }}
                      />
                    </div>
                    <div className="mb-0">
                      {data.banned ? (
                        <p className="fw-semibold fs-2 text-danger">
                          Deshabilitado
                        </p>
                      ) : (
                        <p className="fw-semibold fs-2 text-success">
                          Habilitado
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex-fill">
                    <h3
                      className={style.userCardName}
                    >{`${data.firstName} ${data.lastName}`}</h3>
                    <p className={style.userCardRole}>
                      {data.role === "user"
                        ? "Usuario"
                        : data.role === "vet"
                          ? "Veterinario"
                          : "Administrador"}
                    </p>

                    <div className={style.horizontalBar} />
                    <Table className={style.userCardTable}>
                      <tbody>
                        <tr>
                          <td className={style.userCardLabel}>Email</td>
                          <td className={style.userCardData}>{data.email}</td>
                        </tr>
                        <tr>
                          <td className={style.userCardLabel}>Dirección</td>
                          <td className={style.userCardData}>{data.address}</td>
                        </tr>
                        <tr>
                          <td className={style.userCardLabel}>Ciudad</td>
                          <td className={style.userCardData}>{data.city}</td>
                        </tr>
                        <tr>
                          <td className={style.userCardLabel}>Provincia</td>
                          <td className={style.userCardData}>
                            {data.province}
                          </td>
                        </tr>
                        <tr>
                          <td className={style.userCardLabel}>Código Postal</td>
                          <td className={style.userCardData}>{data.zipCode}</td>
                        </tr>
                        <tr>
                          <td className={style.userCardLabel}>Teléfono</td>
                          <td className={style.userCardData}>{data.phone}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </div>
              )}
              {view === 1 && (
                <div className={style.petCardsContainer}>
                  {data.pets.length === 0 ? (
                    <h2 className="py-5">No hay mascotas para mostrar</h2>
                  ) : (
                    data.pets.map((pet) => (
                      <Card style={{ width: "18rem", height: "26rem" }} key={pet._id}>
                        <Card.Img
                          variant="top"
                          src={pet.image}
                          style={{
                            padding: "1rem",
                            minWidth: "150px",
                            minHeight: "150px",
                            margin: "0 auto",
                          }}
                        />
                        <Card.Body>
                          <Card.Title className={style.petCardTitle}>
                            {pet.name}
                          </Card.Title>
                          <Card.Text className={style.petCardContent}>
                            <CRUDButtonGroup
                              variant="pet"
                              data={pet}
                              handleUpdate={handleUpdateData}
                            />
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    ))
                  )}
                </div>
              )}
            </>
          )}
          {variant === "pet" && (
            <div className="d-flex justify-content-center align-items-center">
              <div className="d-flex justify-content-center align-items-center rouded overflow-hidden  mx-3" style={{ width: "150px", height: "150px", borderRadius: "50%" }}>
                <Image
                  src={data.image}
                  alt="User Image"
                  style={{ width: "200px" }}
                />
              </div>
              <div className="flex-fill">
                <h3 className={style.userCardName}>{data.name}</h3>
                <div className={style.horizontalBar} />
                <Table className={style.userCardTable}>
                  <tbody>
                    <tr>
                      <td className={style.userCardLabel}>Especie</td>
                      <td className={style.userCardData}>
                        {petSpecie[data.specie]}
                      </td>
                    </tr>
                    <tr>
                      <td className={style.userCardLabel}>Raza</td>
                      <td className={style.userCardData}>{data.breed}</td>
                    </tr>
                    <tr>
                      <td className={style.userCardLabel}>Sexo</td>
                      <td className={style.userCardData}>{petSex[data.sex]}</td>
                    </tr>
                    <tr>
                      <td className={style.userCardLabel}>Tamaño</td>
                      <td className={style.userCardData}>
                        {petSize[data.size]}
                      </td>
                    </tr>
                    <tr>
                      <td className={style.userCardLabel}>Edad</td>
                      <td className={style.userCardData}>{petAge[data.age]}</td>
                    </tr>
                    <tr>
                      <td className={style.userCardLabel}>Salud</td>
                      <td className={style.userCardData}>
                        {petHealth[data.health]}
                      </td>
                    </tr>
                    <tr>
                      <td className={style.userCardLabel}>Observaciones</td>
                      <td className={style.userCardData}>
                        {data.observations}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          )}
          {
            variant === "messages" && (
              <Container>
                <Table className={style.userCardTable}>
                  <tbody>
                    <tr>
                      <td className={style.userCardLabel}>Tipo</td>
                      <td className={style.userCardData}>{data.type === "contact" ? "Mensaje" : "Planes"}</td>
                    </tr>
                    {
                      data.type === "plans" &&
                      <tr>
                        <td className={style.userCardLabel}>Plan de Interes</td>
                        <td className={style.userCardData}>{availablePlans[data.selectedPlan]}</td>
                      </tr>
                    }
                    <tr>
                      <td className={style.userCardLabel}>Nombre</td>
                      <td className={style.userCardData}>{data.contactName}</td>
                    </tr>
                    <tr>
                      <td className={style.userCardLabel}>Email</td>
                      <td className={style.userCardData}>{data.contactEmail}</td>
                    </tr>
                    <tr>
                      <td className={style.userCardLabel}>Teléfono</td>
                      <td className={style.userCardData}>{data.contactPhone}</td>
                    </tr>
                    <tr>
                      <td className={style.userCardLabel}>Mensaje</td>
                      <td className={style.userCardData}>
                        {data.contactMessage}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Container>
            )
          }
          {
            variant === "appointments" && (
              <Container>
                <h2 className="fs-2 mb-3">Datos del turno</h2>
                <Table className={style.userCardTable}>
                  <tbody>
                    <tr>
                      <td className={style.userCardLabel}>Fecha</td>
                      <td className={style.userCardData}>
                        <p className="mb-0">{`${new Date(data.startDate).getUTCDate()} / ${new Date(data.startDate).getUTCMonth() + 1}/${new Date(data.startDate).getUTCFullYear()} ${new Date(data.startDate).getHours()}:${new Date(data.startDate).getMinutes()}`}</p>
                      </td>
                    </tr>
                    <tr>
                      <td className={style.userCardLabel}>Veterinario</td>
                      <td className={style.userCardData}>{data.doctor.name}</td>
                    </tr>
                    <tr>
                      <td className={style.userCardLabel}>Mascota</td>
                      <td className={style.userCardData}>{data.pet.name}</td>
                    </tr>
                    <tr>
                      <td className={style.userCardLabel}>Observaciones</td>
                      <td className={style.userCardData}>{data.observations}</td>
                    </tr>

                  </tbody>
                </Table>
              </Container>
            )
          }
          {
            variant === "services" && (
              <Container>
                <div className="w-100 d-flex justify-content-center">
                  <div className={style.serviceImageContainer}>
                    <Image src={data.image} alt={data.name} />
                  </div>
                </div>
                <Table className={style.userCardTable}>
                  <tbody>
                    <tr>
                      <td className={style.userCardLabel}>Nombre</td>
                      <td className={style.userCardData}>{data.name}</td>
                    </tr>
                    <tr>
                      <td className={style.userCardLabel}>Descripción</td>
                      <td className={`${style.userCardData} text-wrap`}>{data.description}</td>
                    </tr>
                  </tbody>
                </Table>
              </Container>
            )
          }
        </Modal.Body>
      </Modal>
    </>
  );
};

const Edit = ({ variant, data, handleUpdateData }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className={`${style.customTableButton} ${style.editButton}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="bi bi-pencil-square"
          viewBox="0 0 16 16"
          onClick={handleShow}
        >
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
          <path
            fillRule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
          />
        </svg>
      </button>
      <Modal show={show} onHide={handleClose}>
        <ModalHeader closeButton className="fs-1 border-0"></ModalHeader>
        <Modal.Body>
          {variant === "user" && (
            <FormC
              variant="edit-user"
              handleCloseModal={handleClose}
              handleUpdate={handleUpdateData}
              data={data}
            />
          )}
          {variant === "pet" && (
            <FormC
              variant="edit-pet"
              data={data}
              handleCloseModal={handleClose}
              handleUpdate={handleUpdateData}
            />
          )}
          {
            variant === "appointments" && (
              <FormC variant="edit-appointment-user" data={data} handleCloseModal={handleClose}
                handleUpdate={handleUpdateData} />
            )
          }
          {
            variant === "services" && (
              <FormC variant="edit-services" data={data} handleCloseModal={handleClose}
                handleUpdate={handleUpdateData} />
            )
          }
        </Modal.Body>
      </Modal>
    </>
  );
};

const BanUser = ({ data, handleUpdateData }) => {
  const handleBanUser = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await clientAxios.put(`/user/ban-user/${data._id}`, {}, {
        headers: {
          authtoken: token,
        }
      });
      console.log(res);
      if (res.status === 200) {
        Swal.fire({
          position: "top-end",
          title: `Usuario ${data.banned ? "habilitado" : "deshabilitado"}`,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        handleUpdateData();
      } else {
        Swal.fire({
          title: "Error",
          text: `El usuario no se pudo deshabilitar. Error: ${res.message}`,
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      }

    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `El usuario no se pudo deshabilitar. Error: ${error}`,
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <button
      className={`${style.customTableButton} ${style.banUserButton}`}
      onClick={handleBanUser}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="#000"
        className="bi bi-person-fill-slash"
        viewBox="0 0 16 16"
      >
        <path d="M13.879 10.414a2.501 2.501 0 0 0-3.465 3.465zm.707.707-3.465 3.465a2.501 2.501 0 0 0 3.465-3.465m-4.56-1.096a3.5 3.5 0 1 1 4.949 4.95 3.5 3.5 0 0 1-4.95-4.95ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
      </svg>
    </button>
  );
};

const Delete = ({ variant, data, handleUpdateData }) => {
  const handleDeleteUser = async () => {
    const result = await Swal.fire({
      title: "¿Esta seguro que desea eliminar a este usuario?",
      text: "Este cambio no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar Usuario",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const token = sessionStorage.getItem("token");
        const res = await clientAxios.delete(`/user/${data._id}`, {
          headers: {
            authtoken: token,
          }
        });
        Swal.fire({
          title: "Usuario Eliminado",
          text: "El usuario fue eliminado satisfactoriamente",
          icon: "success",
          showConfirmButton: false,
          timer: 2500,
        });
        handleUpdateData();
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Error",
          text: `El usuario no se pudo eliminar. Error: ${error.response.message}`,
          icon: "error",
        });
      }
    }
  };

  const handleDeletePet = async () => {
    const result = await Swal.fire({
      title: "¿Esta seguro que desea eliminar a esta mascota?",
      text: "Este cambio no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar mascota",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const token = sessionStorage.getItem("token");
        const res = await clientAxios.delete(`/pet/${data._id}`, {
          headers: {
            authtoken: token,
          }
        });
        Swal.fire({
          title: "Turno eliminado",
          text: "La mascota fue eliminada satisfactoriamente",
          icon: "success",
          showConfirmButton: false,
          timer: 2500
        });
        handleUpdateData();
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Error",
          text: `La mascota no se pudo eliminar. Error: ${error.response.message}`,
          icon: "error",
        });
      }
    }
  };

  const handleDeleteAppointment = async () => {
    const result = await Swal.fire({
      title: "¿Esta seguro que desea cancelar este turno?",
      text: "Este cambio no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, cancelar turno",
      cancelButtonText: "No",
    });

    if (result.isConfirmed) {
      try {
        const token = sessionStorage.getItem("token");
        const res = await clientAxios.delete(`/appointments/${data._id}`, {
          headers: {
            authtoken: token,
          }
        });
        Swal.fire({
          title: "Turno cancelado",
          text: "El turno fue cancelado satisfactoriamente",
          icon: "success",
          showConfirmButton: false,
          timer: 2500
        });
        handleUpdateData();
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Error",
          text: `El turno no se pudo cancelar. Contacte con el administrador. Error: ${error.response.message}`,
          icon: "error",
        });
      }
    }
  }

  const handleDeleteService = async () => {
    const result = await Swal.fire({
      title: "¿Esta seguro que desea eliminar este servicio?",
      text: "Este cambio no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrarlo",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const token = sessionStorage.getItem("token");
        const res = await clientAxios.delete(`/services/${data._id}`, {
          headers: {
            authtoken: token,
          }
        });
        Swal.fire({
          title: "Servicio eliminado",
          text: "El servicio fue eliminado satisfactoriamente",
          icon: "success",
          showConfirmButton: false,
          timer: 2500
        });
        handleUpdateData();
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Error",
          text: `El servicio no se pudo eliminar. Error: ${error.response.message}`,
          icon: "error",
        });
      }
    }
  };


  return (
    <button className={`${style.customTableButton} ${style.deleteButton}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="#dc3545"
        className="bi bi-trash"
        viewBox="0 0 16 16"
        onClick={
          variant === "user"
            ? handleDeleteUser
            : variant === "pet"
              ? handleDeletePet
              : variant === "appointments" ? handleDeleteAppointment :
                variant === "services" ? handleDeleteService : () => { }
        }
      >
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
      </svg>
    </button>
  );
};

const CRUDButtonGroup = ({
  variant,
  data,
  handleUpdate,
}) => {

  return (
    <>
      <div className="d-flex gap-2">
        {
          variant === "user" &&
          <>
            <View
              variant={variant}
              data={data}
              handleUpdateData={handleUpdate}
            />
            <Edit
              variant={variant}
              data={data}
              handleUpdateData={handleUpdate}
            />
            {
              data.role !== "admin" &&
              <>
                <BanUser data={data} handleUpdateData={handleUpdate} />
                <Delete
                  variant={variant}
                  data={data}
                  handleUpdateData={handleUpdate}
                />
              </>
            }
          </>
        }
        {
          variant === "pet" &&
          <>
            <View
              variant={variant}
              data={data}
              handleUpdateData={handleUpdate}
            />
            <Edit
              variant={variant}
              data={data}
              handleUpdateData={handleUpdate}
            />
            <Delete
              variant={variant}
              data={data}
              handleUpdateData={handleUpdate}
            />
          </>
        }
        {
          variant === "messages" &&
          <View
            variant={variant}
            data={data}
            handleUpdateData={handleUpdate}
          />
        }
        {
          variant === "appointments" &&
          <>
            <View
              variant={variant}
              data={data}
              handleUpdateData={handleUpdate}
            />
            <Edit
              variant={variant}
              data={data}
              handleUpdateData={handleUpdate}
            />
            <Delete
              variant={variant}
              data={data}
              handleUpdateData={handleUpdate}
            />
          </>
        }
        {
          variant === "services" &&
          <>
            <View
              variant={variant}
              data={data}
              handleUpdateData={handleUpdate}
            />
            <Edit
              variant={variant}
              data={data}
              handleUpdateData={handleUpdate}
            />
            <Delete
              variant={variant}
              data={data}
              handleUpdateData={handleUpdate}
            />
          </>
        }
      </div>
    </>
  );
};

const TableWide = ({
  data,
  columns,
  className,
  searchbar,
  pagination,
  handleUpdateData,
  variant,
}) => {
  const [tableData, setTableData] = useState([]);
  const [elementsPerPage, setElementsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSetElementsPerPage = (value) => setElementsPerPage(value)

  useEffect(() => {
    setTableData(data);
  }, [])

  const indexOfLastElement = currentPage * elementsPerPage;
  const indexOfFirstElement = indexOfLastElement - elementsPerPage;
  const currentElements = tableData.slice(
    indexOfFirstElement,
    indexOfLastElement
  )

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleData = (newData) => setTableData(newData)


  return (
    <div className={className}>
      {searchbar && (
        <SearchBar
          data={data}
          filterColumns={columns.filter((column) => column.searchable) || []}
          handleData={handleData}
        />
      )}
      <Table hover>
        <thead>
          <tr className={style.tableRowHeader}>
            {columns.map(
              (column) =>
                !column.hidden && (
                  <th
                    key={column.name}
                    className={`${style.tableCellWide} ${style.tableCellHeader}`}
                  >
                    <div className="d-flex justify-content-between">
                      <p className="mb-0 me-2">{column.label}</p>
                      {
                        column.sortable && <Sort data={tableData} sortBy={column.name} handleData={handleData} />
                      }
                    </div>
                  </th>
                )
            )}
            <th className={`${style.tableCellWide} ${style.tableCellHeader}`}>
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {
            variant === "user" &&
            (
              currentElements.map((dataPoint) => (
                <tr className={`${style.tableRow}`} key={crypto.randomUUID()}>
                  {columns.map(
                    (column) =>
                      !column.hidden &&
                      (column.name === "banned" ? (
                        dataPoint[column.name] ? (
                          <td className={style.tableCellWide} key={crypto.randomUUID()}>
                            <p className="mb-0 text-danger fw-semibold">
                              Deshabilitado
                            </p>
                          </td>
                        ) : (
                          <td className={style.tableCellWide} key={crypto.randomUUID()}>
                            <p className="mb-0 text-success fw-semibold">
                              Habilitado
                            </p>
                          </td>
                        )
                      ) : (
                        <td className={`${style.tableCellWide}`} key={crypto.randomUUID()}>
                          {dataPoint[column.name]}
                        </td>
                      ))
                  )}

                  <td>
                    <CRUDButtonGroup
                      variant={variant}
                      data={dataPoint}
                      handleUpdate={handleUpdateData}
                    />
                  </td>

                </tr>
              ))

            )
          }
          {
            variant === "messages" &&
            (
              currentElements.map((dataPoint) => (
                <tr className={`${style.tableRow}`} key={crypto.randomUUID()}>
                  {columns.map(
                    (column) =>
                      !column.hidden &&
                      (column.name === "read" ? (
                        dataPoint[column.name] ? (
                          <td className={`${style.tableCellWide} ${(variant === "messages" && !dataPoint.read) ? style.unreadMessage : ""}`} key={crypto.randomUUID()} >
                            <p className="mb-0 text-success fw-semibold">
                              Leido
                            </p>
                          </td>
                        ) : (
                          <td className={`${style.tableCellWide} ${(variant === "messages" && !dataPoint.read) ? style.unreadMessage : ""}`} key={crypto.randomUUID()}>
                            <p className="mb-0 text-danger fw-semibold">
                              No Leido
                            </p>
                          </td>
                        )
                      ) : column.name === "createdAt" ?
                        (
                          <td className={`${style.tableCellWide} ${(variant === "messages" && !dataPoint.read) ? style.unreadMessage : ""}`} key={crypto.randomUUID()}>
                            <p>{`${new Date(dataPoint[column.name]).getDate()}/${new Date(dataPoint[column.name]).getMonth()}/${new Date(dataPoint[column.name]).getFullYear()} ${new Date(dataPoint[column.name]).getHours()}:${new Date(dataPoint[column.name]).getMinutes()}`}</p>
                          </td>
                        )
                        :
                        (
                          <td className={`${style.tableCellWide} ${(variant === "messages" && !dataPoint.read) ? style.unreadMessage : ""}`} key={crypto.randomUUID()}>
                            {dataPoint[column.name]}
                          </td>
                        ))
                  )}

                  <td className={`${(variant === "messages" && !dataPoint.read) ? style.unreadMessage : ""}`}>
                    <CRUDButtonGroup
                      variant={variant}
                      data={dataPoint}
                      handleUpdate={handleUpdateData}
                    />
                  </td>

                </tr>
              ))
            )
          }
          {
            variant === "appointments" &&
            (
              currentElements.map((dataPoint) => (
                <tr className={`${style.tableRow}`} key={crypto.randomUUID()}>
                  {columns.map(
                    (column) =>
                      !column.hidden &&
                      (column.name === "pet" || column.name === "doctor" ?
                        < td className={`${style.tableCellWide}`} key={crypto.randomUUID()}>
                          {dataPoint[column.name].name}
                        </td> :
                        column.name === "startDate" ?
                          < td className={`${style.tableCellWide}`} key={crypto.randomUUID()}>
                            {`${new Date(dataPoint[column.name]).getUTCDate()} / ${new Date(dataPoint[column.name]).getUTCMonth() + 1}/${new Date(dataPoint[column.name]).getUTCFullYear()} ${new Date(dataPoint[column.name]).getHours()}:${new Date(dataPoint[column.name]).getMinutes()}`}
                          </td> :
                          < td className={`${style.tableCellWide}`} key={crypto.randomUUID()}>
                            {dataPoint[column.name]}
                          </td>)
                  )}

                  <td className={`${(variant === "messages" && !dataPoint.read) ? style.unreadMessage : ""}`}>
                    <CRUDButtonGroup
                      variant={variant}
                      data={dataPoint}
                      handleUpdate={handleUpdateData}
                    />
                  </td>

                </tr>
              ))
            )
          }
          {
            variant === "services" &&
            (
              currentElements.map((dataPoint) => (
                <tr className={`${style.tableRow}`} key={crypto.randomUUID()}>
                  {columns.map(
                    (column) =>
                      !column.hidden &&
                      <td className={`${style.tableCellWide}`} key={crypto.randomUUID()}>
                        {dataPoint[column.name]}
                      </td>

                  )}

                  <td>
                    <CRUDButtonGroup
                      variant={variant}
                      data={dataPoint}
                      handleUpdate={handleUpdateData}
                    />
                  </td>

                </tr>
              ))

            )
          }
        </tbody>
      </Table>
      {
        pagination && (
          <CustomPagination
            totalElements={tableData.length}
            currentPage={currentPage}
            paginate={paginate}
            elementsPerPage={elementsPerPage}
            handleElementsPerPage={handleSetElementsPerPage}
          />
        )
      }
    </div >
  );
};


const TableSmallElement = ({ dataPoint, columns, variant, handleUpdate }) => {
  const [hideData, setHideData] = useState(true);

  return (
    <Table striped className={style.tableSmall}>
      <thead className="border-bottom border-2 ">
        <tr>
          <th colSpan="2">
            <div
              className="d-flex align-items-center justify-content-between gap-4 p-3"
              style={{ backgroundColor: "#fffbf5" }}
            >
              <CRUDButtonGroup
                variant={variant}
                data={dataPoint}
                handleUpdate={handleUpdate}
              />
            </div>
          </th>
        </tr>
      </thead>

      <tbody>
        {columns.map((column) => (
          <tr
            className={column.hidden && hideData ? style.hidden : ""}
            key={column.name}
          >
            <td className={`${style.tableCellSmall} ${style.tableCellHeader}`}>
              {column.label}
            </td>
            {column.name === "doctor" || column.name === "pet" ?
              <td className={style.tableCellSmall}>{dataPoint[column.name].name}</td> :
              column.name === "startDate" ?
                < td className={`${style.tableCellSmall}`} key={crypto.randomUUID()}>
                  {`${new Date(dataPoint[column.name]).getUTCDate()} / ${new Date(dataPoint[column.name]).getUTCMonth() + 1}/${new Date(dataPoint[column.name]).getUTCFullYear()} ${new Date(dataPoint[column.name]).getHours()}:${new Date(dataPoint[column.name]).getMinutes()}`}
                </td>
                : column.name === "banned" ? (
                  dataPoint[column.name] ? (
                    <td className={style.tableCellSmall} key={crypto.randomUUID()}>
                      <p className="mb-0 text-danger fw-semibold">
                        Deshabilitado
                      </p>
                    </td>
                  ) : (
                    <td className={style.tableCellSmall} key={crypto.randomUUID()}>
                      <p className="mb-0 text-success fw-semibold">
                        Habilitado
                      </p>
                    </td>
                  )) :
                  <td className={style.tableCellSmall}>{dataPoint[column.name]}</td>
            }
          </tr>
        ))}
        <tr>
          <td
            colSpan="2"
            className={style.showMoreInfoButton}
            onClick={() => setHideData(!hideData)}
            style={{ backgroundColor: "#fffbf5" }}
          >
            {
              hideData ? "Mostrar más información" : "Mostrar menos información"
            }
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

const TableSmall = ({ data, columns, className, searchbar, variant, handleUpdate }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => setTableData(data), []);

  const handleData = (newData) => {
    setTableData(newData);
  };

  return (
    <div className={className}>
      {searchbar && (
        <SearchBar
          data={data}
          filterColumns={columns}
          handleData={handleData}
        />
      )}
      {tableData.map((dataPoint) => (
        <TableSmallElement
          dataPoint={dataPoint}
          columns={columns}
          key={crypto.randomUUID()}
          variant={variant}
          handleUpdate={handleUpdate}
        />
      ))}
    </div>
  );
};

const CustomTable = ({ data, columns, handleUpdateData, variant, searchbar }) => {
  return (
    <div className="mx-auto">
      <div>
        <TableWide
          data={data}
          columns={columns}
          className={style.tableWideContainer}
          searchbar={searchbar}
          pagination
          handleUpdateData={handleUpdateData}
          variant={variant}
        />
      </div>
      <div className="mx-4">
        <TableSmall
          data={data}
          columns={columns}
          className={style.tableSmallContainer}
          searchbar={searchbar}
          variant={variant}
          handleUpdate={handleUpdateData}
        />
      </div>
    </div>
  );
}


export default CustomTable;
