import { describe, test, expect, beforeEach, jest } from '@jest/globals';
import { Email } from './email';
import { EmailValidator } from '../../contracts/email-validator';
import { InvalidEmailError } from '../../errors/invalid-email.error';

describe('Email (Value Object)', () => {
    let validatorMock: EmailValidator;

    beforeEach(() => {
        validatorMock = {
            isValid: jest.fn<(email: string) => boolean>(),
        };
    });

    test('should create an Email value object when email is valid', () => {
        (validatorMock.isValid as jest.Mock).mockReturnValue(true);
        const validEmail = 'test@email.com';

        const email = Email.create(validEmail, validatorMock);

        expect(email.value).toBe(validEmail);
    });

    test('should not create an Email value object if the email is invalid', () => {
        (validatorMock.isValid as jest.Mock).mockReturnValue(false);
        const invalidEmail = 'notValidEmail';

        const act = () => Email.create(invalidEmail, validatorMock);

        expect(act).toThrow(InvalidEmailError);
    });
});
