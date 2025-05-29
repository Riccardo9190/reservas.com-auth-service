import { Module } from '@nestjs/common';
import { USER_REPOSITORY, HASHER } from '../../domain/di/tokens';
import { AuthController } from './auth.controller';
import { RegisterUserHandler } from '../../application/commands/register-user/register-user.handler';

import { PrismaUserRepository } from '../../infra/repositories/prisma/prisma-user.repository';
import { BcryptjsHasherAdapter } from '../../infra/cryptography/bcryptjs-hasher-adapter';
import { PrismaService } from '../../infra/database/prisma.service';
import { LoginUserHandler } from '../../application/commands/login-user/login-user.handler';

@Module({
    controllers: [AuthController],
    providers: [
        PrismaService,
        RegisterUserHandler,
        LoginUserHandler,
        { provide: USER_REPOSITORY, useClass: PrismaUserRepository },
        { provide: HASHER, useClass: BcryptjsHasherAdapter },
    ],
})
export class AuthModule {}
