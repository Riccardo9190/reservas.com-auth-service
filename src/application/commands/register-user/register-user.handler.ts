import { RegisterUserCommand } from './register-user.command';
import { USER_REPOSITORY, HASHER } from '../../../domain/di/tokens';
import { UserRepository } from '../../../domain/contracts/persistence/user-repository';
import { Email } from '../../../domain/value-objects/email/email';
import { Password } from '../../../domain/value-objects/password/password';
import { User } from '../../../domain/entities/user/user';
import { Hasher } from '../../../domain/contracts/security/hasher';
import { UserAlreadyExistsError } from '../../errors/user-already-exists.error';
import { Injectable, Inject } from '@nestjs/common';
import { Either, left, right } from '../../../domain/shared/either';
import { ICommandHandler } from '../../contracts/handler/command-handler.interface';

type OutputRegisterUserHandler = Either<UserAlreadyExistsError, void>;

@Injectable()
export class RegisterUserHandler
    implements ICommandHandler<RegisterUserCommand, OutputRegisterUserHandler>
{
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepository,
        @Inject(HASHER) private readonly hasher: Hasher,
    ) {}

    async execute(
        command: RegisterUserCommand,
    ): Promise<OutputRegisterUserHandler> {
        const { email, plain, role } = command;

        const emailVO = Email.create(email);
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
    }
}
