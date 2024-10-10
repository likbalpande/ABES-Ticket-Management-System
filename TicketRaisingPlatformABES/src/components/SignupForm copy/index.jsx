import { useState } from "react";
import styles from "./styles.module.css";
import useSignup from "../../hooks/useSignup.js";
import Navbar from "../Navbar/index.js";

const SignupForm = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [rollNumber, setRollNumber] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { loading, errorMessage, handleSignup } = useSignup();

    if (loading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className={styles.signupForm}>
                <h2>Signup</h2>
                <form onSubmit={handleSignup}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="rollNumber">Roll Number:</label>
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
                    <button type="submit">Signup</button>
                    {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                </form>
            </div>
        </>
    );
};

export default SignupForm;
