import argon2 from 'argon2';
import { Hasher } from '../../domain/contracts/security/hasher';

export class Argon2HasherAdapter implements Hasher {
    async hash(plain: string): Promise<string> {
        return await argon2.hash(plain);
    }
}
