import * as layoutActions from "./layoutActions";

const initialState = {
    page: null,
    title: "",
    loading: false,
    pageKey: null,
    pageValue: null,
};

const layoutReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case layoutActions.CHANGE_PAGE_ACTION:
            return { ...state, page: payload };
        case layoutActions.SET_PAGE_PARAMETER_ACTION:
            return { ...state, pageKey: payload.key, pageValue: payload.value };
        case layoutActions.CLEAR_PAGE_PARAMETER_ACTION:
            return { ...state, pageKey: null, pageValue: null };
        case layoutActions.CHANGE_TITLE_ACTION:
            return { ...state, title: payload };
        case layoutActions.SET_LOADING_ACTION:
            return {
                ...state,
                loading: payload.loading,
            };
        default:
            return state;
    }
};

export default layoutReducer;
