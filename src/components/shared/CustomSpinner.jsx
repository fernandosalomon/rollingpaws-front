import style from "../../styles/CustomSpinner.module.css"

const CustomSpinner = ({ className, size }) => {
    return (
        <div className={`d-flex justify-content-center align-items-center my-4 ${size === "lg" ? style.spinnerBig : size === "sm" ? style.spinnerSmall : style.spinnerBig} ${className}`}>
            <div className={style.loader}></div>
        </div>
    )
}

export default CustomSpinner