import "./App.css";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { useAppContext } from "./context/AppContext";

function AppRouter() {
    const { isUserLoggedIn } = useAppContext();

    const router = createBrowserRouter([
        {
            path: "/",
            element: isUserLoggedIn ? <HomePage /> : <Navigate to="/login" />,
        },
        {
            path: "/signup",
            element: isUserLoggedIn ? <HomePage /> : <SignupPage />,
        },
        {
            path: "/login",
            element: isUserLoggedIn ? <HomePage /> : <LoginPage />,
        },
    ]);
    return <RouterProvider router={router}></RouterProvider>;
}

export default AppRouter;
