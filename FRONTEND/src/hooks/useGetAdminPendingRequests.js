import { useEffect, useState } from "react";
import { axiosInstance } from "../axios/axiosInstance";
import { handleAPIError, handleAPISuccess } from "../utils/apiError";

const useGetAdminPendingRequests = () => {
    const [adminPendingRequestsLoading, setAdminPendingRequestsLoading] = useState(false);
    const [adminPendingRequests, setAdminPendingRequests] = useState([]);

    const getAdminPendingRequests = async () => {
        setAdminPendingRequestsLoading(true);
        try {
            const response = await axiosInstance.get("/api/v1/admin/pending-requests");
            handleAPISuccess(response);
            setAdminPendingRequests(response?.data?.data || []);
        } catch (err) {
            handleAPIError(err);
        } finally {
            setAdminPendingRequestsLoading(false);
        }
    };

    useEffect(() => {
        getAdminPendingRequests();
    }, []);

    return {
        adminPendingRequestsLoading,
        getAdminPendingRequests,
        adminPendingRequests,
    };
};

export default useGetAdminPendingRequests;
