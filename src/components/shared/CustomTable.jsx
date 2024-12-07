import Table from "react-bootstrap/Table";
import style from "../../styles/CustomTable.module.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useEffect, useRef, useState } from "react";
import Pagination from "react-bootstrap/Pagination";

const SearchBar = ({ data, filterColumns, handleData, className }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchColumnIndex, setSearchColumnIndex] = useState(0);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filterData = (data) => {
    const result = data.filter((element) =>
      element[filterColumns[searchColumnIndex].name].includes(searchQuery)
    );
    console.log(result);
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
  elementsPerPage,
  totalElements,
  currentPage,
  paginate,
}) => {
  const pageNumber = [];
  const active = currentPage;

  for (let i = 1; i <= Math.ceil(totalElements / elementsPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <div className="d-flex justify-content-center">
      <Pagination size="lg">
        <Pagination.First />
        <Pagination.Prev />
        {pageNumber.map((number) => (
          <Pagination.Item
            key={number}
            active={number === active}
            onClick={() => paginate(number)}
          >
            {number}
          </Pagination.Item>
        ))}
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    </div>
  );
};

const CRUDButtonGroup = () => {
  return (
    <div className="d-flex gap-2">
      <button className={`${style.customTableButton} ${style.moreInfoButton}`}>
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
      <button className={`${style.customTableButton} ${style.editButton}`}>
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
      <button className={`${style.customTableButton} ${style.banUserButton}`}>
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
      <button className={`${style.customTableButton} ${style.deleteButton}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="#dc3545"
          className="bi bi-trash"
          viewBox="0 0 16 16"
        >
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
        </svg>
      </button>
    </div>
  );
};

const TableWide = ({ data, columns, className, searchbar, pagination }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => setTableData(data), []);

  const [currentPage, setCurrentPage] = useState(1);
  const [elementsPerPage, setElementsPerPage] = useState(2);

  const indexOfLastElement = currentPage * elementsPerPage;
  const indexOfFirstElement = indexOfLastElement - elementsPerPage;
  const currentElements = tableData.slice(
    indexOfFirstElement,
    indexOfLastElement
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
      <Table hover>
        <thead>
          <tr className={style.tableRowHeader}>
            {columns.map(
              (column) =>
                !column.hidden && (
                  <th
                    key={column.name}
                    className={`${style.tableCell} ${style.tableCellHeader}`}
                  >
                    {column.label}
                  </th>
                )
            )}
            <th className={`${style.tableCell} ${style.tableCellHeader}`}>
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {currentElements.map((dataPoint) => (
            <tr className={style.tableRow} key={crypto.randomUUID()}>
              {columns.map(
                (column) =>
                  !column.hidden &&
                  (column.name === "banned" ? (
                    dataPoint[column.name] ? (
                      <td className={style.tableCell} key={crypto.randomUUID()}>
                        <p className="mb-0 text-danger fw-semibold">
                          Deshabilitado
                        </p>
                      </td>
                    ) : (
                      <td className={style.tableCell} key={crypto.randomUUID()}>
                        <p className="mb-0 text-success fw-semibold">
                          Habilitado
                        </p>
                      </td>
                    )
                  ) : (
                    <td className={style.tableCell} key={crypto.randomUUID()}>
                      {dataPoint[column.name]}
                    </td>
                  ))
              )}
              <td>
                <CRUDButtonGroup />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {pagination && (
        <CustomPagination
          elementsPerPage={elementsPerPage}
          totalElements={tableData.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      )}
    </div>
  );
};

const TableSmallElement = ({ dataPoint, columns }) => {
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
              <p className="mb-0 fw-normal fs-5 text-nowrap">{`ID: ${dataPoint._id}`}</p>
              <CRUDButtonGroup />
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
            <td className={`${style.tableCell} ${style.tableCellHeader}`}>
              {column.label}
            </td>
            <td className={style.tableCell}>{dataPoint[column.name]}</td>
          </tr>
        ))}
        <tr>
          <td
            colSpan="2"
            className={style.showMoreInfoButton}
            onClick={() => setHideData(!hideData)}
            style={{ backgroundColor: "#fffbf5" }}
          >
            Mostrar más información
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

const TableSmall = ({ data, columns, className, searchbar }) => {
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
        />
      ))}
    </div>
  );
};

const CustomTable = ({ data, columns, isLoading }) => {
  const [tableData, setTableData] = useState([]);

  return (
    <div className="mx-auto">
      <div>
        <TableWide
          data={data}
          columns={columns}
          className={style.tableWideContainer}
          searchbar
          pagination
        />
      </div>
      <div className="mx-4">
        <TableSmall
          data={data}
          columns={columns}
          className={style.tableSmallContainer}
          searchbar={true}
        />
      </div>
    </div>
  );
};

export default CustomTable;
