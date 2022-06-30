import { post, postFileWithToken, postWithToken } from "../post";
import utils from "../../utils/Utils";
import { utils as strings } from "../../constants/strings";

class Entity {
    constructor() {
        this.errorMessage = "";
        this.errorCode = 0;
    }

    async handlePostWithoutToken(url, data) {
        return await this.handlePost(url, data, false);
    }

    async handlePostWithToken(url, data) {
        return await this.handlePost(url, data);
    }

    async handlePost(url, data, withToken = true) {
        try {
            this.errorMessage = "";
            this.errorCode = 0;
            const response = withToken
                ? await postWithToken(url, data)
                : await post(url, data);

            return this.handleResponse(response);
        } catch (error) {
            this.errorMessage = error.message;
            this.errorCode = 1000;

            return null;
        }
    }

    async handlePostFile(url, data) {
        try {
            this.errorMessage = "";
            this.errorCode = 0;

            const response = await postFileWithToken(url, data);

            return this.handleResponse(response);
        } catch (error) {
            this.errorMessage = error.message;
            this.errorCode = 1000;

            return null;
        }
    }

    handleResponse(response) {
        try {
            if (!utils.isJsonString(response.data)) {
                this.errorMessage = strings.notValidJson;

                return null;
            }

            try {
                utils.setLSVariable("token", response.data._token.access_token);
            } catch (error) {}

            if (response.data._result !== "1") {
                this.errorMessage = response.data._error;
                this.errorCode = response.data._errorCode;

                return null;
            }

            return response.data;
        } catch (error) {
            this.errorMessage = error.message;
            this.errorCode = 1000;

            return null;
        }
    }
}

export default Entity;
