import { Form, Table } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import style from "../../styles/CustomTable.module.css";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import FormC from "./FormC";
import clientAxios from "../../helpers/clientAxios";
import Swal from "sweetalert2";

const CRUD = ({ entryId, handleUpdateData, isBanned }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEditUser = () => {
    handleShow();
  };

  const handleBanUser = async () => {
    try {
      const res = await clientAxios.put(`/user/ban-user/${entryId}`);
      Swal.fire({
        position: "top-end",
        title: `Usuario ${isBanned ? "habilitado" : "deshabilitado"}`,
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      handleUpdateData();
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: `El usuario no se pudo deshabilitar. Error: ${error.response.message}`,
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

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
        const res = await clientAxios.delete(`/user/${entryId}`);
        Swal.fire({
          title: "Usuario Eliminado",
          text: "El usuario fue eliminado satisfactoriamente",
          icon: "success",
        });
        handleUpdateData();
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Error",
          text: `El usuario no se pudo eliminar. Error: ${error.response.message}`,
          icon: "success",
        });
      }
    }
  };

  return (
    <>
      <button className={style.buttonCRUD} onClick={handleEditUser}>
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
      <button className={style.buttonCRUD} onClick={handleBanUser}>
        {isBanned ? (
          <span className={style.unbanUserButton}>Habilitar</span>
        ) : (
          <span className={style.banUserButton}>Deshabilitar</span>
        )}
      </button>
      <button className={style.buttonCRUD} onClick={handleDeleteUser}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          className="bi bi-trash-fill"
          viewBox="0 0 16 16"
        >
          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
        </svg>
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <FormC
            variant="edit-user"
            handleCloseModal={handleClose}
            userID={entryId}
            handleUpdateData={handleUpdateData}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

const SearchBar = () => {
  return (
    <Form className={style.searchbarWrapper}>
      <InputGroup className={style.searchbar}>
        <InputGroup.Text id="search-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </InputGroup.Text>
        <Form.Control
          placeholder="Buscar"
          aria-label="Buscar"
          aria-describedby="searchbar"
          className={style.searchbarInput}
        />
      </InputGroup>
    </Form>
  );
};

const Pagination = ({ handleChangePage }) => {
  return (
    <div className={style.paginationWrapper}>
      <p className={style.paginationLabel}>Página 1 de 5</p>
      <div className={style.paginationControlButtons}>
        <button className={style.paginationControlButton}>&#8810;</button>
        <button className={style.paginationControlButton}>&#60;</button>
        <button className={style.paginationControlButton}>&#62;</button>
        <button className={style.paginationControlButton}>&#8811;</button>
      </div>
    </div>
  );
};

const TableSmall = ({ labels, data, handleDelete, handleEdit, handleBan }) => {
  const [hideData, setHideData] = useState(true);

  const handleShowData = () => setHideData(!hideData);
  return (
    <div className={style.smallTableWrapper}>
      <div className={style.smallTableHeader}>
        <h4 className="mb-0 ms-2">{`ID: ${data._id}`}</h4>
        <div className={style.smallTableCrudButtonsContainer}>
          <button
            className={`${style.smallTableCrudButton} ${style.editButton}`}
            onClick={() => handleEdit(data._id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
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
            className={`${style.smallTableCrudButton} ${style.deleteButton}`}
            onClick={() => handleDelete(data._id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-trash3"
              viewBox="0 0 16 16"
            >
              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
            </svg>
          </button>
        </div>
      </div>
      <Table className={style.smallTableContainer}>
        <tbody className={style.smallTableBody}>
          {labels.map(
            (val) =>
              !val.hidden && (
                <tr>
                  <td className={style.smallTableLabelCell}>
                    <p className="mb-0">{`${val.label}`}</p>
                    <span>:</span>
                  </td>
                  <td className={style.smallTableContentCell}>
                    {val.value === "banned" ? (
                      data.banned ? (
                        <div className="d-flex gap-2 align-items-center">
                          <p className="text-danger mb-0 fw-semibold">
                            Deshabilitado
                          </p>
                          <button
                            className={`${style.smallTableCrudButton} p-0`}
                            onClick={() => handleBan(data._id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="#dc3545"
                              className="bi bi-ban"
                              viewBox="0 0 16 16"
                            >
                              <path d="M15 8a6.97 6.97 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8M2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0" />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <div className="d-flex gap-2 align-items-start">
                          <p className="text-success mb-0 fw-semibold">
                            Habilitado
                          </p>
                          <button
                            className={`${style.smallTableCrudButton} p-0`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="#28a745"
                              className="bi bi-check"
                              viewBox="0 0 16 16"
                            >
                              <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                            </svg>
                          </button>
                        </div>
                      )
                    ) : (
                      data[val.value]
                    )}
                  </td>
                </tr>
              )
          )}
        </tbody>
      </Table>
      <div className={style.smallTableShowDataButton} onClick={handleShowData}>
        {hideData ? (
          <p className="mb-0"> Ver más información &#9660;</p>
        ) : (
          <p className="mb-0"> Ver menos información &#9650;</p>
        )}
      </div>
      <table
        className={`${style.smallTableContainer} ${
          hideData ? style.smallTableHiddenData : style.smallTableShowData
        }`}
      >
        <tbody className={style.smallTableBody}>
          {labels.map(
            (val) =>
              val.hidden && (
                <tr>
                  <td className={style.smallTableLabelCell}>
                    <p className="mb-0">{`${val.label}`}</p>
                    <span>:</span>
                  </td>
                  <td className={style.smallTableContentCell}>
                    {data[val.value]}
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  );
};

const TableBig = ({
  data,
  labels,
  handleUpdateData,
  CRUDButtons,
  resultsPerPage,
  currentPage,
}) => {
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            {labels.map(
              (column) =>
                !column.hidden && (
                  <th key={crypto.randomUUID()} className={style.columnLabel}>
                    {column.label}
                  </th>
                )
            )}
            {CRUDButtons && <th className={style.tableCell}>Opciones</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((dataPoint) => (
            <tr key={dataPoint._id}>
              {labels.map(
                (column) =>
                  !column.hidden && (
                    <td key={crypto.randomUUID()} className={style.tableCell}>
                      {column.value === "banned" ? (
                        dataPoint[column.value] ? (
                          <p className="text-danger mb-0 fw-semibold">
                            Deshabilitado
                          </p>
                        ) : (
                          <p className="text-success mb-0 fw-semibold">
                            Habilitado
                          </p>
                        )
                      ) : (
                        dataPoint[column.value]
                      )}
                    </td>
                  )
              )}
              {CRUDButtons && (
                <td className={style.CRUDbuttonWrapper}>
                  <CRUD
                    entryId={dataPoint._id}
                    handleUpdateData={handleUpdateData}
                    isBanned={dataPoint.banned}
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const TableC = ({ data, labels, CRUDButtons, handleUpdateData }) => {
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <SearchBar />
      {windowDimensions.width < 425 ? (
        <div className="d-flex flex-column gap-4 w-100">
          {data.map((dataPoint) => (
            <TableSmall labels={labels} data={dataPoint} key={dataPoint._id} />
          ))}
        </div>
      ) : (
        <TableBig
          data={data}
          labels={labels}
          handleUpdateData={handleUpdateData}
          CRUDButtons={CRUDButtons}
        />
      )}
    </>
  );
};

export default TableC;
