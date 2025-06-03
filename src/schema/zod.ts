import z from 'zod';

const userSchema = z.object({
    email: z.string().email(),
    role: z.enum(['client', 'consultant']),
    otp: z.string().length(6).optional(),
    
})

const clientSchema = z.object({
    industry: z.string().min(1, 'Industry is required'),
    companyDescription: z.string().optional(),
    projectsPosted: z.number().int().nonnegative().default(0),
    companyName: z.string().min(1, 'Company name is required'),
    user: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid user ID format'),
})

const consultantSchema = z.object({
    fullName: z.string().min(1, 'Full name is required'),
    skills: z.array(z.string()).nonempty('At least one skill is required'),
    domain: z.string().min(1, 'Domain is required'),
    availabilityTimeline: z.string().min(1, 'Availability timeline is required'),
    yearsOfExperience: z.number().int().nonnegative().default(0),
    bio: z.string().optional(),
    user: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid user ID format'),
})

export {userSchema, clientSchema, consultantSchema};
