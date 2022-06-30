import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BsPhone, BsFileEarmarkLock2 } from "react-icons/bs";

import { general, loginPage as strings } from "../../../constants/strings";
import { MESSAGE_CODES, MESSAGE_TYPES, rootPath } from "../../../constants";
import { loginSchema as schema } from "../../validations";
import { setLoadingAction } from "../../../state/layout/layoutActions";
import {
    clearMessageAction,
    setMessageAction,
} from "../../../state/message/messageActions";
import {
    fetchLoginAction,
    clearLogoutAction,
} from "../../../state/user/userActions";
import { AlertState } from "../../components";
import LoginPage from "../_layout/LoginPage";

const Login = () => {
    const dispatch = useDispatch();
    const layoutState = useSelector((state) => state.layoutReducer);
    const messageState = useSelector((state) => state.messageReducer);
    const state = useSelector((state) => state.userReducer);
    const [formData, setFormData] = useState(null);
    const [isCurrent, setIsCurrent] = useState(true);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        dispatch(setLoadingAction(true));
        dispatch(clearMessageAction());
        setFormData(null);

        setFormData({
            username: data.username,
            password: data.password,
        });
    };

    useEffect(() => {
        if (formData) {
            dispatch(fetchLoginAction(formData.username, formData.password));
        }
    }, [formData]);

    useEffect(() => {
        if (state?.error) {
            dispatch(setLoadingAction(false));
            dispatch(
                setMessageAction(
                    state?.error,
                    MESSAGE_TYPES.ERROR,
                    MESSAGE_CODES.FORM_INPUT_INVALID
                )
            );
        }
    }, [state]);

    useEffect(() => {
        dispatch(clearLogoutAction());
        dispatch(clearMessageAction());

        return () => {
            setIsCurrent(false);
        };
    }, []);

    const renderInputRow = (field, type = "text", placeholder = null) => {
        placeholder = placeholder
            ? placeholder
            : strings[`${field}Placeholder`];

        return (
            <div className="col-12 pb-4">
                <label className="form-label" htmlFor={field}>
                    {strings[field]}
                </label>
                <div className="input-group has-validation mb-2">
                    <span className="input-group-text">
                        {field === "username" ? (
                            <BsPhone />
                        ) : (
                            <BsFileEarmarkLock2 />
                        )}
                    </span>
                    <input
                        {...register(`${field}`)}
                        className={
                            messageState?.messageField === field
                                ? "form-control is-invalid"
                                : "form-control"
                        }
                        id={field}
                        placeholder={strings[`${field}Placeholder`]}
                        disabled={layoutState?.loading}
                        type={type}
                    />
                    {messageState?.messageField === field && (
                        <div className="invalid-feedback">
                            {messageState?.message}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    if (!isCurrent) <></>;

    return (
        <LoginPage errors={errors}>
            <div className="col-lg-8">
                <div className="card-group d-block d-md-flex row">
                    <div className="card col-md-7 p-4 mb-0">
                        <div className="card-body">
                            <h1>{strings._title}</h1>
                            <p className="text-medium-emphasis">
                                {strings.description}
                            </p>
                            <AlertState />
                            <form
                                id="loginForm"
                                method="POST"
                                action={`${rootPath}users/login_web`}
                            >
                                <div className="row">
                                    {renderInputRow("username")}
                                    {renderInputRow("password", "password")}
                                </div>
                            </form>
                            <div className="row">
                                <div className="col-6">
                                    <button
                                        onClick={handleSubmit(onSubmit)}
                                        className="btn btn-success px-4"
                                        type="button"
                                        disabled={layoutState?.loading}
                                    >
                                        {general.submit}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LoginPage>
    );
};

export default Login;
