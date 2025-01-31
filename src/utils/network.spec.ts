import { RESPONSES } from './constants';
import { success } from './network';

describe('Network', () => {
    it('success', () => {
        expect(
            success({ response: RESPONSES.SUCCESS, object: 'products' }),
        ).toHaveProperty('object');
    });
});
