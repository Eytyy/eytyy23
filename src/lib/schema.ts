import { z } from 'zod';

export const ContactFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email('Invalid email.'),
  affiliation: z
    .string()
    .min(1, { message: 'Affiliation is required.' }),
  message: z
    .string()
    .min(1, { message: 'Message is required.' })
    .min(6, { message: 'Message must be at least 6 characters.' }),
});
