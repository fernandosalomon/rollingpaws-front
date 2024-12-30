import Container from "react-bootstrap/Container"
import { useEffect, useState } from "react"
import clientAxios from "../helpers/clientAxios";
import CustomTable from "./shared/CustomTable";
import CustomSpinner from "./shared/CustomSpinner";

const AdminMessages = () => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getMessages = async () => {
            try {
                setIsLoading(true);
                const token = sessionStorage.getItem("token");
                const res = await clientAxios.get("/messages/", {
                    headers: {
                        authtoken: token,
                    }
                });
                setMessages(res.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        }

        getMessages();
    }, [])

    const labels = [
        { name: "createdAt", label: "Fecha", hidden: false, searchable: false, sortable: true },
        { name: "read", label: "Leido", hidden: false, searchable: false, sortable: true },
        { name: "type", label: "Motivo", hidden: false, searchable: false, sortable: true },
        { name: "contactName", label: "Nombre", hidden: false, searchable: false, sortable: false },
        { name: "contactEmail", label: "Email", hidden: true, searchable: false, sortable: false },
        { name: "contactPhone", label: "Teléfono", hidden: true, searchable: false, sortable: false },
    ];

    const handleUpdateData = async () => {
        try {
            setIsLoading(true);
            const token = sessionStorage.getItem("token");
            const res = await clientAxios.get("/messages/", {
                headers: {
                    authtoken: token,
                }
            });
            setMessages(res.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    if (isLoading) {
        return <CustomSpinner />
    } else {
        return (
            <Container>
                <CustomTable
                    data={messages}
                    columns={labels}
                    isLoading={isLoading}
                    handleUpdateData={handleUpdateData}
                    variant="messages"
                />
            </Container>
        )
    }
}

export default AdminMessages