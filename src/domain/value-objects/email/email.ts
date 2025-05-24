export class Email {
    private readonly _value: string;

    private constructor(value: string) {
        this._value = value;
    }

    static create(value: string): Email {
        return new Email(value);
    }

    static restore(value: string): Email {
        return new Email(value);
    }

    get value(): string {
        return this._value;
    }
}
