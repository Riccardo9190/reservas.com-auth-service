import { describe, test } from '@jest/globals';
import { Password } from './password';
import { InvalidPasswordError } from '../../errors/invalid-password-error';

describe('Password (Value Object)', () => {
    test('should create a Password value object when a valid plain is provided', () => {
        const validPlain = 'Abcd1234';

        const password = Password.create(validPlain);

        expect(password.value).toBe(validPlain);
    });

    test('should not create a Password value object if it contains only spaces', () => {
        const spacesPlain = '        ';

        const act = () => Password.create(spacesPlain);

        expect(act).toThrow(InvalidPasswordError.onlySpaces());
    });

    test('should not create a Password value object if plain is shorter than 8 characters', () => {
        const shorterPlain = 'Abc123';

        const act = () => Password.create(shorterPlain);

        expect(act).toThrow(InvalidPasswordError.tooShort());
    });

    test('should not create a Password value object if plain is bigger than 36 characters', () => {
        const longerPlain = 'a9Xf3Lm5Wq2Vt7NpZg6Ey1JhRg2tBcQsMdPvX';

        const act = () => Password.create(longerPlain);

        expect(act).toThrow(InvalidPasswordError.tooLong());
    });

    test('should not create a Password value object if it does not contain at least one letter', () => {
        const plainWithoutLetter = '12345678';

        const act = () => Password.create(plainWithoutLetter);

        expect(act).toThrow(InvalidPasswordError.noLetter());
    });

    test('should not create a Password value object if it does not contain at least one number', () => {
        const plainWithoutNumber = 'AbCdEfgH';

        const act = () => Password.create(plainWithoutNumber);

        expect(act).toThrow(InvalidPasswordError.noNumber());
    });
});
