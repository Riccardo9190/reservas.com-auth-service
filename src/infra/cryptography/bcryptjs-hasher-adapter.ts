import bcrypt from 'bcryptjs';
import { Hasher } from '../../domain/contracts/security/hasher';

export class BcryptjsHasherAdapter implements Hasher {
    constructor(private readonly salt: number = 10) {}

    async hash(plain: string): Promise<string> {
        return bcrypt.hash(plain, this.salt);
    }
}
