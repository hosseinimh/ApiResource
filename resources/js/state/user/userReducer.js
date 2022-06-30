import utils from "../../utils/Utils";
import * as userActions from "./userActions";

const primaryState = {
    isAuthenticated: false,
    token: null,
    user: null,
    loading: false,
    error: null,
};

const initialState = {
    isAuthenticated: !!utils.getLSUser() && !!utils.getLSToken(),
    token: localStorage.getItem("token") ?? null,
    user: utils.getLSUser() ? localStorage.getItem("user") : null,
    loading: false,
    error: null,
};

const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case userActions.FETCH_LOGIN_REQUEST_ACTION:
            return { ...state, loading: true, error: null };
        case userActions.FETCH_LOGIN_SUCCESS_ACTION:
            return {
                ...state,
                isAuthenticated: true,
                token: payload.token,
                user: payload.user,
                loading: false,
                error: null,
            };
        case userActions.FETCH_LOGIN_FAILURE_ACTION:
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                error: payload,
            };
        case userActions.FETCH_LOGOUT_REQUEST_ACTION:
            return { ...primaryState };
        case userActions.CLEAR_LOGIN_REQUEST_ACTION:
            return { ...primaryState };
        default:
            return state;
    }
};

export default userReducer;
