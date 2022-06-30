import { DASHBOARD_API_URLS as API_URLS } from "../../constants";
import Entity from "./Entity";

export class Dashboard extends Entity {
    constructor() {
        super();
    }

    async getReview() {
        return await this.handlePostWithToken(API_URLS.FETCH_REVIEW, {});
    }
}
