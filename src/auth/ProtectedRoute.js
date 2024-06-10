import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const protectedRoute = ({component}) => {
    const user = useSelector((state) => state.user)

    if (!user) {
        return <Navigate to="/" />
    } 

    return component
}

export default protectedRoute