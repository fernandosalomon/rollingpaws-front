import { useEffect, useState } from "react";
import clientAxios from "../helpers/clientAxios";
import Container from "react-bootstrap/Container"
import CustomTable from "../components/shared/CustomTable";
import CustomButton from "./shared/CustomButton";
import { Modal, ModalHeader } from "react-bootstrap";
import FormC from "./shared/FormC";
import CustomSpinner from "./shared/CustomSpinner";



const AdminServices = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [services, setServices] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
        const getServicesList = async () => {
            try {
                setIsLoading(true);
                const token = sessionStorage.getItem("token");
                const servicesList = await clientAxios.get("/services/", {
                    headers: {
                        authtoken: token,
                    }
                });
                setServices(servicesList.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error)
            }
        }
        getServicesList();
    }, [])

    const labels = [
        { name: "name", label: "Nombre", hidden: false, searchable: true, sortable: true },
        { name: "description", label: "Descripción", hidden: true, searchable: false, sortable: false },
        { name: "image", label: "Imagen", hidden: true, searchable: false, sortable: false },
    ]

    const handleUpdateData = async () => {
        try {
            setIsLoading(true);
            const token = sessionStorage.getItem("token");
            const servicesList = await clientAxios.get("/services/", {
                headers: {
                    authtoken: token,
                }
            });
            setServices(servicesList.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error)
        }
    }

    if (!isLoading) {
        return (
            <>
                <Container>
                    <div className="w-100 d-flex justify-content-center justify-content-md-end">
                        <CustomButton variant="callToAction" className="d-flex align-items-center py-1" size="md" onClick={handleShow}><span className="me-2 fs-1">+</span>Crear servicio</CustomButton>
                    </div>
                    <CustomTable
                        data={services}
                        columns={labels}
                        isLoading={isLoading}
                        handleUpdateData={handleUpdateData}
                        variant="services"
                        searchbar
                    />
                </Container>
                <Modal show={show} onHide={handleClose}>
                    <ModalHeader closeButton className="fs-1">Crear nuevo servicio</ModalHeader>
                    <Modal.Body>
                        <FormC
                            variant="new-service"
                            handleCloseModal={handleClose}
                            handleUpdate={handleUpdateData}
                        />
                    </Modal.Body>
                </Modal>
            </>
        );
    } else {
        return (
            <CustomSpinner />
        );
    }
}

export default AdminServices