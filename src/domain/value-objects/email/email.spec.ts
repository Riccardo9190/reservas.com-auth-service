import { describe, test } from '@jest/globals';
import { Email } from './email';
import { EmailValidator } from '../../contracts/email-validator';
import { InvalidEmailError } from '../../errors/invalid-email.error';

describe('Email (Value Object)', () => {
    let validatorMock: EmailValidator;

    beforeEach(() => {
        validatorMock = {
            isValid: jest.fn(),
        };
    });

    test('should create a valid Email value object', () => {
        (validatorMock.isValid as jest.Mock).mockReturnValue(true);

        const email = Email.create('test@email.com', validatorMock);

        expect(email.value).toBe('test@email.com');
    });

    test('should not create a Email value object if the email provided is not valid', () => {
        (validatorMock.isValid as jest.Mock).mockReturnValue(false);

        const invalidEmail = 'notValidEmail';

        expect(() => Email.create(invalidEmail, validatorMock)).toThrow(
            InvalidEmailError,
        );
    });
});
