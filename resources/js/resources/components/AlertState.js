import React, { useState, useEffect } from "react";
import utils from "../../utils/Utils";
import { useSelector } from "react-redux";

import { MESSAGE_TYPES } from "../../constants";

const AlertState = () => {
    const messageState = useSelector((state) => state.messageReducer);
    const [message, setMessage] = useState(null);
    const [code, setCode] = useState(0);
    const [type, setType] = useState(0);

    useEffect(() => {
        if (
            messageState?.messageType === MESSAGE_TYPES.ERROR ||
            messageState?.messageType === MESSAGE_TYPES.SUCCESS
        ) {
            try {
                if (messageState?.message) {
                    if (messageState?.messageRender) {
                        setMessage(messageState?.message.toString());
                        setCode(messageState?.messageCode.toString());
                        setType(messageState?.messageType);
                    }
                }
            } catch {}
        } else {
            setMessage(null);
        }
    }, [messageState]);

    if (message) {
        return (
            <div
                className={`alert ${
                    type === MESSAGE_TYPES.ERROR
                        ? "alert-danger"
                        : "alert-success"
                }`}
                role="alert"
            >
                {`${message} (${code}) `}
            </div>
        );
    }

    return <></>;
};

export default AlertState;
