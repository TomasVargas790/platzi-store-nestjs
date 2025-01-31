import { env, validateEnvVariables } from './env';
import { isNotBlank } from './utils';

describe('Env', () => {
    let originalEnv: NodeJS.ProcessEnv;

    beforeEach(() => {
        // Backup the original process.env
        originalEnv = process.env;
        process.env = { ...originalEnv };
    });

    afterEach(() => {
        // Restore the original process.env
        process.env = originalEnv;
        jest.restoreAllMocks();
    });

    it('should have all required environment variables', () => {
        const envs = Object.values(env);
        Object.values(envs).forEach((actualEnv) =>
            Object.entries(actualEnv).forEach(([, value]) => {
                //console.log(`Checking ${key}: ${value}`);
                expect(isNotBlank(value)).toBeTruthy();
            }),
        );
    });

    it('should exit process if required environment variables are missing', () => {
        // Mock console.error and process.exit
        const consoleErrorMock = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});
        const processExitMock = jest
            .spyOn(process, 'exit')
            .mockImplementation(() => {
                throw new Error('process.exit called');
            });

        // Clear required environment variables
        process.env = {};

        expect(() => {
            validateEnvVariables([
                'DB_HOST',
                'DB_PORT',
                'DB_USER',
                'PORT',
                'ENVIRONMENT',
            ]);
        }).toThrow('process.exit called');

        // Validate the error message
        expect(consoleErrorMock).toHaveBeenCalledWith(
            expect.stringContaining('DB_HOST is missing in the environment.'),
        );
        expect(processExitMock).toHaveBeenCalledWith(1);

        // Restore mocks
        consoleErrorMock.mockRestore();
        processExitMock.mockRestore();
    });
});
