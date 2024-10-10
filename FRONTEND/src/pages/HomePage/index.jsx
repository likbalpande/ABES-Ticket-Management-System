import UserPanel from "../../components/UserPanel";
import AdminPanel from "../../components/AdminPanel";
import Navbar from "../../components/Navbar";
import { useAppContext } from "../../context/AppContext";

function HomePage() {
    const { user = {} } = useAppContext();
    const { isAdmin = false } = user;
    return (
        <>
            <Navbar />
            <h3 style={{ padding: "8px", margin: "-42px auto 8px", width: "fit-content", backgroundColor: "white" }}>
                ABES Request Management System
            </h3>
            {isAdmin ? <AdminPanel /> : <UserPanel />}
        </>
    );
}

export default HomePage;
