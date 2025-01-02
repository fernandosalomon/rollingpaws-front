const ArrowDown = ({ width, height, color }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill={color ? color : "currentColor"} className="bi bi-chevron-compact-down" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67" />
        </svg>
    )
}


const CustomIcons = ({ variant, width, height, color, className }) => {
    return (<div className={className}>
        {variant === "arrow-down" && <ArrowDown width={width} height={height} color={color} />}
    </div>);
}

export default CustomIcons
