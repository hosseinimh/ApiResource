import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { InsertPage } from "../_layout";
import { Book as Entity } from "../../../http/entities";
import { editBookPage as strings, general } from "../../../constants/strings";
import { editBookSchema as schema } from "../../validations";
import {
    MESSAGE_TYPES,
    MESSAGE_CODES,
    basePath,
    UPLOADED_FILE,
} from "../../../constants";
import {
    setLoadingAction,
    setTitleAction,
} from "../../../state/layout/layoutActions";
import {
    clearMessageAction,
    setMessageAction,
} from "../../../state/message/messageActions";

const EditBook = () => {
    const dispatch = useDispatch();
    const layoutState = useSelector((state) => state.layoutReducer);
    const messageState = useSelector((state) => state.messageReducer);
    const navigate = useNavigate();
    let entity = new Entity();
    let { bookId } = useParams();
    bookId = parseInt(bookId);
    const callbackUrl = `${basePath}/books`;
    const [file, setFile] = useState(null);
    const [categories, setCategories] = useState(null);
    const [input, setInput] = useState("");
    const [tags, setTags] = useState([]);
    const [isKeyReleased, setIsKeyReleased] = useState(false);
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

        let result = await entity.get(bookId);

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

        setCategories(result?.categories);
        setTags(result.item.tags ?? []);
        setValue("name", result.item.name);
        setValue("description", result.item.description);
        setValue("extraInfo", result.item.extraInfo);
        setValue("categoryId", result.item.categoryId);
        dispatch(setTitleAction(`${strings._title} [ ${result.item.name} ]`));

        dispatch(setLoadingAction(false));
    };

    const onSubmit = async (data) => {
        dispatch(setLoadingAction(true));
        dispatch(clearMessageAction());

        let result = await entity.update(
            bookId,
            data.name,
            file,
            data.description,
            data.extraInfo,
            data.categoryId,
            tags
        );

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

        if (
            file &&
            (!result?.uploaded || result?.uploaded !== UPLOADED_FILE.OK)
        ) {
            setLoadingAction(false);
            dispatch(
                setMessageAction(
                    result?.uploadedText,
                    MESSAGE_TYPES.ERROR,
                    result?.uploaded,
                    true,
                    "image"
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

        if (isNaN(bookId) || bookId <= 0) {
            dispatch(
                setMessageAction(
                    general.itemNotFound,
                    MESSAGE_TYPES.ERROR,
                    MESSAGE_CODES.ITEM_NOT_FOUND,
                    false
                )
            );
            navigate(callbackUrl);

            return;
        }

        fillForm();

        return () => {
            setIsCurrent(false);
        };
    }, []);

    const onChangeTags = (e) => {
        const { value } = e.target;

        setInput(value);
    };

    const onChangeFile = (e) => {
        const image = e?.target?.files[0];

        if (image) {
            setFile(image);
        }
    };

    const onKeyDownTags = (e) => {
        const { key } = e;
        const trimmedInput = input.trim();

        if (
            key === "," &&
            trimmedInput.length &&
            !tags?.includes(trimmedInput)
        ) {
            e.preventDefault();
            setTags((prevState) => [...prevState, trimmedInput]);
            setInput("");
        }

        if (
            key === "Backspace" &&
            !input.length &&
            tags?.length &&
            isKeyReleased
        ) {
            const tagsCopy = [...tags];
            const poppedTag = tagsCopy.pop();
            e.preventDefault();
            setTags(tagsCopy);
            setInput(poppedTag);
        }

        setIsKeyReleased(false);
    };

    const onKeyUpTags = () => {
        setIsKeyReleased(true);
    };

    const deleteTag = (index) => {
        setTags((prevState) => prevState.filter((tag, i) => i !== index));
    };

    const renderInputRow = (field, type = "text", placeholder = null) => {
        placeholder = placeholder
            ? placeholder
            : strings[`${field}Placeholder`];

        return (
            <div className="col-md-6 col-sm-12 pb-4">
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

    const renderFileRow = (field) => (
        <div className="col-md-6 col-sm-12 pb-4">
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
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => onChangeFile(e)}
            />
            {messageState?.messageField === field && (
                <div className="invalid-feedback">{messageState?.message}</div>
            )}
        </div>
    );

    const renderTextareaRow = (field) => {
        return (
            <div className="col-md-6 col-sm-12 pb-4">
                <label className="form-label" htmlFor={field}>
                    {strings[field]}
                </label>
                <textarea
                    {...register(`${field}`)}
                    className={
                        messageState?.messageField === field
                            ? "form-control is-invalid"
                            : "form-control"
                    }
                    style={{ height: "6rem" }}
                    id={field}
                    placeholder={strings[`${field}Placeholder`]}
                    readOnly={layoutState?.loading}
                ></textarea>
                {messageState?.messageField === field && (
                    <div className="invalid-feedback">
                        {messageState?.message}
                    </div>
                )}
            </div>
        );
    };

    const renderSelectRow = (field, items, key, value, handleChange = null) => (
        <div className="col-md-6 col-sm-12 pb-4">
            <label className="form-label" htmlFor={field}>
                {strings[field]}
            </label>
            <select
                {...register(`${field}`)}
                className={
                    messageState?.messageField === field
                        ? "form-select is-invalid"
                        : "form-select"
                }
                aria-label={`select ${field}`}
                disabled={layoutState?.loading}
                onChange={(e) => {
                    if (handleChange) handleChange(e);
                }}
            >
                {items?.map((item, index) => (
                    <option value={item[key]} key={index}>
                        {item[value]}
                    </option>
                ))}
            </select>
            {messageState?.messageField === field && (
                <div className="invalid-feedback">{messageState?.message}</div>
            )}
        </div>
    );

    const renderTagRow = (field) => {
        return (
            <div className="col-md-6 col-sm-12 pb-4">
                <label className="form-label" htmlFor={strings.tags}>
                    {strings.tags}
                </label>
                <input
                    {...register(`${field}`)}
                    className="form-control"
                    id={field}
                    placeholder={strings[`${field}Placeholder`]}
                    disabled={layoutState?.loading}
                    value={input}
                    onKeyDown={onKeyDownTags}
                    onKeyUp={onKeyUpTags}
                    onChange={onChangeTags}
                />
                <div>
                    {tags?.map((tag, index) => (
                        <div className="tag" key={index}>
                            {tag}
                            <button onClick={() => deleteTag(index)}>x</button>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderForm = () => (
        <div className="card mb-4">
            <div className="card-body">
                <div className="row">
                    {renderInputRow("name")}
                    {renderFileRow("image")}
                    {renderTextareaRow("description")}
                    {renderTextareaRow("extraInfo")}
                    {renderSelectRow("categoryId", categories, "id", "title")}
                    {renderTagRow("tags")}
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
        <InsertPage page={"Books"} errors={errors}>
            <div className="row">
                <div className="col-12">{renderForm()}</div>
            </div>
        </InsertPage>
    );
};

export default EditBook;
