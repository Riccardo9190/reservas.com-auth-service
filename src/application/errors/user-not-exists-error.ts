export class UserNotExistsError extends Error {
    constructor(email: string) {
        super(`User with email ${email} does not exists.`);
        this.name = 'UserNotExistsError';
    }
}
