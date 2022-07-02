import { USERS_API_URLS as API_URLS } from "../../constants";
import utils from "../../utils/Utils";
import Entity from "./Entity";

export class User extends Entity {
    constructor() {
        super();
    }

    async getPagination(username, name, family, page = 1) {
        return await this.handlePostWithToken(API_URLS.FETCH_USERS, {
            username: username,
            name: name,
            family: family,
            page: page,
        });
    }

    async get(id) {
        return await this.handlePostWithToken(API_URLS.FETCH_USER, {
            id: id,
        });
    }

    async update(id, name, family) {
        return await this.handlePostWithToken(API_URLS.UPDATE_USER, {
            id: id,
            name: name,
            family: family,
        });
    }

    async changePassword(id, newPassword, confirmPassword) {
        return await this.handlePostWithToken(API_URLS.CHANGE_PASSWORD, {
            id: id,
            new_password: newPassword,
            new_password_confirmation: confirmPassword,
        });
    }

    logOut() {
        utils.clearLS();
    }
}
