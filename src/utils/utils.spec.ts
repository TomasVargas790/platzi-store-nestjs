import { isNotBlank } from './utils';

describe('Utils', () => {
    it('isNotBlank', () => {
        expect(isNotBlank('A')).toBeTruthy();
    });
});
