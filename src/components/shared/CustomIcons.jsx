import Image from "react-bootstrap/Image"
import hospitalPaw from "../../assets/icons/hospitalPaw.svg"
import hospitalBuilding from "../../assets/icons/hospitalBuilding.svg"
import surgeryInstruments from "../../assets/icons/surgeryInstruments.svg"
import microscope from "../../assets/icons/microscope.svg"
import stethoscope from "../../assets/icons/stethoscope.svg"
import hairdresser from "../../assets/icons/hairdresser.svg"
import pill from "../../assets/icons/pill.svg"

const handleIcon = (iconName) => {
    switch(true){
        case iconName === "hospitalPaw" : return hospitalPaw;
        case iconName === "hospitalBuilding" : return hospitalBuilding;
        case iconName === "surgeryInstruments" : return surgeryInstruments;
        case iconName === "microscope" : return microscope;
        case iconName === "stethoscope" : return stethoscope;
        case iconName === "hairdresser" : return hairdresser;
        case iconName === "pill" : return pill;
    } 
}

const CustomIcons = ({variant, width, height, color, className}) => {
  return (
    <Image width={width} height={height} color={color} className={className} src={handleIcon(variant)}/>
  )
}

export default CustomIcons
