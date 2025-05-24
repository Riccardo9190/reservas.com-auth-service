import {
    BadRequestException,
    ConflictException,
    Controller,
    Post,
    Body,
} from '@nestjs/common';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { RegisterUserHandler } from '../../application/commands/register-user/register-user.handler';
import { RegisterUserCommand } from '../../application/commands/register-user/register-user.command';
import { UserAlreadyExistsError } from '../../application/errors/user-already-exists.error';
import { RegisterUserDto } from './register-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly registerUserHandler: RegisterUserHandler) {}

    @Post('register')
    async register(@Body(new ZodValidationPipe()) dto: RegisterUserDto) {
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

            throw new BadRequestException('Unexpected error');
        }

        return { message: `User ${command.email} registered successfully.` };
    }
}
