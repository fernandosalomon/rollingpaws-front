import { Container } from "react-bootstrap"
import style from "../../styles/CustomSpinner.module.css"

const CustomSpinner = () => {
    return (
        <Container className="w-100 d-flex justify-content-center align-items-center my-4">
            <div className={style.loader}></div>
        </Container>
    )
}

export default CustomSpinner