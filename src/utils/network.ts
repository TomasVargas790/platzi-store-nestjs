import type { Response } from './constants';
export const success = (
    { response: { message, ...res } }: response,
    extra: object = {},
) => ({
    status: message,
    ...res,
    ...extra,
});

type response = {
    response: Response;
    object?: string;
};
