import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const PrivateRoute = ({ children }) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/")
        }
    }, [])

    return children;
}

export default PrivateRoute