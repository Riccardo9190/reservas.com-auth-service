import { describe, test } from '@jest/globals';
import { Email } from './email';

describe('Email (Value Object)', () => {
    test('should create a valid Email value object', () => {
        const email = new Email('test@email.com');

        expect(email.value).toBe('test@email.com');
    });
});
