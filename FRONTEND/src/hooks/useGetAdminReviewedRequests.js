import { useEffect, useState } from "react";
import { axiosInstance } from "../axios/axiosInstance";
import { handleAPIError, handleAPISuccess } from "../utils/apiError";

const useGetAdminReviewedRequests = () => {
    const [adminReviewedRequestsLoading, setAdminReviewedRequestsLoading] = useState(false);
    const [adminReviewedRequests, setAdminReviewedRequests] = useState([]);

    const getAdminReviewedRequests = async () => {
        setAdminReviewedRequestsLoading(true);
        try {
            const response = await axiosInstance.get("/api/v1/admin/reviewed-requests");
            handleAPISuccess(response);
            setAdminReviewedRequests(response?.data?.data || []);
        } catch (err) {
            handleAPIError(err);
        } finally {
            setAdminReviewedRequestsLoading(false);
        }
    };

    useEffect(() => {
        getAdminReviewedRequests();
    }, []);

    return {
        adminReviewedRequestsLoading,
        getAdminReviewedRequests,
        adminReviewedRequests,
    };
};

export default useGetAdminReviewedRequests;
