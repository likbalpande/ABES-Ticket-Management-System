import { useAppContext } from "../../context/AppContext";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

function Navbar() {
    const { isUserLoggedIn, userLogout, user = {} } = useAppContext();
    const { isAdmin = false, username = "Guest" } = user;
    return (
        <nav className={styles.navbar}>
            <ul>
                {isUserLoggedIn ? (
                    <>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link onClick={userLogout}>Logout</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/signup">Sign up</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </>
                )}
            </ul>
            <div className={styles.isAdminUserCard}>
                {username} ({isAdmin ? "Admin" : "User"})
            </div>
        </nav>
    );
}

export default Navbar;
