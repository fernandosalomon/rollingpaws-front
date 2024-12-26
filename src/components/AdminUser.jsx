import Container from "react-bootstrap/Container"
import { useEffect, useState } from "react";
import { getAllUsers } from "../helpers/fetchData";
import Spinner from "react-bootstrap/Spinner";
import CustomTable from "../components/shared/CustomTable";

const AdminUser = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            const res = await getAllUsers();
            setData(res);
            setIsLoading(false);
        };

        fetchUsers();
    }, []);

    const handleUpdateData = async () => {
        setIsLoading(true);
        const res = await getAllUsers();
        setData(res);
        setIsLoading(false);
    };

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

    if (!isLoading) {
        return (
            <Container>
                <CustomTable
                    data={data}
                    columns={labels}
                    isLoading={isLoading}
                    handleUpdateData={handleUpdateData}
                    variant="user"
                />
            </Container>
        );
    } else {
        return (
            <Container>
                <div
                    style={{ width: "100vw", height: "100%" }}
                    className="d-flex justify-content-center align-items-center"
                >
                    <Spinner animation="border" variant="warning" />
                </div>
            </Container>
        );
    }
}

export default AdminUser;
