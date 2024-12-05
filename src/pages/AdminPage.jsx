import { useEffect, useState } from "react";
import TableC from "../components/shared/TableC";
import { getAllUsers } from "../helpers/fetchData";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";

const AdminPage = () => {
  const [data, setData] = useState([]);

  const handleUpdateData = async () => {
    const data = await getAllUsers();
    setData(data);
  };

  useEffect(() => {
    (async function () {
      const data = await getAllUsers();
      setData(data);
    })();
  }, []);

  const labels = [
    { value: "firstName", label: "Nombre", hidden: false },
    { value: "lastName", label: "Apellido", hidden: false },
    { value: "email", label: "Email", hidden: false },
    { value: "banned", label: "Estado", hidden: false },
    { value: "phone", label: "Teléfono", hidden: true },
    { value: "address", label: "Dirección", hidden: true },
    { value: "city", label: "Ciudad", hidden: true },
    { value: "province", label: "Provincia", hidden: true },
    { value: "zipCode", label: "CP", hidden: true },
  ];

  if (data) {
    return (
      <Container fluid="md">
      
        <TableC
          data={data}
          labels={labels}
          CRUDButtons={true}
          handleUpdateData={handleUpdateData}
        />
      </Container>
    );
  } else {
    return <Spinner animation="border" />;
  }
};

export default AdminPage;
