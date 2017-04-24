export const auth = {
    login: {
        SERVER_FAILED: 1,
        BAD_USERNAME: 2,
        NOT_FOUND: 3,
    },
    signup: {
        SERVER_FAILED: 1,
        BAD_USERNAME: 2,
        BAD_EMAIL: 3,
        EXIST_USERNAME: 4,
    },
    status: {
        SERVER_FAILED: 1,
        SESSION_EXPIRED: 2,
    },
    logout: {
        SERVER_FAILED: 1,
    },
};

export const memo = {
    post: {
        SERVER_FAILED: 1,
        NOT_LOGGEDIN: 2,
    },
    put: {
        SERVER_FAILED: 1,
        NOT_LOGGEDIN:2,
        BAD_ID: 3,
        NOT_FOUND: 4,
        BAD_PERMISSION: 5,
    },
    delete: {
        SERVER_FAILED: 1,
        NOT_LOGGEDIN:2,
        BAD_ID: 3,
        NOT_FOUND: 4,
        BAD_PERMISSION: 5,
    },
    get: {
        SERVER_FAILED: 1,
        BAD_REQUEST: 2,
        BAD_ID: 3,
    },
};

export default {
    auth,
    memo
};
