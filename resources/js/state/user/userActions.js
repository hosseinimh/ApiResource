import { USERS_API_URLS as API_URLS } from "../../constants";
import { post, postWithToken } from "../../http";
import { handleError } from "../globalActions";
import utils from "../../utils/Utils";
import { utils as strings } from "../../constants/strings";

export const FETCH_LOGIN_REQUEST_ACTION = "FETCH_LOGIN_REQUEST_ACTION";
export const FETCH_LOGIN_SUCCESS_ACTION = "FETCH_LOGIN_SUCCESS_ACTION";
export const FETCH_LOGIN_FAILURE_ACTION = "FETCH_LOGIN_FAILURE_ACTION";

export const FETCH_LOGOUT_REQUEST_ACTION = "FETCH_LOGOUT_REQUEST_ACTION";

export const CLEAR_LOGIN_REQUEST_ACTION = "CLEAR_LOGIN_REQUEST_ACTION";

export const fetchLoginAction =
    (username, password, type) => async (dispatch, getState) => {
        dispatch({ type: FETCH_LOGIN_REQUEST_ACTION });

        try {
            const response = await post(API_URLS.LOGIN, {
                username: username,
                password,
            });

            if (!utils.isJsonString(response.data)) {
                dispatch({
                    type: FETCH_LOGIN_FAILURE_ACTION,
                    payload: strings.notValidJson,
                });

                return;
            }

            if (response.data._result === "1") {
                utils.setLSVariable("token", response.data._token.access_token);
                utils.setLSVariable(
                    "user",
                    JSON.stringify(response.data._token.user)
                );

                dispatch({
                    type: FETCH_LOGIN_SUCCESS_ACTION,
                    payload: {
                        token: localStorage.getItem("token"),
                        user: localStorage.getItem("user"),
                    },
                });
            } else {
                handleError(response.data, dispatch);
                dispatch({
                    type: FETCH_LOGIN_FAILURE_ACTION,
                    payload: response.data._error,
                });
            }
        } catch (error) {
            dispatch({
                type: FETCH_LOGIN_FAILURE_ACTION,
                payload: error.message,
            });
        }
    };

export const fetchLogoutAction = () => async (dispatch, getState) => {
    try {
        utils.clearLS();

        await postWithToken(API_URLS.LOGOUT);
    } catch (error) {}

    dispatch({
        type: FETCH_LOGOUT_REQUEST_ACTION,
    });
};

export const clearLogoutAction = () => async (dispatch, getState) => {
    try {
        utils.clearLS();
    } catch (error) {}

    dispatch({
        type: CLEAR_LOGIN_REQUEST_ACTION,
    });
};
