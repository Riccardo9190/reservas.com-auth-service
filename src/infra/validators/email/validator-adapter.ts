import { EmailValidator } from '../../../domain/contracts/email-validator';
import validator from 'validator';

export class ValidatorJsSAdapter implements EmailValidator {
    isValid(email: string): boolean {
        return validator.isEmail(email);
    }
}
