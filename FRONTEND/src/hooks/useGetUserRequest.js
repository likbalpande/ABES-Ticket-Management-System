import { useEffect, useState } from "react";
import { axiosInstance } from "../axios/axiosInstance";
import { handleAPIError, handleAPISuccess } from "../utils/apiError";

const useGetUserRequest = () => {
    const [getUserRequestLoading, setGetUserRequestLoading] = useState(false);
    const [userRequestsHistory, setUserRequestsHistory] = useState([]);

    const getUserRequest = async () => {
        setGetUserRequestLoading(true);
        try {
            const response = await axiosInstance.get("/api/v1/user-request");
            handleAPISuccess(response);
            setUserRequestsHistory(response?.data?.data || []);
        } catch (err) {
            handleAPIError(err);
        } finally {
            setGetUserRequestLoading(false);
        }
    };

    useEffect(() => {
        getUserRequest();
    }, []);

    return {
        getUserRequestLoading,
        getUserRequest,
        userRequestsHistory,
    };
};

export default useGetUserRequest;
