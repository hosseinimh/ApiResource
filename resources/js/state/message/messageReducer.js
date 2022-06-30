import { MESSAGE_CODES } from "../../constants";
import * as messageActions from "./messageActions";

const initialState = {
    message: null,
    messageType: null,
    messageCode: 0,
    messageRender: false,
    messageField: null,
};

const messageReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case messageActions.SET_MESSAGE_ACTION:
            return {
                message: payload.message,
                messageType: payload.messageType,
                messageCode:
                    parseInt(payload.messageCode) ?? MESSAGE_CODES.CLIENT_ERROR,
                messageRender: payload.messageRender,
                messageField: payload.messageField,
            };
        case messageActions.SET_RENDER_MESSAGE:
            return {
                ...state,
                messageRender: true,
            };
        case messageActions.CLEAR_MESSAGE_ACTION:
            return {
                message: null,
                messageType: null,
                messageCode: 0,
                messageRender: false,
                messageField: null,
            };
        default:
            return state;
    }
};

export default messageReducer;
