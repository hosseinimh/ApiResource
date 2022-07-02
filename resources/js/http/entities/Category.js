import { CATEGORIES_API_URLS as API_URLS } from "../../constants";
import Entity from "./Entity";

export class Category extends Entity {
    constructor() {
        super();
    }

    async getPagination(title, page = 1) {
        return await this.handlePostWithToken(API_URLS.FETCH_CATEGORIES, {
            title: title,
            page: page,
        });
    }

    async getAll() {
        return await this.handlePostWithToken(API_URLS.FETCH_ALL_CATEGORIES);
    }

    async get(id) {
        return await this.handlePostWithToken(API_URLS.FETCH_CATEGORY, {
            id: id,
        });
    }

    async store(title) {
        return await this.handlePostWithToken(API_URLS.STORE_CATEGORY, {
            title: title,
        });
    }

    async update(id, title) {
        return await this.handlePostWithToken(API_URLS.UPDATE_CATEGORY, {
            id: id,
            title: title,
        });
    }

    async remove(id) {
        return await this.handlePostWithToken(API_URLS.REMOVE_CATEGORY, {
            id: id,
        });
    }
}
