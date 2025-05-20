import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { RegisterUserHandler } from '../../../application/commands/register-user/register-user.handler';

import { PrismaUserRepository } from '../../../infra/repositories/prisma/prisma-user.repository';
import { ValidatorJsSAdapter } from '../../../infra/validators/email/validator-adapter';
import { BcryptjsHasherAdapter } from '../../../infra/cryptography/bcryptjs-hasher-adapter';
import { PrismaService } from '../../../infra/database/prisma.service';

@Module({
    controllers: [AuthController],
    providers: [
        PrismaService,
        RegisterUserHandler,
        { provide: 'UserRepository', useClass: PrismaUserRepository },
        { provide: 'EmailValidator', useClass: ValidatorJsSAdapter },
        { provide: 'Hasher', useClass: BcryptjsHasherAdapter },
    ],
})
export class AuthModule {}
