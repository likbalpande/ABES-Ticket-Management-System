import { useState } from "react";
import styles from "./styles.module.css";
import useGenerateUserRequest from "../../hooks/useGenerateUserRequest";
import useGetUserRequest from "../../hooks/useGetUserRequest";
import { DateTime } from "luxon";

const UserPanel = () => {
    const [generateRequest, setGenerateRequest] = useState(false);
    const handleCancel = (e) => {
        e?.preventDefault();
        setGenerateRequest(false);
    };
    const { getUserRequestLoading, getUserRequest, userRequestsHistory } = useGetUserRequest();
    const { generateUserRequestLoading, generateUserRequest } = useGenerateUserRequest({
        successCallback: () => {
            handleCancel();
            getUserRequest();
        },
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        const [item, quantity, amount, info] = e.target;
        generateUserRequest({
            data: {
                itemName: item.value,
                quantity: quantity.value,
                amount: amount.value,
                extraInfo: info.value,
            },
        });
    };
    return (
        <div className={styles.userPanelContainer}>
            {generateRequest ? (
                <div className={styles.formContainer}>
                    <form onSubmit={handleSubmit}>
                        <label>Item</label>
                        <input required type="text" name="itemName"></input>
                        <label>Quantity</label>
                        <input required type="text" name="quantity"></input>
                        <label>Amount</label>
                        <input required type="number" name="amount"></input>
                        <label>Extra Information</label>
                        <textarea required rows="2" cols="15" name="extraInfo"></textarea>
                        <button style={{ width: "100%" }} disabled={generateUserRequestLoading}>
                            {generateUserRequestLoading ? "Loading ..." : "Submit Request"}
                        </button>
                        <button
                            style={{ width: "100%", marginTop: "12px", backgroundColor: "white", color: "black" }}
                            onClick={handleCancel}
                            disabled={generateUserRequestLoading}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            ) : (
                <div
                    disabled={generateUserRequestLoading}
                    className={styles.generateRequestContainer}
                    onClick={() => setGenerateRequest(!generateRequest)}
                >
                    <button>Generate Request</button>
                </div>
            )}
            <hr className={styles.horizontalRule} />
            <div>
                <h2>History</h2>
                {getUserRequestLoading ? (
                    <h4>Loading ...</h4>
                ) : (
                    <div className={styles.historyCardContainer}>
                        {userRequestsHistory.map((elem) => {
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
                                    <p className={`${styles.requestStatus} ${styles[elem.status]}`}>{elem.status}</p>
                                    <p className={styles.createdOn}>
                                        {DateTime.fromISO(elem?.createdAt)
                                            .toLocaleString(DateTime.DATETIME_MED)
                                            .toString()}
                                    </p>
                                    {elem.status != "pending" && (
                                        <p className={styles.createdOn}>
                                            {DateTime.fromISO(elem?.updatedAt)
                                                .toLocaleString(DateTime.DATETIME_MED)
                                                .toString()}
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserPanel;
