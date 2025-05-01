import { describe, test, expect, beforeEach, jest } from '@jest/globals';
import { Password } from './password';
import { InvalidPasswordError } from '../../errors/invalid-password-error';
import { Hasher } from '../../contracts/security/hasher';

describe('Password (Value Object)', () => {
    let hasherMock: Hasher;

    beforeEach(() => {
        hasherMock = {
            hash: jest
                .fn<(plain: string) => Promise<string>>()
                .mockResolvedValue('hashed-password'),
        };
    });

    test('should create a Password value object when a valid plain is provided', async () => {
        const validPlain = 'Abcd1234';

        const password = await Password.create(validPlain, hasherMock);

        expect(password.value).toBe('hashed-password');
    });

    test('should not create a Password value object if it contains only spaces', async () => {
        const spacesPlain = '        ';

        const act = async () => await Password.create(spacesPlain, hasherMock);

        expect(act).rejects.toThrow(InvalidPasswordError.onlySpaces());
    });

    test('should not create a Password value object if plain is shorter than 8 characters', async () => {
        const shorterPlain = 'Abc123';

        const act = async () => await Password.create(shorterPlain, hasherMock);

        expect(act).rejects.toThrow(InvalidPasswordError.tooShort());
    });

    test('should not create a Password value object if plain is bigger than 36 characters', async () => {
        const longerPlain = 'a9Xf3Lm5Wq2Vt7NpZg6Ey1JhRg2tBcQsMdPvX';

        const act = async () => await Password.create(longerPlain, hasherMock);

        expect(act).rejects.toThrow(InvalidPasswordError.tooLong());
    });

    test('should not create a Password value object if it does not contain at least one letter', async () => {
        const plainWithoutLetter = '12345678';

        const act = async () =>
            await Password.create(plainWithoutLetter, hasherMock);

        expect(act).rejects.toThrow(InvalidPasswordError.noLetter());
    });

    test('should not create a Password value object if it does not contain at least one number', async () => {
        const plainWithoutNumber = 'AbCdEfgH';

        const act = async () =>
            await Password.create(plainWithoutNumber, hasherMock);

        expect(act).rejects.toThrow(InvalidPasswordError.noNumber());
    });
});
