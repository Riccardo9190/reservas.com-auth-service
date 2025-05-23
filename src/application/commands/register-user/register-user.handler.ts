import { RegisterUserCommand } from './register-user.command';
import { UserRepository } from '../../../domain/contracts/persistence/user-repository';
import { Email } from '../../../domain/value-objects/email/email';
import { Password } from '../../../domain/value-objects/password/password';
import { User } from '../../../domain/entities/user/user';
import { EmailValidator } from '../../../domain/contracts/validation/email-validator';
import { Hasher } from '../../../domain/contracts/security/hasher';
import { UserAlreadyExistsError } from '../../errors/user-already-exists.error';
import { Injectable, Inject } from '@nestjs/common';
import { Either, left, right } from '../../../domain/shared/either';
import { ICommandHandler } from '../../contracts/handler/command-handler.interface';
import { InvalidEmailError } from '../../../domain/errors/invalid-email.error';
import { InvalidPasswordError } from '../../../domain/errors/invalid-password-error';

type OutputRegisterUserHandler = Either<
    InvalidEmailError | InvalidPasswordError | UserAlreadyExistsError,
    void
>;

@Injectable()
export class RegisterUserHandler
    implements ICommandHandler<RegisterUserCommand, OutputRegisterUserHandler>
{
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: UserRepository,
        @Inject('EmailValidator')
        private readonly emailValidator: EmailValidator,
        @Inject('Hasher') private readonly hasher: Hasher,
    ) {}

    async execute(
        command: RegisterUserCommand,
    ): Promise<OutputRegisterUserHandler> {
        const { email, plain, role } = command;

        try {
            const emailVO = Email.create(email, this.emailValidator);
            const passwordVO = await Password.create(plain, this.hasher);

            const exists = await this.userRepository.findByEmail(emailVO);
            if (exists) {
                return left(new UserAlreadyExistsError(email));
            }

            const user = User.create({
                email: emailVO,
                password: passwordVO,
                role,
            });
            await this.userRepository.save(user);

            return right(undefined);
        } catch (error) {
            if (
                error instanceof InvalidEmailError ||
                error instanceof InvalidPasswordError ||
                error instanceof UserAlreadyExistsError
            ) {
                return left(error);
            }

            throw error;
        }
    }
}
