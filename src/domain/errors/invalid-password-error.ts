export class InvalidPasswordError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidPasswordError';
    }

    static tooShort() {
        return new InvalidPasswordError(
            'Password must have at least 8 characters.',
        );
    }

    static tooLong() {
        return new InvalidPasswordError(
            'Password must have a maximum of 36 characters.',
        );
    }

    static noLetter() {
        return new InvalidPasswordError(
            'Password must have at least one letter',
        );
    }

    static noNumber() {
        return new InvalidPasswordError(
            'Password must have at least one number',
        );
    }

    static onlySpaces() {
        return new InvalidPasswordError('Password cannot contain only spaces');
    }
}
