import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { axiosInstance } from "../axios/axiosInstance";
import { handleAPIError } from "../utils/apiError";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const { userLogin } = useAppContext();

    const handleLogin = async (e) => {
        e.preventDefault();
        const [email, password] = e.target;

        setLoading(true);
        try {
            const response = await axiosInstance.post("/api/v1/auth/login", {
                email: email.value,
                password: password.value,
            });
            console.log(response);
            userLogin({
                username: response.data.user.username,
                email: response.data.user.email,
                isAdmin: response.data.user.isAdmin,
                token: response.data.user.token,
            });
        } catch (err) {
            setErrorMessage(handleAPIError(err));
        } finally {
            setLoading(false);
        }
    };

    return { handleLogin, loading, errorMessage };
};

export default useLogin;
