import Table from "react-bootstrap/Table";
import style from "../../styles/CustomTable.module.css";
import { useState } from "react";

const TableWide = ({ data, columns, className }) => {
  return (
    <Table hover className={className}>
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
        {data.map((dataPoint) => (
          <tr className={style.tableRow}>
            {columns.map(
              (column) =>
                !column.hidden &&
                (column.name === "banned" ? (
                  dataPoint[column.name] ? (
                    <td className={style.tableCell}>
                      <p className="mb-0 text-danger fw-semibold">
                        Deshabilitado
                      </p>
                    </td>
                  ) : (
                    <td className={style.tableCell}>
                      <p className="mb-0 text-success fw-semibold">
                        Habilitado
                      </p>
                    </td>
                  )
                ) : (
                  <td className={style.tableCell}>{dataPoint[column.name]}</td>
                ))
            )}
            <td>
              <div className="d-flex gap-2">
                <button
                  className={`${style.customTableButton} ${style.moreInfoButton}`}
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
                <button
                  className={`${style.customTableButton} ${style.editButton}`}
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
                  className={`${style.customTableButton} ${style.banUserButton}`}
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
                <button
                  className={`${style.customTableButton} ${style.deleteButton}`}
                >
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
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const TableSmallElement = ({ dataPoint, columns }) => {
  const [hideData, setHideData] = useState(true);

  return (
    <Table className={style.tableSmall}>
      <tbody>
        {columns.map((column) => (
          <tr className={column.hidden && hideData ? style.hidden : ""}>
            <td className={`${style.tableCell} ${style.tableCellHeader}`}>
              {column.label}
            </td>
            <td className={style.tableCell}>{dataPoint[column.name]}</td>
          </tr>
        ))}
        <tr>
          <td
            colspan="2"
            className={style.showMoreInfoButton}
            onClick={() => setHideData(!hideData)}
          >
            Mostrar información
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

const TableSmall = ({ data, columns, className }) => {
  return (
    <div className={className}>
      {data.map((dataPoint) => (
        <TableSmallElement dataPoint={dataPoint} columns={columns} />
      ))}
    </div>
  );
};

const CustomTable = ({ data, columns }) => {
  // const data = [
  //   {
  //     id: 1,
  //     firstName: "Mark",
  //     lastName: "Otto",
  //     username: "@mdo",
  //   },
  //   {
  //     id: 2,
  //     firstName: "Jacob",
  //     lastName: "Thornton",
  //     username: "@fat",
  //   },
  //   {
  //     id: 3,
  //     firstName: "Larry",
  //     lastName: "Bird",
  //     username: "@twitter",
  //   },
  // ];

  // const columns = [
  //   {
  //     name: "id",
  //     label: "ID",
  //   },
  //   {
  //     name: "firstName",
  //     label: "Nombre",
  //   },
  //   {
  //     name: "lastName",
  //     label: "Apellido",
  //   },
  //   {
  //     name: "username",
  //     label: "Usuario",
  //   },
  // ];

  return (
    <div>
      <div className="w-50 mx-auto">
        <TableWide
          data={data}
          columns={columns}
          className={style.tableWideContainer}
        />
      </div>
      <div className="w-50 mx-auto">
        <TableSmall
          data={data}
          columns={columns}
          className={style.tableSmallContainer}
        />
      </div>
    </div>
  );
};

export default CustomTable;
