export class UnexpectedError extends Error {
    constructor(error: unknown) {
        super(`Unexpected exception occurred: ${error}`);
        this.name = 'UnexpectedError';
    }
}
