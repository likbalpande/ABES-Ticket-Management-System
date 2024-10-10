import { useState } from "react";
import { axiosInstance } from "../axios/axiosInstance";
import { handleAPIError, handleAPISuccess } from "../utils/apiError";

const useRequestStatusChange = ({ successCallback = () => {} }) => {
    const [requestStatusChangeLoading, setRequestStatusChangeLoading] = useState(false);

    const requestStatusChange = async ({ status, _id }) => {
        setRequestStatusChangeLoading(true);
        try {
            const response = await axiosInstance.post("/api/v1/admin/request-status", {
                status,
                _id,
            });
            handleAPISuccess(response);
            successCallback();
        } catch (err) {
            handleAPIError(err);
        } finally {
            setRequestStatusChangeLoading(false);
        }
    };

    return {
        requestStatusChangeLoading,
        requestStatusChange,
    };
};

export default useRequestStatusChange;
