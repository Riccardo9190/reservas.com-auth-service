import { InvalidPasswordError } from '../../errors/invalid-password-error';

export class Password {
    private readonly _value: string;

    private constructor(plain: string) {
        this._value = plain;
    }

    static create(plain: string): Password {
        if (this.onlySpaces(plain)) {
            throw InvalidPasswordError.onlySpaces();
        }
        if (plain.length < 8) {
            throw InvalidPasswordError.tooShort();
        }
        if (plain.length > 36) {
            throw InvalidPasswordError.tooLong();
        }
        if (!this.containsLetter(plain)) {
            throw InvalidPasswordError.noLetter();
        }
        if (!this.containsNumber(plain)) {
            throw InvalidPasswordError.noNumber();
        }
        return new Password(plain);
    }

    get value(): string {
        return this._value;
    }

    private static containsLetter(plain: string): boolean {
        return /[a-zA-Z]/.test(plain);
    }

    private static containsNumber(plain: string): boolean {
        return /\d/.test(plain);
    }

    private static onlySpaces(plain: string): boolean {
        return /^\s+$/.test(plain);
    }
}
