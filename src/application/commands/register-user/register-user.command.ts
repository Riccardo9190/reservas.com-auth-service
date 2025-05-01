import { UserRole } from '../../../domain/enums/user-role.enum';

export interface RegisterUserCommand {
    email: string;
    password: string;
    role: UserRole;
}
