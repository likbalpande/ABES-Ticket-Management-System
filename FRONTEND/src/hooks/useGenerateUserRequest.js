import { useState } from "react";
import { axiosInstance } from "../axios/axiosInstance";
import { handleAPIError, handleAPISuccess } from "../utils/apiError";

const useGenerateUserRequest = ({ successCallback = () => {} }) => {
    const [generateUserRequestLoading, setGenerateUserRequestLoading] = useState(false);

    const generateUserRequest = async ({ data }) => {
        const { itemName, quantity, amount, extraInfo } = data || {};
        setGenerateUserRequestLoading(true);
        try {
            const response = await axiosInstance.post("/api/v1/user-request", {
                itemName,
                quantity,
                amount,
                extraInfo,
            });
            handleAPISuccess(response);
            successCallback();
        } catch (err) {
            handleAPIError(err);
        } finally {
            setGenerateUserRequestLoading(false);
        }
    };

    return {
        generateUserRequestLoading,
        generateUserRequest,
    };
};

export default useGenerateUserRequest;
