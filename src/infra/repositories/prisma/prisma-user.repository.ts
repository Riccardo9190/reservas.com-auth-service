import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../domain/contracts/persistence/user-repository';
import { User } from '../../../domain/entities/user/user';
import { Email } from '../../../domain/value-objects/email/email';
import { Password } from '../../../domain/value-objects/password/password';
import { UserRole } from '../../../domain/enums/user-role.enum';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findByEmail(email: Email): Promise<User | null> {
        const userData = await this.prisma.user.findUnique({
            where: { email: email.value },
        });

        if (!userData) return null;

        return User.restore(userData.id, {
            email: Email.restore(userData.email),
            password: Password.restore(userData.password),
            role: userData.role as UserRole,
        });
    }

    async save(user: User): Promise<void> {
        const { id, email, password, role } = user.toPersistence();

        await this.prisma.user.create({
            data: { id, email, password, role, createdAt: new Date() },
        });
    }
}
