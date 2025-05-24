import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';
import { UserRole } from '../../domain/enums/user-role.enum';

export const RegisterUserSchema = z.object({
    email: z.string().email({ message: 'Invalid email format' }),
    plain: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .max(36, 'Password must be at most 36 characters')
        .regex(/[a-zA-Z]/, 'Password must contain at least one letter')
        .regex(/\d/, 'Password must contain at least one number')
        .refine(val => val.trim().length > 0, {
            message: 'Password cannot be only spaces',
        }),
    role: z.nativeEnum(UserRole, {
        errorMap: () => ({ message: 'Invalid user role' }),
    }),
});

export class RegisterUserDto extends createZodDto(RegisterUserSchema) {}
