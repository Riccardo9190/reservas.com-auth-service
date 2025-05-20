import { Controller, Post, Body } from '@nestjs/common';
import { RegisterUserHandler } from '../../../application/commands/register-user/register-user.handler';
import { RegisterUserCommand } from '../../../application/commands/register-user/register-user.command';

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

        await this.registerUserHandler.execute(command);

        return { message: 'Usuário registrado com sucesso!' };
    }
}
