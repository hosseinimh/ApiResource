import React from "react";
import { iconsPath } from "../../constants";

import { loginHeader as strings } from "../../constants/strings";

const LoginHeader = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand" href="/">
                    <img src={`${iconsPath}/logo.svg`} alt="logo" />
                </a>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav mb-2 mb-lg-0 px-5">
                        <li className="nav-item">
                            <a
                                className="nav-link active"
                                aria-current="page"
                                href="/"
                            >
                                {strings.text1}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default LoginHeader;
