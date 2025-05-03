import { UserRepository } from '../../../domain/contracts/persistence/user-repository';
import { User } from '../../../domain/entities/user/user';
import { Email } from '../../../domain/value-objects/email/email';
import { Password } from '../../../domain/value-objects/password/password';
import { UserRole } from '../../../domain/enums/user-role.enum';
import { Pool } from 'mysql2/promise';

export class MySqlUserRepository implements UserRepository {
    constructor(private readonly pool: Pool) {}

    async findByEmail(email: Email): Promise<User | null> {
        const [rows] = await this.pool.execute<any[]>(
            'SELECT * FROM user WHERE email = ? LIMIT 1',
            [email.value],
        );

        const userData = rows[0];
        if (!userData) return null;

        return User.restore(userData.id, {
            email: Email.restore(userData.email),
            password: Password.restore(userData.password),
            role: userData.role as UserRole,
        });
    }

    async save(user: User): Promise<void> {
        const { id, email, password, role } = user.toPersistence();

        await this.pool.execute(
            'INSERT INTO user (id, email, password, role, createdAt) VALUES (?, ?, ?, ?, ?)',
            [id, email, password, role, new Date()],
        );
    }
}
