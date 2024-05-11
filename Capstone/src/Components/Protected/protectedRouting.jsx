import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    const auth = JSON.parse(localStorage.getItem('auth')) || { token: false };
    return auth.token ? <Outlet /> : <Navigate to="/login" />;
};


export default PrivateRoutes