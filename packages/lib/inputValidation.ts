import z from 'zod';

export const inputValidation = z.object({
    name : z.string().min(3, 'Name must be at least 3 characters'),
    email : z.string().email('Invalid email format'),
    number : z.string().min(10).max(10),
    bankName : z.string().min(2, 'Bank name must be at least 2 characters'),
    //  password: z.string()
    //     .min(8, 'Password must be at least 8 characters')
    //     .max(100, 'Password cannot exceed 100 characters')
    //     .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    //     .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    //     .regex(/[0-9]/, 'Password must contain at least one number')
    //     .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
    //     .refine((password) => !/\s/.test(password), 'Password cannot contain whitespace')
    password : z.string().trim().min(6, 'Password must be at least 6 characters') 
})