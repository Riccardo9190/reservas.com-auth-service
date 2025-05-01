import { User } from '../../entities/user/user';
import { Email } from '../../value-objects/email/email';

export interface UserRepository {
    findByEmail(email: Email): Promise<User | null>;
    save(user: User): Promise<void>;
}
