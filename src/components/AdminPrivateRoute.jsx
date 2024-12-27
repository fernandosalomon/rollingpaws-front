import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminPrivateRoute = ({ children }) => {
    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role");
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/")
        } else if (role !== "admin") {
            navigate("/")
        }
    }, [])

    return children;
}

export default AdminPrivateRoute