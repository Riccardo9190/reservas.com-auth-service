import { UserRepository } from '../../../domain/contracts/persistence/user-repository';
import { User } from '../../../domain/entities/user/user';
import { Email } from '../../../domain/value-objects/email/email';

export class InMemoryUserRepository implements UserRepository {
    private users: User[] = [];

    async findByEmail(email: Email): Promise<User | null> {
        const user = this.users.find(user => user.email === email);
        return user || null;
    }

    async save(user: User): Promise<void> {
        this.users.push(user);
    }
}
