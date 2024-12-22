import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"

const ProductDescription = () => {
    return (
        <Row>
            <Col sm={12} md={6}>
                <Image src="/src/assets/img/store/Alimento_para_Perro_4.png" alt="Alimento para perro" />
            </Col>
            <Col sm={12} md={6}>
                <h2>ROYAL CANIN</h2>
                <h3>Royal Canin Alimento Seco para Perro Giant Adulto</h3>
            </Col>
        </Row>
    )
}

export default ProductDescription