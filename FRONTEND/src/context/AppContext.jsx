import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("auth-user")) || {});

    console.log("\n✅ : loggedInUser:", loggedInUser);

    const { isUserLoggedIn, ...user } = loggedInUser;

    const userLogin = ({ username, email, isAdmin }) => {
        const data = {
            username,
            email,
            isAdmin,
            isUserLoggedIn: true,
        };
        setLoggedInUser(data);
        localStorage.setItem("auth-user", JSON.stringify(data));
    };

    const userLogout = () => {
        setLoggedInUser({});
        localStorage.removeItem("auth-user");
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
