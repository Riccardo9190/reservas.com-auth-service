import { UserRole } from '../../../domain/enums/user-role.enum';

export interface RegisterUserCommand {
    email: string;
    plain: string;
    role: UserRole;
}
