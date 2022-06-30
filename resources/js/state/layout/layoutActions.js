import utils from "../../utils/Utils";

export const CHANGE_PAGE_ACTION = "CHANGE_PAGE_ACTION";
export const CHANGE_TITLE_ACTION = "CHANGE_TITLE_ACTION";
export const SET_LOADING_ACTION = "SET_LOADING_ACTION";
export const SET_PAGE_PARAMETER_ACTION = "SET_PAGE_PARAMETER_ACTION";
export const CLEAR_PAGE_PARAMETER_ACTION = "CLEAR_PAGE_PARAMETER_ACTION";

export const setPageAction = (page) => async (dispatch, getState) => {
    dispatch({ type: CHANGE_PAGE_ACTION, payload: page });
};

export const setPageParameterAction =
    (key, value) => async (dispatch, getState) => {
        dispatch({ type: SET_PAGE_PARAMETER_ACTION, payload: { key, value } });
    };

export const cleartPageParameterAction = () => async (dispatch, getState) => {
    dispatch({
        type: CLEAR_PAGE_PARAMETER_ACTION,
    });
};

export const setTitleAction = (title) => async (dispatch, getState) => {
    dispatch({ type: CHANGE_TITLE_ACTION, payload: title });
};

export const setLoadingAction = (loading) => async (dispatch, getState) => {
    dispatch({
        type: SET_LOADING_ACTION,
        payload: { loading },
    });
};
