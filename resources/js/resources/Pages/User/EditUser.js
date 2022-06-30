import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { InsertPage } from "../_layout";
import { User as Entity } from "../../../http/entities";
import { editUserPage as strings, general } from "../../../constants/strings";
import { editUserSchema as schema } from "../../validations";
import { MESSAGE_TYPES, MESSAGE_CODES, basePath } from "../../../constants";
import utils from "../../../utils/Utils";
import {
    setLoadingAction,
    setTitleAction,
} from "../../../state/layout/layoutActions";
import {
    clearMessageAction,
    setMessageAction,
} from "../../../state/message/messageActions";

const EditUser = () => {
    const dispatch = useDispatch();
    const layoutState = useSelector((state) => state.layoutReducer);
    const messageState = useSelector((state) => state.messageReducer);
    const navigate = useNavigate();
    let entity = new Entity();
    let { userId } = useParams();
    userId = parseInt(userId);
    const lsUser = utils.getLSUser();
    const callbackUrl = `${basePath}/users`;
    const [isCurrent, setIsCurrent] = useState(true);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const fillForm = async () => {
        dispatch(setLoadingAction(true));

        let result = await entity.get(userId);

        if (result === null) {
            dispatch(
                setMessageAction(
                    entity.errorMessage,
                    MESSAGE_TYPES.ERROR,
                    entity.errorCode
                )
            );

            return;
        }

        setValue("name", result.item.name);
        setValue("family", result.item.family);
        dispatch(
            setTitleAction(`${strings._title} [ ${result.item.username} ]`)
        );

        dispatch(setLoadingAction(false));
    };

    const onSubmit = async (data) => {
        dispatch(setLoadingAction(true));
        dispatch(clearMessageAction());

        let result = await entity.update(userId, data.name, data.family);

        if (result === null) {
            dispatch(setLoadingAction(false));
            dispatch(
                setMessageAction(
                    entity.errorMessage,
                    MESSAGE_TYPES.ERROR,
                    entity.errorCode
                )
            );

            return;
        }

        dispatch(
            setMessageAction(
                strings.submitted,
                MESSAGE_TYPES.SUCCESS,
                MESSAGE_CODES.OK,
                false
            )
        );

        navigate(callbackUrl);
    };

    const onCancel = () => {
        navigate(callbackUrl);
    };

    useEffect(() => {
        dispatch(setTitleAction(strings._title));

        if (isNaN(userId) || userId <= 0) {
            userId = lsUser?.id;
        }

        fillForm();

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
        );
    };

    const renderForm = () => (
        <div className="card mb-4">
            <div className="card-body">
                <div className="row">
                    {renderInputRow("name")}
                    {renderInputRow("family")}
                </div>
            </div>
            <div className="card-footer">
                <div className="row">
                    <div className="col-sm-12">
                        <button
                            className="btn btn-success px-4 mr-2"
                            type="button"
                            onClick={handleSubmit(onSubmit)}
                            disabled={layoutState?.loading}
                        >
                            {general.submit}
                        </button>
                        <button
                            className="btn btn-secondary"
                            type="button"
                            onClick={onCancel}
                            disabled={layoutState?.loading}
                        >
                            {general.cancel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    if (!isCurrent) <></>;

    return (
        <InsertPage page={"Users"} errors={errors}>
            <div className="row">
                <div className="col-12">{renderForm()}</div>
            </div>
        </InsertPage>
    );
};

export default EditUser;
