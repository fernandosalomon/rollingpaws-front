import { Container } from "react-bootstrap"
import style from "../../styles/CustomSpinner.module.css"

const CustomSpinner = ({ className }) => {
    return (
        <Container className={`w-100 d-flex justify-content-center align-items-center my-4 ${className}`}>
            <div className={style.loader}></div>
        </Container>
    )
}

export default CustomSpinner