import Container from "react-bootstrap/Container"
import { useEffect, useState } from "react";
import CustomTable from "../components/shared/CustomTable";
import clientAxios from "../helpers/clientAxios";
import CustomSpinner from "./shared/CustomSpinner";

const AdminUser = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            const token = sessionStorage.getItem("token");
            const res = await clientAxios.get("/user", {
                headers: {
                    authtoken: token
                }
            });
            setData(res.data);
            setIsLoading(false);
        };

        fetchUsers();
    }, []);

    const handleUpdateData = async () => {
        setIsLoading(true);
        const token = sessionStorage.getItem("token");
        const res = await clientAxios.get("/user", {
            headers: {
                authtoken: token
            }
        });
        setData(res.data);
        setIsLoading(false);
    };

    const labels = [
        { name: "firstName", label: "Nombre", hidden: false, searchable: true, sortable: true },
        { name: "lastName", label: "Apellido", hidden: false, searchable: true, sortable: true },
        { name: "email", label: "Email", hidden: false, searchable: true, sortable: true },
        { name: "banned", label: "Estado", hidden: false, searchable: false, sortable: true },
        { name: "role", label: "Rol", hidden: false, searchable: false, sortable: true },
        { name: "phone", label: "Teléfono", hidden: true, searchable: true, sortable: false },
        { name: "address", label: "Dirección", hidden: true, searchable: true, sortable: false },
        { name: "city", label: "Ciudad", hidden: true, searchable: false, sortable: false },
        { name: "province", label: "Provincia", hidden: true, searchable: false, sortable: false },
        { name: "zipCode", label: "CP", hidden: true, searchable: false, sortable: false },
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
                    searchbar
                />
            </Container>
        );
    } else {
        return (
            <div className="h-100 w-100 d-flex justify-content-center align-items-center mb-4">
                <CustomSpinner />
            </div >
        );
    }
}

export default AdminUser;
