import type { Response } from './constants';
export const success = (res: response, extra: object = {}) => ({
    info: {
        status: res.response.message,
        ...res.response,
    },
    response: { ...extra },
});

type response = {
    response: Response;
    object?: string;
};
