import { useState } from "react";
import styles from "./styles.module.css";
import useSignup from "../../hooks/useSignup.js";

const SignupForm = () => {
    const [username, setUsername] = useState("");
    const [rollNumber, setRollNumber] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otp, setOtp] = useState("");

    const {
        email,
        setEmail,
        signupLoading,
        otpLoading,
        errorMessage,
        isOTPGenerated,
        handleGenerateOTP,
        handleSignup,
    } = useSignup();

    if (signupLoading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <div className={styles.signupForm}>
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
                <div className={styles.inputGroup}>
                    <label htmlFor="email">Email:</label>
                    <input
                        disabled={isOTPGenerated}
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="username">Name:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="rollNumber">Roll Number / Academic Id Number (Optional):</label>
                    <input
                        type="text"
                        id="rollNumber"
                        value={rollNumber}
                        onChange={(e) => setRollNumber(e.target.value)}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                {isOTPGenerated && (
                    <>
                        <div className={styles.inputGroup}>
                            <label htmlFor="otp">OTP (email):</label>
                            <input
                                type="number"
                                id="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Signup</button>
                    </>
                )}
                {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
            </form>
            {!isOTPGenerated && (
                <button disabled={otpLoading} onClick={handleGenerateOTP}>
                    {otpLoading ? "Generating ..." : "Generate OTP"}
                </button>
            )}
        </div>
    );
};

export default SignupForm;
