import {
    BadRequestException,
    ConflictException,
    Controller,
    Post,
    Body,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { RegisterUserHandler } from '../../application/commands/register-user/register-user.handler';
import { RegisterUserCommand } from '../../application/commands/register-user/register-user.command';
import { UserAlreadyExistsError } from '../../application/errors/user-already-exists.error';
import { UnexpectedError } from '../../application/errors/unexpected-error';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserHandler } from '../../application/commands/login-user/login-user.handler';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginUserCommand } from '../../application/commands/login-user/login-user.command';
import { UserNotExistsError } from '../../application/errors/user-not-exists-error';
import { InvalidPasswordError } from '../../application/errors/invalid-password.error';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly registerUserHandler: RegisterUserHandler,
        private readonly loginUserHandler: LoginUserHandler,
    ) {}

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

    @Post('login')
    async login(@Body() dto: LoginUserDto) {
        const command: LoginUserCommand = {
            email: dto.email,
            plain: dto.plain,
        };

        const resultOrError = await this.loginUserHandler.execute(command);

        if (resultOrError.isLeft()) {
            const error = resultOrError.value;
            if (error instanceof UserNotExistsError) {
                throw new NotFoundException(error.message);
            }

            if (error instanceof InvalidPasswordError) {
                throw new UnauthorizedException(error.message);
            }
            if (error instanceof UnexpectedError) {
                throw new BadRequestException(error.message);
            }
        }

        return {
            message: `User ${command.email} logged successfully.`,
        };
    }
}
