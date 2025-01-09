import Stack from 'react-bootstrap/Stack';
import style from "../styles/PlanBanner.module.css"
import { useNavigate } from 'react-router-dom';

const Plan = ({ title, bgImage }) => {

    const navigate = useNavigate();

    return (
        <div className={style.planWrapper} style={{ backgroundImage: `url(${bgImage})` }}>
            <h2 className={style.planTitle}>{title}</h2>
            <button className={style.planButton} onClick={() => navigate("/acerca-planes")}>
                <p className={`${style.buttonContent} m-0`}>Solicitar asesoramiento</p>
                <p className='m-0'>&gt;</p>
            </button>
        </div>
    )
}


const PlansBanner = () => {
    return (
        <Stack gap={0} className='my-3'>
            <div><Plan title="Primeros Pasos" bgImage="https://res.cloudinary.com/dqpq2d0es/image/upload/o_60/v1735663012/cat-puppy_j2utls.jpg" /></div>
            <div><Plan title="Madurando" bgImage="https://res.cloudinary.com/dqpq2d0es/image/upload/o_60/v1735663013/dog-madurando_vowfjo.jpg" /></div>
            <div><Plan title="Adultos" bgImage="https://res.cloudinary.com/dqpq2d0es/image/upload/o_60/v1735663012/dog-adultos_g4g5rq.jpg" /></div>
        </Stack>
    )
}

export default PlansBanner