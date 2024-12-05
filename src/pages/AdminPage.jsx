import { useEffect, useState } from "react";
import TableC from "../components/shared/TableC";
import { getAllUsers } from "../helpers/fetchData";
import Spinner from "react-bootstrap/Spinner";
import CustomTable from "../components/shared/CustomTable";

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
    { name: "firstName", label: "Nombre", hidden: false },
    { name: "lastName", label: "Apellido", hidden: false },
    { name: "email", label: "Email", hidden: false },
    { name: "banned", label: "Estado", hidden: false },
    { name: "phone", label: "Teléfono", hidden: true },
    { name: "address", label: "Dirección", hidden: true },
    { name: "city", label: "Ciudad", hidden: true },
    { name: "province", label: "Provincia", hidden: true },
    { name: "zipCode", label: "CP", hidden: true },
  ];

  if (data) {
    return <CustomTable data={data} columns={labels} />;
  } else {
    return <Spinner animation="border" />;
  }
};

export default AdminPage;
