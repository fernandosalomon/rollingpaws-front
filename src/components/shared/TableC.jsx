import { Form } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import style from "../../styles/CustomTable.module.css";
import { useState } from "react";

const CRUD = () => {
  return (
    <>
      <button className={style.buttonCRUD}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          class="bi bi-pencil-square"
          viewBox="0 0 16 16"
        >
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
          <path
            fill-rule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
          />
        </svg>
      </button>
      <button className={style.buttonCRUD}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          class="bi bi-person-slash"
          viewBox="0 0 16 16"
        >
          <path d="M13.879 10.414a2.501 2.501 0 0 0-3.465 3.465zm.707.707-3.465 3.465a2.501 2.501 0 0 0 3.465-3.465m-4.56-1.096a3.5 3.5 0 1 1 4.949 4.95 3.5 3.5 0 0 1-4.95-4.95ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
        </svg>
      </button>
      <button className={style.buttonCRUD}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          class="bi bi-trash-fill"
          viewBox="0 0 16 16"
        >
          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
        </svg>
      </button>
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
            class="bi bi-search"
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

const TableC = ({ data, columns, CRUDButtons }) => {
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <div className={style.tableContainer}>
      <div className={style.header}>
        <div className={style.resultsPerPageWrapper}>
          <p className={style.resultsPerPageLabel}>Mostrar</p>
          <Form.Select
            aria-label="resultsPerPage"
            className={style.resultsPerPageSelect}
            onChange={(e) => setResultsPerPage(e.target.value)}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </Form.Select>
          <p className={style.resultsPerPageLabel}>resultados por página</p>
        </div>
        <SearchBar />
      </div>
      <table className={style.table}>
        <thead className={style.tableHeaderWrapper}>
          <tr className={style.tableHeaderRow}>
            {columns.map((columnLabel) => (
              <th className={style.tableColumnLabel}>{columnLabel}</th>
            ))}
            {CRUDButtons && <th>Opciones</th>}
          </tr>
        </thead>
        <tbody className={style.tableContent}>
          {data.map((dataRow, index) => (
            <tr className={style.tableContentRow} key={index}>
              {columns.map((dataLabel) => (
                <td
                  className={style.tableContentCell}
                  key={crypto.randomUUID()}
                >
                  {dataRow[dataLabel]}
                </td>
              ))}
              {CRUDButtons && (
                <td>
                  <div>
                    <CRUD />
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <Pagination />
      </div>
    </div>
  );
};

export default TableC;
