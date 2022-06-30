import React from "react";

import { footer as strings, loginHeader } from "../../constants/strings";

const LoginFooter = () => {
    return (
        <div className="login-footer" style={{ marginTop: "5rem" }}>
            <div className="row links">
                <div className="col-sm col-md-3 pl-15">
                    <h4
                        style={{
                            fontSize: "1.3rem!important",
                            marginBottom: "1.5rem",
                        }}
                    >
                        {strings.text9}
                    </h4>
                    <ul>
                        <li>
                            <a href="/">{loginHeader.text1}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default LoginFooter;
