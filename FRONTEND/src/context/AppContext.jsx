import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("auth-user")) || {});

    console.log("\n✅ : loggedInUser:", loggedInUser);

    const { isUserLoggedIn, ...user } = loggedInUser;

    const userLogin = ({ username, email, token, isAdmin }) => {
        const data = {
            username,
            email,
            isAdmin,
            token,
            isUserLoggedIn: true,
        };
        setLoggedInUser(data);
        localStorage.setItem("auth-user", JSON.stringify(data));
        localStorage.setItem("user-token", token);
    };

    const userLogout = () => {
        setLoggedInUser({});
        localStorage.removeItem("auth-user");
        localStorage.removeItem("user-token");
    };

    const value = {
        isUserLoggedIn,
        user,
        userLogin,
        userLogout,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

AppContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAppContext = () => {
    return useContext(AppContext);
};
