const LOCALHOST = 1;

export const SERVER_URL =
    LOCALHOST === 1
        ? "http://127.0.0.1:8000/api"
        : "https://hoseeinimh.com/api";

export const DASHBOARD_API_URLS = {
    FETCH_REVIEW: `${SERVER_URL}/dashboard/review`,
};

export const USERS_API_URLS = {
    LOGIN: `${SERVER_URL}/users/login`,
    LOGOUT: `${SERVER_URL}/users/logout`,
    FETCH_USER: `${SERVER_URL}/users/show`,
    FETCH_AUTH_USER: `${SERVER_URL}/users/get_auth`,
    FETCH_USERS: `${SERVER_URL}/users`,
    UPDATE_USER: `${SERVER_URL}/users/update`,
    CHANGE_PASSWORD: `${SERVER_URL}/users/change_password`,
};

export const CATEGORIES_API_URLS = {
    FETCH_CATEGORY: `${SERVER_URL}/categories/show`,
    FETCH_CATEGORIES: `${SERVER_URL}/categories`,
    FETCH_ALL_CATEGORIES: `${SERVER_URL}/categories/get_all`,
    STORE_CATEGORY: `${SERVER_URL}/categories/store`,
    UPDATE_CATEGORY: `${SERVER_URL}/categories/update`,
    REMOVE_CATEGORY: `${SERVER_URL}/categories/remove`,
};

export const BOOKS_API_URLS = {
    FETCH_BOOK: `${SERVER_URL}/books/show`,
    FETCH_BOOKS: `${SERVER_URL}/books`,
    STORE_BOOK: `${SERVER_URL}/books/store`,
    UPDATE_BOOK: `${SERVER_URL}/books/update`,
    REMOVE_BOOK: `${SERVER_URL}/books/remove`,
};
