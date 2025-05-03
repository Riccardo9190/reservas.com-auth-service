import { InvalidPasswordError } from '../../errors/invalid-password-error';
import { Hasher } from '../../contracts/security/hasher';

export class Password {
    private readonly _value: string;

    private constructor(value: string) {
        this._value = value;
    }

    static async create(plain: string, hasher: Hasher): Promise<Password> {
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
        return new Password(await hasher.hash(plain));
    }

    static restore(value: string): Password {
        return new Password(value);
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
