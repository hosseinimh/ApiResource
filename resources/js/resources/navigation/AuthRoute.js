import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { Navigate, Route } from "react-router";

import * as Pages from "../Pages";
import { Header, Sidebar } from "../components";
import { footer as strings } from "../../constants/strings";
import utils from "../../utils/Utils";
import { basePath } from "../../constants";

function AuthRoute() {
    const state = useSelector((state) => state.userReducer);
    const layoutState = useSelector((state) => state.layoutReducer);
    const [auth, setAuth] = useState(state.isAuthenticated);
    const lsUser = utils.getLSUser();

    useEffect(() => {
        validateAuth();
    }, [state]);

    const validateAuth = () => {
        try {
            if (!state.isAuthenticated || !lsUser || !lsUser?.id) {
                utils.clearLS();
                setAuth(false);
            } else {
                setAuth(true);
            }
        } catch (error) {
            utils.clearLS();
            setAuth(false);
        }
    };

    return (
        <Router>
            {auth && <Sidebar />}
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                {auth && (
                    <>
                        <Header />
                        <Routes>
                            <Route
                                path={`${basePath}/users/view/:userId`}
                                element={<Pages.ViewUser />}
                            />
                            <Route
                                path={`${basePath}/users/view`}
                                element={<Pages.ViewUser />}
                            />
                            <Route
                                path={`${basePath}/users/edit/:userId`}
                                element={<Pages.EditUser />}
                            />
                            <Route
                                path={`${basePath}/users/change_password/:userId`}
                                element={<Pages.ChangePassword />}
                            />
                            <Route
                                path={`${basePath}/users/change_password`}
                                element={<Pages.ChangePassword />}
                            />
                            <Route
                                path={`${basePath}/users`}
                                element={<Pages.Users />}
                            />
                            <Route
                                path={`${basePath}/categories/add`}
                                element={<Pages.AddCategory />}
                            />
                            <Route
                                path={`${basePath}/categories/edit/:categoryId`}
                                element={<Pages.EditCategory />}
                            />
                            <Route
                                path={`${basePath}/categories`}
                                element={<Pages.Categories />}
                            />
                            <Route
                                path={`${basePath}/books/edit/:bookId`}
                                element={<Pages.EditBook />}
                            />
                            <Route
                                path={`${basePath}/books`}
                                element={<Pages.Books />}
                            />
                            <Route
                                path={`${basePath}`}
                                element={<Pages.Dashboard />}
                            />
                            <Route
                                path="*"
                                element={<Navigate to={`${basePath}`} />}
                            />
                        </Routes>
                    </>
                )}
                {!auth && (
                    <Routes>
                        <Route
                            path={`${basePath}/users/login`}
                            exact={true}
                            element={<Pages.Login />}
                        />
                        <Route
                            path="*"
                            element={
                                <Navigate to={`${basePath}/users/login`} />
                            }
                        />
                    </Routes>
                )}
                <footer className="footer d-print-none">
                    <div className="container-fluid sub-footer">
                        <p>{strings.text14}</p>
                        <p className="developer">
                            <a
                                href="http://www.hosseinimh.com"
                                target={"_blank"}
                                className="link"
                            >
                                {strings.text15}
                            </a>
                        </p>
                    </div>
                </footer>
                <div
                    className="loading-wrapper"
                    style={{
                        display: layoutState?.loading ? "flex" : "none",
                    }}
                >
                    <div className="loading"></div>
                    <p>{strings.loading}</p>
                </div>
            </div>
        </Router>
    );
}

export default AuthRoute;
