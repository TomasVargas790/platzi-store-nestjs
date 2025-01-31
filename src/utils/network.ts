import type { Response } from './constants';
export const success = (res: response, extra: object = {}) => ({
    status: res.response.message,
    ...res,
    ...extra,
});

type response = {
    response: Response;
    object?: string;
};
