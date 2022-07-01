import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BsPencilFill } from "react-icons/bs";

import { Page } from "../_layout";
import { Book as Entity } from "../../../http/entities";
import { booksPage as strings, general } from "../../../constants/strings";
import { Table } from "../../components";
import { MESSAGE_TYPES, imgPath, basePath } from "../../../constants";
import { bookSearchSchema as schema } from "../../validations";
import {
    setLoadingAction,
    setTitleAction,
} from "../../../state/layout/layoutActions";
import { setMessageAction } from "../../../state/message/messageActions";

const Books = () => {
    const dispatch = useDispatch();
    const layoutState = useSelector((state) => state.layoutReducer);
    const messageState = useSelector((state) => state.messageReducer);
    let entity = new Entity();
    const columnsCount = 5;
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

    const fillForm = async (data = null) => {
        dispatch(setLoadingAction(true));

        let result = await entity.getPage(data?.name, data?.categoryId);

        dispatch(setLoadingAction(false));

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
        dispatch(setLoadingAction(false));
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

    const renderFilterSection = () => (
        <div className="card mb-4">
            <div className="card-body">
                <div className="row">
                    <div className="col-sm-12">
                        <input
                            {...register("name")}
                            className={
                                messageState?.messageField === "name"
                                    ? "form-control is-invalid"
                                    : "form-control"
                            }
                            type="number"
                            placeholder={strings.name}
                            disabled={layoutState?.loading}
                        />
                        {messageState?.messageField === "name" && (
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
            <th
                scope="col"
                style={{ width: "200px", textAlign: "center" }}
            >{`${strings.name} / ${strings.image}`}</th>
            <th scope="col">{`${strings.description} / ${strings.extraInfo}`}</th>
            <th
                scope="col"
                style={{
                    width: "150px",
                    textAlign: "center",
                }}
            >
                {strings.tags}
            </th>
            <th
                scope="col"
                style={{
                    width: "120px",
                    textAlign: "center",
                }}
            >
                {general.actions}
            </th>
        </tr>
    );

    const renderItems = () => {
        if (items && items.length > 0) {
            return items.map((item, index) => (
                <tr key={item.id}>
                    <td scope="row">{index + 1}</td>
                    <td>{item.name}</td>
                    <td>
                        <p>{item.description}</p>
                        <p>{item.extraInfo}</p>
                    </td>
                    <td>{item.tags}</td>
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
                    to={`${basePath}/books/edit/${item}`}
                    replace={true}
                />
            );
        }
    }

    return (
        <Page page={"Books"} errors={errors}>
            {renderFilterSection()}
            <div className="row mb-4">
                <Table
                    items={items}
                    renderHeader={renderHeader}
                    renderItems={renderItems}
                />
            </div>
        </Page>
    );
};

export default Books;
