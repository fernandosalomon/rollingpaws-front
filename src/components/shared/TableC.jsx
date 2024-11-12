import { Form } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import style from "../../styles/CustomTable.module.css";
import { useState } from "react";

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

const TableC = ({ data, columns }) => {
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
