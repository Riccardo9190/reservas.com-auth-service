import { Hasher } from '../../contracts/security/hasher';

export class Password {
    private readonly _value: string;

    private constructor(value: string) {
        this._value = value;
    }

    static async create(plain: string, hasher: Hasher): Promise<Password> {
        const hashed = await hasher.hash(plain);
        return new Password(hashed);
    }

    static restore(value: string): Password {
        return new Password(value);
    }

    get value(): string {
        return this._value;
    }
}
