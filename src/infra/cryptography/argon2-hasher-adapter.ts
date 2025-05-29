import argon2 from 'argon2';
import { Hasher } from '../../domain/contracts/security/hasher';

export class Argon2HasherAdapter implements Hasher {
    async hash(plain: string): Promise<string> {
        return argon2.hash(plain);
    }

    async compare(plain: string, hashed: string): Promise<boolean> {
        return argon2.verify(hashed, plain);
    }
}
