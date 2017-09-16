export class InvalidResponseError extends Error {
    constructor(message?: string) {
        if (message) {
            super(`Invalid response from server: ${message}`);
        }
        else {
            super('Invalid response from server');
        }
    }
}
