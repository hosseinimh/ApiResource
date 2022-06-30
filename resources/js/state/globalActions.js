import { fetchLoginAction } from "./user/userActions";

export const handleError = (data, dispatch) => {
    try {
        switch (data._result) {
            case "0":
                switch (data._errorCode) {
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                        dispatch(fetchLoginAction());

                        return;
                    default:
                        return;
                }
            case "1":
            default:
                return;
        }
    } catch (error) {}

    return;
};
