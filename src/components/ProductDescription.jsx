import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"
import style from "../styles/ProductDescription.module.css"
import Table from "react-bootstrap/Table"
import { Accordion } from "react-bootstrap"
import Form from "react-bootstrap/Form"
import CustomButton from "./shared/CustomButton"
import { useState } from "react"

const ProductDescription = () => {

    const [numberOfItems, setNumberOfItems] = useState(1);

    const handleSubstractItem = (e) => {
        e.preventDefault();
        if (numberOfItems > 1) {
            setNumberOfItems(numberOfItems - 1)
        }
    }

    const handleAddItem = (e) => {
        e.preventDefault()
        setNumberOfItems(numberOfItems + 1)
    }

    return (
        <Row className={style.wrapper}>
            <Col sm={12} md={6} className="d-flex justify-content-center align-items-center">
                <Image src="/src/assets/img/store/Alimento_para_Perro_4.png" alt="Alimento para perro" />
            </Col>
            <Col sm={12} md={6}>
                <h2 className={style.brand}>ROYAL CANIN</h2>
                <h3 className={style.title}>Royal Canin Alimento Seco para Perro Giant Adulto</h3>
                <p className={style.price}>$10.000,00</p>
                <div>
                    <Form>
                        <div className="d-flex align-items-center w-100 gap-2 mb-2">
                            <Form.Group className="mb-0" controlId="numberOfItems">
                                <div className={style.numberOfItemsInput}>
                                    <button onClick={handleSubstractItem} className={style.inputControlButton}>&lt;</button>
                                    <p className="mb-0">{numberOfItems}</p>
                                    <button onClick={handleAddItem} className={style.inputControlButton}>&gt;</button>
                                </div>
                            </Form.Group>
                            <CustomButton variant="callToAction" className="flex-fill">Agregar al carrito</CustomButton>
                        </div>
                    </Form>
                </div>
                <Accordion>
                    <Accordion.Item eventKey={0}>
                        <Accordion.Header className={style.accordionHeader}>Especificaciones</Accordion.Header>
                        <Accordion.Body className="p-1">
                            <Table striped hover className="m-0">
                                <tbody>
                                    <tr className="border-0">
                                        <td className="border-0 fw-semibold">Edad de mascota</td>
                                        <td className="border-0">Cachorro</td>
                                    </tr>
                                    <tr className="border-0">
                                        <td className="border-0 fw-semibold">Marca</td>
                                        <td className="border-0">Royal Canin</td>
                                    </tr>
                                    <tr className="border-0">
                                        <td className="border-0 fw-semibold">Contenido</td>
                                        <td className="border-0">2 Kg.</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey={1}>
                        <Accordion.Header className={style.accordionHeader}>Métodos de entrega</Accordion.Header>
                        <Accordion.Body className="p-1">
                            <div className="p-4 d-flex gap-3 align-items-start">
                                <Form.Check type="radio" aria-label="store" name="deliveryMethod" />
                                <div>
                                    <h5 className={style.deliveryMethodTitle}>Retiro del local</h5>
                                    <p className={style.deliveryMethodDescription}>RollingPaws - Calle Falsa 123, San Miguel de Tucumán, Tucumán - Horarios de atención: Lun - Vie: 8:00 - 20:00, Sab: 8:00 - 15:00 y Dom: 8:00 - 12:00</p>
                                </div>
                            </div>
                            <div className="p-4 d-flex gap-3 align-items-start">
                                <Form.Check type="radio" aria-label="home-delivery" name="deliveryMethod" disabled />
                                <div>
                                    <h5 className={`${style.deliveryMethodTitle} ${style.deliveryMethodDisabled}`}>Envío a domicilio</h5>
                                    <p className={`${style.deliveryMethodDescription} ${style.deliveryMethodDisabled}`}>Momentáneamente esta tienda no tiene habilitada este método de entrega</p>
                                </div>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <div>
                    <h3></h3>
                </div>
            </Col>
        </Row>
    )
}

export default ProductDescription