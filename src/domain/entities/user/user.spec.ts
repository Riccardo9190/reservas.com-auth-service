import { describe, test, expect, beforeEach, jest } from '@jest/globals';
import { User } from './user';
import { Email } from '../../value-objects/email/email';
import { Password } from '../../value-objects/password/password';
import { UserRole } from '../../enums/user-role.enum';
import { Hasher } from '../../contracts/security/hasher';

describe('User (Entity)', () => {
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

    test('should create a User entity if valid value objects are provided', async () => {
        const email = Email.create('test@email.com');
        const password = await Password.create('Abc12345', hasherMock);
        const role = UserRole.CLIENT;

        const user = User.create({
            email,
            password,
            role,
        });

        expect(user).toBeInstanceOf(User);
        expect(user.email.value).toBe(email.value);
        expect(user['_password']).toEqual(password);
        expect(user.role).toBe(role);
    });
});
