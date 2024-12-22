import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"
import Container from "react-bootstrap/Container"
import { CardBody, CardTitle, CardImage, CustomCard, CardSubtitle } from "./shared/CustomCard"
import CustomButton from "./shared/CustomButton"
import style from "../styles/Store.module.css"
import { useState } from "react"

const ProductCard = ({ image, title, description }) => {
    return (
        <CustomCard className={style.productCard}>
            <CardImage src={image} width={"60%"} />
            <CardBody>
                <CardTitle className={style.productCardTitle}>{title}</CardTitle>
                <CardSubtitle className={style.productCardSubtitle}>{description}</CardSubtitle>
                <CustomButton variant="callToAction" className={style.productCardButton} size="sm">Comprar ahora</CustomButton>
            </CardBody>
        </CustomCard>
    )
}

const Store = () => {

    const [view, setView] = useState(0)

    const productList = [];

    for (let i = 0; i < 20; i++) {
        productList.push(i);
    }


    return (
        <>
            <Container fluid="md" className="my-5">
                <Row>
                    <Col sm={2} onClick={() => setView(0)} className={style.storeMenuBar}>
                        <Image src="/src/assets/img/store/Alimento_para_Perro_4.png" alt="Alimento para perros" width={"150px"} />
                        <h4 className="text-center w-100 mb-0 mt-3">Alimento para perros</h4>
                    </Col>
                    <Col sm={2} onClick={() => setView(1)} className={style.storeMenuBar}>
                        <Image src="/src/assets/img/store/Alimento_para_Gato_4.png" alt="Alimento para gatos" width={"150px"} />
                        <h4 className="text-center w-100 mb-0 mt-3">Alimento para gatos</h4>
                    </Col>
                    <Col sm={2} onClick={() => setView(2)} className={style.storeMenuBar}>
                        <Image src="/src/assets/img/store/Accesorios_para_Perro.png" alt="Accesorios para perros" width={"150px"} />
                        <h4 className="text-center w-100 mb-0 mt-3">Accesorios para perros</h4>
                    </Col>
                    <Col sm={2} onClick={() => setView(3)} className={style.storeMenuBar}>
                        <Image src="/src/assets/img/store/Piedras_y_Arena_4.png" alt="Piedra y Arena" width={"150px"} />
                        <h4 className="text-center w-100 mb-0 mt-3">Piedras y arena</h4>
                    </Col>
                    <Col sm={2} onClick={() => setView(4)} className={style.storeMenuBar}>
                        <Image src="/src/assets/img/store/Cachorros.png" alt="Cachorros" width={"150px"} />
                        <h4 className="text-center w-100 mb-0 mt-3">Cachorros</h4>
                    </Col>
                    <Col sm={2} onClick={() => setView(5)} className={style.storeMenuBar}>
                        <Image src="/src/assets/img/store/Gatitos.png" alt="Gatitos" width={"150px"} />
                        <h4 className="text-center w-100 mb-0 mt-3">Gatitos</h4>
                    </Col>
                </Row>
            </Container>
            {view === 0 &&
                <Container fluid="md">
                    <h2>Alimento Para perros</h2>
                    <Row>
                        {productList.map((_, index) => <Col sm={12} md={4} lg={3}><ProductCard image="/src/assets/img/store/Alimento_para_Perro_4.png" title="ROYAL CANIN" description="Royal Canin Alimento Seco para Perro Giant Adulto" key={index} /></Col>)}
                    </Row>
                </Container>}
            {view === 1 &&
                <Container fluid="md">
                    <h2>Alimento Para gatos</h2>
                    <Row>
                        {productList.map((_, index) => <Col sm={12} md={4} lg={3}><ProductCard image="/src/assets/img/store/Alimento_para_Gato_4.png" title="ROYAL CANIN" description="Royal Canin Alimento Seco para Gato Fit" key={index} /></Col>)}
                    </Row>
                </Container>}
            {view === 2 &&
                <Container fluid="md">
                    <h2>Accesorios para perros</h2>
                    <Row>
                        {productList.map((_, index) => <Col sm={12} md={4} lg={3}><ProductCard image="/src/assets/img/store/Accesorios_para_Perro.png" title="K9 by Zeus" description="K9 Fitness Soga Trenzada con Pelota | 30.5 cm" key={index} /></Col>)}
                    </Row>
                </Container>}
            {view === 3 &&
                <Container fluid="md">
                    <h2>Piedras y arena</h2>
                    <Row>
                        {productList.map((_, index) => <Col sm={12} md={4} lg={3}><ProductCard image="/src/assets/img/store/Piedras_y_Arena_4.png" title="CANCAT" description="CanCat Piedras Silica Gel Family Pack x 7.6L" key={index} /></Col>)}
                    </Row>
                </Container>}
            {view === 4 &&
                <Container fluid="md">
                    <h2>Cachorros</h2>
                    <Row>
                        {productList.map((_, index) => <Col sm={12} md={4} lg={3}><ProductCard image="/src/assets/img/store/Cachorros.png" title="ROYAL CANIN" description="Royal Canin Alimento Seco para Perro Hypoallergenic Puppy Canine" key={index} /></Col>)}
                    </Row>
                </Container>}
            {view === 5 &&
                <Container fluid="md">
                    <h2>Gatitos</h2>
                    <Row>
                        {productList.map((_, index) => <Col sm={12} md={4} lg={3}><ProductCard image="/src/assets/img/store/Gatitos.png" title="ROYAL CANIN" description="Royal Canin Alimento Seco para Gato Mother & Babycat" key={index} /></Col>)}
                    </Row>
                </Container>}
        </>
    )
}

export default Store