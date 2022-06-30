import React from "react";

import { MESSAGE_TYPES } from "../../constants";

const AlertMessage = ({ message, code = "", messageType }) => {
    if (message) {
        return (
            <div
                className={`alert ${
                    messageType === MESSAGE_TYPES.SUCCESS
                        ? "alert-success"
                        : "alert-danger"
                }`}
                role="alert"
            >
                {`${message} `}
                {code ? `(${code})` : ""}
            </div>
        );
    }

    return <></>;
};

export default AlertMessage;
