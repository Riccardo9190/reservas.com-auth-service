import { Injectable, Inject } from '@nestjs/common';
import { Either, left, right } from '../../../domain/shared/either';
import { UnexpectedError } from '../../errors/unexpected-error';
import { UserNotExistsError } from '../../errors/user-not-exists-error';
import { ICommandHandler } from '../../contracts/handler/command-handler.interface';
import { LoginUserCommand } from './login-user.command';
import { Email } from '../../../domain/value-objects/email/email';
import { UserRepository } from '../../../domain/contracts/persistence/user-repository';
import { Hasher } from '../../../domain/contracts/security/hasher';
import { USER_REPOSITORY, HASHER } from '../../../domain/di/tokens';
import { InvalidPasswordError } from '../../errors/invalid-password.error';

type OutputLoginUserHandler = Either<
    UserNotExistsError | InvalidPasswordError | UnexpectedError,
    void
>;

@Injectable()
export class LoginUserHandler
    implements ICommandHandler<LoginUserCommand, OutputLoginUserHandler>
{
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepository,
        @Inject(HASHER)
        private readonly hasher: Hasher,
    ) {}

    async execute(command: LoginUserCommand): Promise<OutputLoginUserHandler> {
        try {
            const { email, plain } = command;

            const emailVO = Email.restore(email);

            const user = await this.userRepository.findByEmail(emailVO);
            if (!user) {
                return left(new UserNotExistsError(email));
            }

            const isPasswordValid = await user.password.compare(
                plain,
                this.hasher,
            );

            if (!isPasswordValid) {
                return left(new InvalidPasswordError(email));
            }

            return right(undefined);
        } catch (error) {
            return left(new UnexpectedError(error));
        }
    }
}
