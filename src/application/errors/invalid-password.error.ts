export class InvalidPasswordError extends Error {
    constructor(email: string) {
        super(`Invalid password for user ${email}`);
        this.name = 'InvalidPasswordError';
    }
}
