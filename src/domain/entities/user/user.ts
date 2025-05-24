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
    private readonly _id: number;
    private readonly _uuid: string;
    private readonly _email: Email;
    private readonly _password: Password;
    private readonly _role: UserRole;

    private constructor(id: number, uuid: string, props: UserProps) {
        this._id = id;
        this._uuid = uuid;
        this._email = props.email;
        this._password = props.password;
        this._role = props.role;
    }

    static create(props: UserProps): User {
        const uuid = uuidv4();
        return new User(0, uuid, props);
    }

    static restore(id: number, uuid: string, props: UserProps): User {
        return new User(id, uuid, props);
    }

    toPersistence(): {
        uuid: string;
        email: string;
        password: string;
        role: string;
    } {
        return {
            uuid: this._uuid,
            email: this._email.value,
            password: this._password.value,
            role: this._role,
        };
    }

    get id(): number {
        return this._id;
    }

    get uuid(): string {
        return this._uuid;
    }

    get email(): Email {
        return this._email;
    }

    get role(): UserRole {
        return this._role;
    }
}
