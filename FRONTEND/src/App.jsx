import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AppRouter from "./AppRouter";
import { AppContextProvider } from "./context/AppContext";

function App() {
    return (
        <AppContextProvider>
            <AppRouter />
            <ToastContainer />
        </AppContextProvider>
    );
}

export default App;
