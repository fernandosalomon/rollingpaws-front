import { useEffect, useState } from "react"
import style from "../styles/OurProducts.module.css"
import Image from "react-bootstrap/Image"

const OurProducts = () => {
    const [rotateDeg, setRotateDeg] = useState(0);

    const handleRotate = () => {
        if (rotateDeg < 270) {
            setRotateDeg(rotateDeg + 90)
        } else {
            setRotateDeg(0)
        }
    }

    useEffect(() => {
        const timeoutID = setTimeout(() => {
            handleRotate();
        }, 2000)

        return () => clearTimeout(timeoutID);
    }, [rotateDeg])

    return (
        <>
            <div className={style.container}>
                <div className={style.productsWrapper} style={{ transform: `rotateZ(${rotateDeg}deg)` }}>
                    <div className={`${style.imageContainer}`} style={{ transform: `rotateZ(-${rotateDeg}deg)` }}>
                    </div>
                    <div className={`${style.imageContainer}`} style={{ transform: `rotateZ(-${rotateDeg}deg)` }}>
                        <Image src="https://res.cloudinary.com/dqpq2d0es/image/upload/v1735663202/products1_vrkar0.svg" alt="Alimentos para mascota" height={"250px"} style={{ zIndex: 3 }} />
                    </div>
                    <div className={`${style.imageContainer}`} style={{ transform: `rotateZ(-${rotateDeg}deg)` }}></div>
                    <div className={`${style.imageContainer}`} style={{ transform: `rotateZ(-${rotateDeg}deg)` }}>
                        <Image src="https://res.cloudinary.com/dqpq2d0es/image/upload/v1735663205/products2_bemrql.svg" alt="Accesorios para mascotas" height={"250px"} style={{ zIndex: 3 }} />
                    </div>
                    <div className={`${style.imageContainer}`} style={{ transform: `rotateZ(-${rotateDeg}deg)` }}></div>
                    <div className={`${style.imageContainer}`} style={{ transform: `rotateZ(-${rotateDeg}deg)` }}>
                        <Image src="https://res.cloudinary.com/dqpq2d0es/image/upload/v1735663204/products3_mcsmow.svg" alt="Farmacia e higiene" height={"250px"} style={{ zIndex: 3 }} />
                    </div>
                    <div className={`${style.imageContainer}`} style={{ transform: `rotateZ(-${rotateDeg}deg)` }}></div>
                    <div className={`${style.imageContainer}`} style={{ transform: `rotateZ(-${rotateDeg}deg)` }}>
                        <Image src="https://res.cloudinary.com/dqpq2d0es/image/upload/v1735663205/products4_cnmzk6.svg" alt="Y mucho más..." height={"250px"} style={{ zIndex: 3 }} />
                    </div>
                    <div className={`${style.imageContainer}`} style={{ transform: `rotateZ(-${rotateDeg}deg)` }}></div>
                </div>
                <div className={style.circle}></div>
            </div>
        </>

    )
}

export default OurProducts