import { RegisterUserCommand } from './register-user.command';
import { UserRepository } from '../../../domain/contracts/persistence/user-repository';
import { Email } from '../../../domain/value-objects/email/email';
import { Password } from '../../../domain/value-objects/password/password';
import { User } from '../../../domain/entities/user/user';
import { EmailValidator } from '../../../domain/contracts/validation/email-validator';
import { Hasher } from '../../../domain/contracts/security/hasher';
import { UserAlreadyExistsError } from '../../errors/user-already-exists.error';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class RegisterUserHandler {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: UserRepository,
        @Inject('EmailValidator')
        private readonly emailValidator: EmailValidator,
        @Inject('Hasher') private readonly hasher: Hasher,
    ) {}

    async execute(command: RegisterUserCommand): Promise<void> {
        const { email, plain, role } = command;

        const emailVO = Email.create(email, this.emailValidator);
        const passwordVO = await Password.create(plain, this.hasher);

        const userAlreadyExists =
            await this.userRepository.findByEmail(emailVO);
        if (userAlreadyExists) {
            throw new UserAlreadyExistsError(email);
        }

        const user = User.create({
            email: emailVO,
            password: passwordVO,
            role,
        });

        await this.userRepository.save(user);
    }
}
