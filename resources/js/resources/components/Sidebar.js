import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";

import { vendorsPath, iconsPath, basePath, rootPath } from "../../constants";
import { sidebar as strings, general } from "../../constants/strings";
import utils from "../../utils/Utils";
import { fetchLogoutAction } from "../../state/user/userActions";
import { CustomLink } from "./";

function Sidebar() {
    const lsUser = utils.getLSUser();
    let forceShow = true;
    const state = useSelector((state) => state.layoutReducer);
    const [page, setPage] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        setPage(state?.page);

        const sidebar = document.querySelector("#sidebar");

        if (sidebar && window.innerWidth <= 767) {
            if (sidebar?.classList.contains("show")) {
                sidebar?.classList.remove("show");
                sidebar?.classList.add("hide");
            }
        }

        forceShow = true;
    }, [state]);

    useEffect(() => {
        const wrapper = document.querySelector(".wrapper");
        const sidebar = document.querySelector("#sidebar");
        const headerToggler = document.querySelector(".header-toggler");

        wrapper?.addEventListener("click", wrapperClick);
        headerToggler.removeEventListener("click", toggleHideSidebar);
        headerToggler.addEventListener("click", toggleHideSidebar);

        if (window.innerWidth > 767) {
            sidebar?.classList.remove("hide");
            sidebar?.classList.add("show");
        }
    }, []);

    const wrapperClick = (e) => {
        const sidebar = document.querySelector("#sidebar");

        if (sidebar && !forceShow && window.innerWidth <= 767) {
            if (sidebar?.classList.contains("show")) {
                sidebar?.classList.remove("show");
                sidebar?.classList.add("hide");
            }
        }

        forceShow = false;
    };

    const toggleHideSidebar = (e) => {
        e.preventDefault();

        const sidebar = document.querySelector("#sidebar");

        if (sidebar) {
            if (sidebar?.classList.contains("show")) {
                forceShow = false;

                sidebar?.classList.remove("show");
                sidebar?.classList.add("hide");

                return;
            }

            forceShow = true;

            sidebar?.classList.remove("hide");
            sidebar?.classList.add("show");
        }
    };

    const onLogout = () => {
        dispatch(fetchLogoutAction());
    };

    const renderLinks = () => (
        <>
            <li className="nav-item">
                <Link
                    className={
                        page === "Users" ? "nav-link active" : "nav-link"
                    }
                    to={`${basePath}/users`}
                >
                    <svg className="nav-icon">
                        <use
                            xlinkHref={`${vendorsPath}/@coreui/icons/svg/free.svg#cil-group`}
                        ></use>
                    </svg>
                    {strings.users}
                </Link>
                <Link
                    className={
                        page === "Categories" ? "nav-link active" : "nav-link"
                    }
                    to={`${basePath}/categories`}
                >
                    <svg className="nav-icon">
                        <use
                            xlinkHref={`${vendorsPath}/@coreui/icons/svg/free.svg#cil-group`}
                        ></use>
                    </svg>
                    {strings.categories}
                </Link>
            </li>
        </>
    );

    return (
        <>
            <div
                className="sidebar sidebar-dark sidebar-fixed d-print-none"
                id="sidebar"
            >
                <div
                    className="sidebar-brand d-md-flex flex-column bg-info"
                    style={{ paddingBottom: "0.7rem" }}
                >
                    <a href={rootPath} style={{ color: "#fff" }}>
                        <img
                            src={`${iconsPath}/logo.svg`}
                            alt="logo"
                            style={{
                                width: "100px",
                                marginTop: "1rem",
                                marginBottom: "1rem",
                            }}
                        />
                        <p>{general.brand}</p>
                    </a>
                    <small>{general.admin}</small>
                </div>
                <SimpleBar className="sidebar-nav" data-coreui="navigation">
                    <li className="nav-item">
                        <Link
                            className={
                                page === "Dashboard"
                                    ? "nav-link active"
                                    : "nav-link"
                            }
                            to={`${basePath}`}
                        >
                            <svg className="nav-icon">
                                <use
                                    xlinkHref={`${vendorsPath}/@coreui/icons/svg/free.svg#cil-speedometer`}
                                ></use>
                            </svg>
                            {strings.dashboard}
                        </Link>
                    </li>
                    {renderLinks()}
                    <li className="nav-item">
                        <Link
                            className={
                                page === "ViewUser"
                                    ? "nav-link active"
                                    : "nav-link"
                            }
                            to={`${basePath}/users/view`}
                        >
                            <svg className="nav-icon">
                                <use
                                    xlinkHref={`${vendorsPath}/@coreui/icons/svg/free.svg#cil-user`}
                                ></use>
                            </svg>
                            {strings.viewUser}
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            className={
                                page === "ChangePassword"
                                    ? "nav-link active"
                                    : "nav-link"
                            }
                            to={`${basePath}/users/change_password`}
                        >
                            <svg className="nav-icon">
                                <use
                                    xlinkHref={`${vendorsPath}/@coreui/icons/svg/free.svg#cil-pencil`}
                                ></use>
                            </svg>
                            {strings.changePassword}
                        </Link>
                    </li>
                    <li className="nav-item">
                        <CustomLink className="nav-link" onClick={onLogout}>
                            <svg className="nav-icon">
                                <use
                                    xlinkHref={`${vendorsPath}/@coreui/icons/svg/free.svg#cil-account-logout`}
                                ></use>
                            </svg>
                            {strings.logout}
                        </CustomLink>
                    </li>
                </SimpleBar>
            </div>
        </>
    );
}

export default Sidebar;
