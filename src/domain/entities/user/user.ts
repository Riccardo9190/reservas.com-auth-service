import { UserRole } from '../../enums/user-role.enum';
import { Email } from '../../value-objects/email/email';
import { Password } from '../../value-objects/password/password';
import { v4 as uuidv4 } from 'uuid';

type UserProps = {
    email: Email;
    password: Password;
    role: UserRole;
};

export class User {
    private readonly _id: string;
    private readonly _email: Email;
    private readonly _password: Password;
    private readonly _role: UserRole;

    private constructor(id: string, props: UserProps) {
        this._id = id;
        this._email = props.email;
        this._password = props.password;
        this._role = props.role;
    }

    static create(props: UserProps): User {
        const id = uuidv4();
        return new User(id, props);
    }

    get id(): string {
        return this._id;
    }

    get email(): Email {
        return this._email;
    }

    get role(): UserRole {
        return this._role;
    }
}
