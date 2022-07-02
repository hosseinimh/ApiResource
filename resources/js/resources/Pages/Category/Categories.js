import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BsFillFileExcelFill, BsPencilFill } from "react-icons/bs";

import { Page } from "../_layout";
import { Category as Entity } from "../../../http/entities";
import { categoriesPage as strings, general } from "../../../constants/strings";
import { Table } from "../../components";
import {
    MESSAGE_TYPES,
    imgPath,
    basePath,
    MESSAGE_CODES,
} from "../../../constants";
import { categorySearchSchema as schema } from "../../validations";
import {
    setLoadingAction,
    setTitleAction,
} from "../../../state/layout/layoutActions";
import {
    clearMessageAction,
    setMessageAction,
} from "../../../state/message/messageActions";

const Categories = () => {
    const dispatch = useDispatch();
    const layoutState = useSelector((state) => state.layoutReducer);
    const messageState = useSelector((state) => state.messageReducer);
    const navigate = useNavigate();
    let entity = new Entity();
    const columnsCount = 3;
    const [items, setItems] = useState(null);
    const [item, setItem] = useState(null);
    const [action, setAction] = useState(null);
    const [isCurrent, setIsCurrent] = useState(true);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data = null) => {
        fillForm(data);
    };

    const fetchCategories = async (data = null) => {
        let result = await entity.getPagination(data?.title);

        if (result === null) {
            setItems(null);
            dispatch(
                setMessageAction(
                    entity.errorMessage,
                    MESSAGE_TYPES.ERROR,
                    entity.errorCode
                )
            );

            return;
        }

        setItems(result.items);
    };

    const fillForm = async (data = null) => {
        dispatch(setLoadingAction(true));

        await fetchCategories(data);

        dispatch(setLoadingAction(false));
    };

    const onAdd = () => {
        navigate(`${basePath}/categories/add`);
    };

    const onEdit = (id) => {
        setItem(id);
        setAction("Edit");
    };

    useEffect(() => {
        dispatch(setTitleAction(strings._title));

        fillForm();

        return () => {
            setIsCurrent(false);
        };
    }, []);

    const handleRemove = async (id) => {
        const categoryId = id ?? item;

        if (categoryId === null) {
            return;
        }

        dispatch(setLoadingAction(true));
        dispatch(clearMessageAction());

        let result = await entity.remove(categoryId);

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
                strings.categoryRemoved,
                MESSAGE_TYPES.SUCCESS,
                MESSAGE_CODES.OK
            )
        );

        await fetchCategories();
        window.scrollTo(0, 0);

        dispatch(setLoadingAction(false));
    };

    const renderRemoveModal = () => (
        <div
            className="modal fade"
            id="removeModal"
            tabIndex={"-1"}
            aria-labelledby="removeModal"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5
                            className="modal-title"
                            id="exampleModalCenterTitle"
                        >
                            {strings.removeCategoryModalTitle}
                        </h5>
                        <button
                            className="btn-close"
                            type="button"
                            data-coreui-dismiss="modal"
                            aria-label="Close"
                            disabled={layoutState?.loading}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <p className="mb-0">
                            {strings.removeCategoryModalBody1}
                        </p>
                        <p>{strings.removeCategoryModalBody2}</p>
                    </div>
                    <div className="modal-footer">
                        <button
                            className="btn btn-primary"
                            type="button"
                            data-coreui-dismiss="modal"
                            onClick={() => handleRemove()}
                            disabled={layoutState?.loading}
                        >
                            {strings.removeConfirm}
                        </button>
                        <button
                            className="btn btn-secondary"
                            type="button"
                            data-coreui-dismiss="modal"
                        >
                            {strings.removeCancel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderFilterSection = () => (
        <div className="card mb-4">
            <div className="card-body">
                <div className="row">
                    <div className="col-sm-12">
                        <input
                            {...register("title")}
                            className={
                                messageState?.messageField === "title"
                                    ? "form-control is-invalid"
                                    : "form-control"
                            }
                            placeholder={strings.title}
                            disabled={layoutState?.loading}
                        />
                        {messageState?.messageField === "title" && (
                            <div className="invalid-feedback">
                                {messageState?.message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="card-footer">
                <div className="row">
                    <div className="col-sm-12">
                        <button
                            className="btn btn-dark px-4"
                            type="button"
                            onClick={handleSubmit(onSubmit)}
                            disabled={layoutState?.loading}
                            title={strings.searchSubmit}
                        >
                            {strings.searchSubmit}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderHeader = () => (
        <tr>
            <th scope="col" style={{ width: "50px" }}>
                #
            </th>
            <th scope="col">{strings.title}</th>
            <th scope="col" style={{ width: "120px" }}>
                {general.actions}
            </th>
        </tr>
    );

    const renderItems = () => {
        if (items && items.length > 0) {
            return items.map((item, index) => (
                <tr key={item.id}>
                    <td scope="row">{index + 1}</td>
                    <td>{item.title}</td>
                    <td>
                        <button
                            type="button"
                            className="btn btn-secondary ml-2"
                            onClick={() => onEdit(item.id)}
                            title={general.edit}
                            disabled={layoutState?.loading}
                        >
                            <BsPencilFill />
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary ml-2"
                            title={general.remove}
                            data-coreui-toggle="modal"
                            data-coreui-target="#removeModal"
                            data-coreui-tag={item.id}
                            onClick={() => setItem(item.id)}
                            disabled={layoutState?.loading}
                        >
                            <BsFillFileExcelFill />
                        </button>
                    </td>
                </tr>
            ));
        }

        if (layoutState?.loading) {
            return (
                <tr>
                    <td colSpan={columnsCount} className="img-loading-wrapper">
                        <img
                            src={`${imgPath}/loading-form.gif`}
                            className="img-loading"
                        />
                    </td>
                </tr>
            );
        }

        return (
            <tr>
                <td colSpan={columnsCount}>{general.noDataFound}</td>
            </tr>
        );
    };

    if (!isCurrent) <></>;

    if (item) {
        if (action === "Edit") {
            return (
                <Navigate
                    to={`${basePath}/categories/edit/${item}`}
                    replace={true}
                />
            );
        }
    }

    return (
        <Page page={"Categories"} errors={errors}>
            {renderFilterSection()}
            <div className="row mb-2">
                <div className="col-sm-12 my-4">
                    <button
                        className="btn btn-success px-4"
                        type="button"
                        title={strings.addCategory}
                        onClick={() => onAdd()}
                        disabled={layoutState?.loading}
                    >
                        {strings.addCategory}
                    </button>
                </div>
            </div>
            <div className="row mb-4">
                <Table
                    items={items}
                    renderHeader={renderHeader}
                    renderItems={renderItems}
                />
            </div>
            {renderRemoveModal()}
        </Page>
    );
};

export default Categories;
