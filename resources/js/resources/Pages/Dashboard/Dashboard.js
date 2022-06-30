import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import Page from "../_layout/Page";
import { Dashboard as Entity } from "../../../http/entities";
import { dashboardPage as strings } from "../../../constants/strings";
import utils from "../../../utils/Utils";
import { MESSAGE_TYPES } from "../../../constants";
import {
    setLoadingAction,
    setTitleAction,
} from "../../../state/layout/layoutActions";
import { setMessageAction } from "../../../state/message/messageActions";

const Dashboard = () => {
    const dispatch = useDispatch();
    let entity = new Entity();
    const [items, setItems] = useState(null);
    const [isCurrent, setIsCurrent] = useState(true);

    const getReview = async () => {
        dispatch(setLoadingAction(true));

        let result = await entity.getReview();

        dispatch(setLoadingAction(false));

        if (result === null) {
            dispatch(
                setMessageAction(
                    entity.errorMessage,
                    MESSAGE_TYPES.ERROR,
                    entity.errorCode
                )
            );
            setItems(null);

            return;
        }

        setItems(result.items);
    };

    useEffect(() => {
        dispatch(setTitleAction(strings._title));

        getReview();

        return () => {
            setIsCurrent(false);
        };
    }, []);

    const renderReview = () => {
        return (
            <div className="row">
                <div className="col-sm-4 col-lg-3">
                    <div className="card mb-4 text-white bg-info card-dashboard">
                        <div className="card-body pb-2 d-flex justify-content-between align-items-start">
                            <div>
                                <div className="fs-4 fw-semibold">
                                    {strings.users}
                                </div>
                                <div className="my-2">{items?.users}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4 col-lg-3">
                    <div className="card mb-4 text-white bg-warning card-dashboard">
                        <div className="card-body pb-2 d-flex justify-content-between align-items-start">
                            <div>
                                <div className="fs-4 fw-semibold">
                                    {strings.categories}
                                </div>
                                <div className="my-2">{items?.categories}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4 col-lg-3">
                    <div className="card mb-4 text-white bg-success card-dashboard">
                        <div className="card-body pb-2 d-flex justify-content-between align-items-start">
                            <div>
                                <div className="fs-4 fw-semibold">
                                    {strings.books}
                                </div>
                                <div className="my-2">{items?.books}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    if (!isCurrent) <></>;

    return <Page page={"Dashboard"}>{renderReview()}</Page>;
};

export default Dashboard;
