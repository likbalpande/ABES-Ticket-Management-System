import { useState } from "react";
import styles from "./styles.module.css";
import useLogin from "../../hooks/useLogin.js";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { loading, errorMessage, handleLogin } = useLogin();

    if (loading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <div className={styles.LoginForm}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className={styles.inputGroup}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
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
                <button type="submit">Login</button>
                {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
            </form>
        </div>
    );
};

export default LoginForm;
