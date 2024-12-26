import Container from "react-bootstrap/Container"
import { useEffect, useState } from "react"
import clientAxios from "../helpers/clientAxios";
import CustomTable from "./shared/CustomTable";
import { Spinner } from "react-bootstrap";

const AdminMessages = () => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getMessages = async () => {
            try {
                setIsLoading(true);
                const res = await clientAxios.get("/messages/");
                setMessages(res.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        }

        getMessages();
    }, [])

    const labels = [
        { name: "read", label: "Leido", hidden: false },
        { name: "type", label: "Motivo", hidden: false },
        { name: "contactName", label: "Nombre", hidden: false },
        { name: "contactEmail", label: "Email", hidden: true },
        { name: "contactPhone", label: "Teléfono", hidden: true },
    ];

    const handleUpdateData = async () => {
        try {
            setIsLoading(true);
            const res = await clientAxios.get("/messages/");
            setMessages(res.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    if (isLoading) {
        return (<Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>)
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