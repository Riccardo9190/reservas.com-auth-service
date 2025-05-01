import { describe, test, expect, beforeEach, jest } from '@jest/globals';
import { User } from './user';
import { Email } from '../../value-objects/email/email';
import { EmailValidator } from '../../contracts/validation/email-validator';
import { Password } from '../../value-objects/password/password';
import { UserRole } from '../../enums/user-role.enum';
import { Hasher } from '../../contracts/security/hasher';

describe('User (Entity)', () => {
    let validatorMock: EmailValidator;
    let hasherMock: Hasher;

    beforeEach(() => {
        validatorMock = {
            isValid: jest.fn<(email: string) => boolean>(),
        };
        hasherMock = {
            hash: jest
                .fn<(plain: string) => Promise<string>>()
                .mockResolvedValue('hashed-password'),
        };
    });

    test('should create a User entity if valid value objects are provided', async () => {
        (validatorMock.isValid as jest.Mock).mockReturnValue(true);
        const email = Email.create('test@email.com', validatorMock);
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
