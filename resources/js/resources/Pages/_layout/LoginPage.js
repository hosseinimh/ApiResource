import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { basePath, MESSAGE_CODES, MESSAGE_TYPES } from "../../../constants";
import {
    setPageAction,
    setLoadingAction,
} from "../../../state/layout/layoutActions";
import {
    clearMessageAction,
    setMessageAction,
    setRenderMessageAction,
} from "../../../state/message/messageActions";
import { clearLogoutAction } from "../../../state/user/userActions";
import { AlertMessage, LoginFooter, LoginHeader } from "../../components";
import utils from "../../../utils/Utils";

const LoginPage = ({ children, page, errors = null }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const messageState = useSelector((state) => state.messageReducer);
    const [globalMessage, setGlobalMessage] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (typeof errors === "object" && errors) {
            const hasKeys = !!Object.keys(errors).length;

            if (hasKeys) {
                dispatch(
                    setMessageAction(
                        errors[Object.keys(errors)[0]].message,
                        MESSAGE_TYPES.ERROR,
                        MESSAGE_CODES.FORM_INPUT_INVALID,
                        true,
                        Object.keys(errors)[0]
                    )
                );
            }
        }
    }, [errors]);

    useEffect(() => {
        if (messageState?.messageType === MESSAGE_TYPES.SUCCESS) {
            setMessage(messageState);
        }
    }, [messageState]);

    useEffect(() => {
        window.scrollTo(0, 0);

        if (utils.getLSUser()) {
            dispatch(clearLogoutAction());
            navigate(`${basePath}/users/login`);

            return;
        }

        dispatch(setPageAction(page));
        dispatch(setRenderMessageAction());
        dispatch(setLoadingAction(false));

        if (messageState?.messageField || messageState?.messageRender) {
            dispatch(clearMessageAction());
        }

        let gMessage = localStorage.getItem("globalMessage");

        if (gMessage) {
            try {
                setGlobalMessage(JSON.parse(gMessage));
            } catch {}
            localStorage.removeItem("globalMessage");
        }
    }, []);

    return (
        <>
            <LoginHeader />
            <div className="bg-light d-flex flex-row align-items-center">
                <div className="container">
                    <div className="row justify-content-center">
                        {globalMessage && (
                            <div className="col-lg-8">
                                <AlertMessage
                                    message={globalMessage?.message}
                                    messageType={
                                        globalMessage?.type === 0
                                            ? MESSAGE_TYPES.ERROR
                                            : MESSAGE_TYPES.SUCCESS
                                    }
                                />
                            </div>
                        )}
                        {message && (
                            <div className="col-lg-8">
                                <AlertMessage
                                    message={message?.message}
                                    messageType={message?.messageType}
                                />
                            </div>
                        )}
                        {children}
                    </div>
                </div>
            </div>
            <LoginFooter />
        </>
    );
};

export default LoginPage;
