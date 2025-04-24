import { EmailValidator } from '../../contracts/email-validator';
import { InvalidEmailError } from '../../errors/invalid-email.error';

export class Email {
    private readonly _value: string;

    private constructor(value: string) {
        this._value = value;
    }

    static create(value: string, validator: EmailValidator) {
        if (!validator.isValid(value)) {
            throw new InvalidEmailError(value);
        }

        return new Email(value);
    }

    get value(): string {
        return this._value;
    }
}
