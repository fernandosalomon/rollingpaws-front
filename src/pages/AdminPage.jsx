import { useEffect, useState } from "react";
import TableC from "../components/shared/TableC";
import { getAllUsers } from "../helpers/fetchData";
import Spinner from "react-bootstrap/Spinner";

const AdminPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async function () {
      const data = await getAllUsers();
      setData(data);
    })();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const columns = ["fullname", "email", "address", "phone"];

  if (data) {
    return <TableC data={data} columns={columns} CRUDButtons={true} />;
  } else {
    return <Spinner animation="border" />;
  }
};

export default AdminPage;
