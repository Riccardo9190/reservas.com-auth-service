import { describe, test, expect, beforeEach, jest } from '@jest/globals';
import { Email } from './email';

describe('Email (Value Object)', () => {
    test('should create an Email value object when email is valid', () => {
        const validEmail = 'test@email.com';

        const email = Email.create(validEmail);

        expect(email.value).toBe(validEmail);
    });
});
