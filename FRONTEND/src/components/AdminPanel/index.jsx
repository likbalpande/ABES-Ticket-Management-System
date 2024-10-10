import styles from "./styles.module.css";
import useGetAdminPendingRequests from "../../hooks/useGetAdminPendingRequests";
import useGetAdminReviewedRequests from "../../hooks/useGetAdminReviewedRequests";
import { DateTime } from "luxon";
import useRequestStatusChange from "../../hooks/useRequestStatusChange";

const AdminPanel = () => {
    const { adminPendingRequestsLoading, getAdminPendingRequests, adminPendingRequests } = useGetAdminPendingRequests();

    const { adminReviewedRequestsLoading, getAdminReviewedRequests, adminReviewedRequests } =
        useGetAdminReviewedRequests();

    const { requestStatusChangeLoading, requestStatusChange } = useRequestStatusChange({
        successCallback: () => {
            getAdminPendingRequests();
            getAdminReviewedRequests();
        },
    });

    const handleRequestStatusChange = (newStatus, _id) => {
        if (!requestStatusChangeLoading)
            requestStatusChange({
                status: newStatus,
                _id: _id,
            });
    };

    return (
        <div className={styles.userPanelContainer}>
            <div>
                <h2>Pending requests</h2>
                {adminPendingRequestsLoading ? (
                    <h4>Loading ...</h4>
                ) : (
                    <div className={styles.historyCardContainer}>
                        {adminPendingRequests.map((elem) => {
                            return (
                                <div className={styles.historyCard} key={elem._id}>
                                    <label>
                                        Item: <b>{elem.itemName}</b>
                                    </label>
                                    <label>
                                        Quantity: <b>{elem.quantity}</b>
                                    </label>
                                    <label>
                                        Amount: <b>{elem.amount}</b>
                                    </label>
                                    <label>
                                        Amount: <b>{elem.extraInfo}</b>
                                    </label>
                                    <hr />
                                    <label title={elem.email}>
                                        Email: <b>{elem.email}</b>
                                    </label>
                                    <hr />
                                    <p className={`${styles.requestStatus} ${styles[elem.status]}`}>{elem.status}</p>
                                    <p className={styles.createdOn}>
                                        {DateTime.fromISO(elem?.createdAt)
                                            .toLocaleString(DateTime.DATETIME_MED)
                                            .toString()}
                                    </p>
                                    <hr />
                                    <div className={styles.cardActionButtons}>
                                        <span
                                            className={requestStatusChangeLoading ? styles.disabled : ""}
                                            onClick={() => handleRequestStatusChange("accepted", elem._id)}
                                        >
                                            ✅
                                        </span>
                                        <span
                                            className={requestStatusChangeLoading ? styles.disabled : ""}
                                            onClick={() => handleRequestStatusChange("rejected", elem._id)}
                                        >
                                            ❌
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            <hr className={styles.horizontalRule} />
            <div>
                <h2>Reviewed requests</h2>
                {adminReviewedRequestsLoading ? (
                    <h4>Loading ...</h4>
                ) : (
                    <div className={styles.historyCardContainer}>
                        {adminReviewedRequests.map((elem) => {
                            return (
                                <div className={styles.historyCard} key={elem._id}>
                                    <label>
                                        Item: <b>{elem.itemName}</b>
                                    </label>
                                    <label>
                                        Quantity: <b>{elem.quantity}</b>
                                    </label>
                                    <label>
                                        Amount: <b>{elem.amount}</b>
                                    </label>
                                    <label>
                                        Amount: <b>{elem.extraInfo}</b>
                                    </label>
                                    <hr />
                                    <label title={elem.email}>
                                        Email: <b>{elem.email}</b>
                                    </label>
                                    <hr />
                                    <p className={`${styles.requestStatus} ${styles[elem.status]}`}>{elem.status}</p>
                                    <p className={styles.createdOn}>
                                        {DateTime.fromISO(elem?.createdAt)
                                            .toLocaleString(DateTime.DATETIME_MED)
                                            .toString()}
                                    </p>
                                    <p className={styles.createdOn}>
                                        {DateTime.fromISO(elem?.updatedAt)
                                            .toLocaleString(DateTime.DATETIME_MED)
                                            .toString()}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;
