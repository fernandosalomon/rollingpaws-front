import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom"
import FormC from "../components/shared/FormC";
import style from "../styles/ForgotPassword.module.css"


const ForgotPassword = () => {
    const { auth } = useParams();

    return (
        <Container className={style.container} fluid="md">
            <h2 className="fs-1 text-center mb-4">Recuperar contraseña</h2>
            <p className="fs-4 text-center">Ingresa tu nueva contraseña</p>
            <FormC variant="change-password-token" data={auth} />
        </Container>
    )
}

export default ForgotPassword