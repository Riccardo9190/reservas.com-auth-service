import {
    BadRequestException,
    ConflictException,
    Controller,
    Post,
    Body,
} from '@nestjs/common';
import { RegisterUserHandler } from '../../application/commands/register-user/register-user.handler';
import { RegisterUserCommand } from '../../application/commands/register-user/register-user.command';
import { InvalidEmailError } from '../../domain/errors/invalid-email.error';
import { InvalidPasswordError } from '../../domain/errors/invalid-password-error';
import { UserAlreadyExistsError } from '../../application/errors/user-already-exists.error';

@Controller('auth')
export class AuthController {
    constructor(private readonly registerUserHandler: RegisterUserHandler) {}

    @Post('register')
    async register(@Body() dto: RegisterUserCommand) {
        const command: RegisterUserCommand = {
            email: dto.email,
            plain: dto.plain,
            role: dto.role,
        };

        const resultOrError = await this.registerUserHandler.execute(command);

        if (resultOrError.isLeft()) {
            const error = resultOrError.value;

            if (
                error instanceof InvalidEmailError ||
                error instanceof InvalidPasswordError
            ) {
                throw new BadRequestException(error.message);
            }

            if (error instanceof UserAlreadyExistsError) {
                throw new ConflictException(error.message);
            }

            throw new BadRequestException('Unexpected error');
        }

        return { message: `User ${command.email} registered successfully.` };
    }
}
