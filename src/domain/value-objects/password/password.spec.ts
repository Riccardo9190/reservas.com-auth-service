import { describe, test, expect, beforeEach, jest } from '@jest/globals';
import { Password } from './password';
import { Hasher } from '../../contracts/security/hasher';

describe('Password (Value Object)', () => {
    let hasherMock: Hasher;

    beforeEach(() => {
        hasherMock = {
            hash: jest
                .fn<(plain: string) => Promise<string>>()
                .mockResolvedValue('hashed-password'),
            compare: jest
                .fn<(plain: string, hashed: string) => Promise<boolean>>()
                .mockResolvedValue(true),
        };
    });

    test('should create a Password value object when a valid plain is provided', async () => {
        const validPlain = 'Abcd1234';

        const password = await Password.create(validPlain, hasherMock);

        expect(password.value).toBe('hashed-password');
    });
});
