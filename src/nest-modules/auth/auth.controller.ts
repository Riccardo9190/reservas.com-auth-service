import {
    BadRequestException,
    ConflictException,
    Controller,
    Post,
    Body,
} from '@nestjs/common';
import { RegisterUserHandler } from '../../application/commands/register-user/register-user.handler';
import { RegisterUserCommand } from '../../application/commands/register-user/register-user.command';
import { UserAlreadyExistsError } from '../../application/errors/user-already-exists.error';
import { UnexpectedError } from '../../application/errors/unexpected-error';
import { RegisterUserDto } from './register-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly registerUserHandler: RegisterUserHandler) {}

    @Post('register')
    async register(@Body() dto: RegisterUserDto) {
        const command: RegisterUserCommand = {
            email: dto.email,
            plain: dto.plain,
            role: dto.role,
        };

        const resultOrError = await this.registerUserHandler.execute(command);

        if (resultOrError.isLeft()) {
            const error = resultOrError.value;

            if (error instanceof UserAlreadyExistsError) {
                throw new ConflictException(error.message);
            }

            if (error instanceof UnexpectedError) {
                throw new BadRequestException(error.message);
            }
        }

        return {
            message: `User ${command.email} registered successfully.`,
        };
    }
}
