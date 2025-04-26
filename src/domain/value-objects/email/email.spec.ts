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
        const validEmail = 'test@email.com';

        const email = Email.create(validEmail, validatorMock);

        expect(email.value).toBe(validEmail);
    });

    test('should not create a Email value object if the email provided is not valid', () => {
        (validatorMock.isValid as jest.Mock).mockReturnValue(false);
        const invalidEmail = 'notValidEmail';

        const act = () => Email.create(invalidEmail, validatorMock);

        expect(act).toThrow(InvalidEmailError);
    });
});
