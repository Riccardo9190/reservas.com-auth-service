import { EmailValidator } from '../../../domain/contracts/email-validator';

export class RegexEmailValidatorAdapter implements EmailValidator {
    isValid(email: string): boolean {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email.toLowerCase());
    }
}
