import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../axios/axiosInstance";
import { handleAPIError, handleAPISuccess } from "../utils/apiError";

const useSignup = () => {
    const [signupLoading, setSignupLoading] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isOTPGenerated, setIsOTPGenerated] = useState(false);
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const handleGenerateOTP = async (e) => {
        e.preventDefault();
        setOtpLoading(true);
        try {
            const response = await axiosInstance.post("/api/v1/otp/generate", {
                email,
            });
            handleAPISuccess(response);
            setIsOTPGenerated(true);
            setErrorMessage("");
        } catch (err) {
            setErrorMessage(handleAPIError(err));
            setIsOTPGenerated(false);
        } finally {
            setOtpLoading(false);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const [email, username, rollNumber, phoneNumber, password, confirmPassword, otp] = e.target;
        if (password.value !== confirmPassword.value) {
            setErrorMessage("Password and confirm password do not match !");
            return;
        }

        setSignupLoading(true);
        try {
            const response = await axiosInstance.post("/api/v1/auth/signup", {
                email: email.value,
                username: username.value,
                rollNumber: rollNumber.value,
                phoneNumber: phoneNumber.value,
                password: password.value,
                otp: otp.value,
            });
            handleAPISuccess(response);
            setErrorMessage("");
            navigate("/login");
        } catch (err) {
            setErrorMessage(handleAPIError(err));
        } finally {
            setSignupLoading(false);
        }
    };

    return {
        email,
        setEmail,
        isOTPGenerated,
        handleGenerateOTP,
        handleSignup,
        errorMessage,
        signupLoading,
        otpLoading,
    };
};

export default useSignup;
