export const RESPONSES = {
    SUCCESS: {
        code: 200,
        message: 'success',
    },
    SUCCESS_CREATION: {
        code: 201,
        message: 'success creation',
    },
    BAD_REQUEST: {
        code: 400,
        message: 'bad request',
    },
    NOT_FOUND: {
        code: 404,
        message: 'not found',
    },
    SERVER_ERROR: {
        code: 500,
        message: 'internal server error',
    },
} as const;

export type ResponseKey = keyof typeof RESPONSES;

export type Response = (typeof RESPONSES)[ResponseKey];
