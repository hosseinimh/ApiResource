import { BOOKS_API_URLS as API_URLS } from "../../constants";
import Entity from "./Entity";

export class Book extends Entity {
    constructor() {
        super();
    }

    async getPagination(name, categoryId, page = 1) {
        return await this.handlePostWithToken(API_URLS.FETCH_BOOKS, {
            name: name,
            category_id: categoryId,
            page: page,
        });
    }

    async get(id) {
        return await this.handlePostWithToken(API_URLS.FETCH_BOOK, {
            id: id,
        });
    }

    async store(name, image, description, extraInfo, categoryId, tags) {
        let data = new FormData();

        data.append("name", name);
        data.append("image", image);
        data.append("description", description);
        data.append("extra_info", extraInfo);
        data.append("category_id", categoryId);

        for (var i = 0; i < tags?.length; i++) {
            data.append("tags[]", tags[i]);
        }

        return await this.handlePostFile(API_URLS.STORE_BOOK, data);
    }

    async update(id, name, image, description, extraInfo, categoryId, tags) {
        let data = new FormData();

        data.append("id", id);
        data.append("name", name);
        data.append("image", image);
        data.append("description", description);
        data.append("extra_info", extraInfo);
        data.append("category_id", categoryId);

        for (var i = 0; i < tags?.length; i++) {
            data.append("tags[]", tags[i]);
        }

        return await this.handlePostFile(API_URLS.UPDATE_BOOK, data);
    }
}
