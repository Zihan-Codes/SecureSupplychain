import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser } from "../actions/userActions";
import LogoutIcon from '@mui/icons-material/Logout';

const useLogout = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    dispatch(clearUser());

    const logout = () => {

        localStorage.removeItem('token');
        localStorage.removeItem('user');


        sessionStorage.clear();

        navigate('/login', {replace: true});
    };

    return logout;
};

export default useLogout;