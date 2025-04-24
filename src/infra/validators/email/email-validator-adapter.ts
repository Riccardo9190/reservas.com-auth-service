import { EmailValidator } from '../../../domain/contracts/email-validator';
import * as EmailValidatorLib from 'email-validator';

export class EmailValidatorLibAdapter implements EmailValidator {
    isValid(email: string): boolean {
        return EmailValidatorLib.validate(email);
    }
}
