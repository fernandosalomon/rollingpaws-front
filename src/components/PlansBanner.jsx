import Stack from 'react-bootstrap/Stack';
import style from "../styles/PlanBanner.module.css"
import catPuppy from "../assets/img/planes/cat-puppy.jpg"
import dogAdult from "../assets/img/planes/dog-madurando.jpg"
import dogOld from "../assets/img/planes/dog-adultos.jpg"
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
            <div><Plan title="Primeros Pasos" bgImage={catPuppy} /></div>
            <div><Plan title="Madurando" bgImage={dogAdult} /></div>
            <div><Plan title="Adultos" bgImage={dogOld} /></div>
        </Stack>
    )
}

export default PlansBanner