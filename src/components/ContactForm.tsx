import { useForm, SubmitHandler } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

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


export type ContactFormInputs = z.infer<typeof ContactFormSchema>;

async function sendEmail(data: ContactFormInputs) {
  return fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
}

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(ContactFormSchema),
  });

  const processForm: SubmitHandler<ContactFormInputs> = async (
    data
  ) => {
    try {
      await sendEmail(data);
      toast.success('Email sent!');
      reset();
      return;
    } catch (e) {
      // toast error
      reset(data);
      toast.error('Something went wrong! Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(processForm)} className="space-y-4">
      <div>
        <input
          placeholder="Your full name"
          className="w-full border-[1px] p-2 border-[#e2e2e2] rounded-lg"
          {...register('name')}
        />
        {errors.name?.message && (
          <p className="ml-1 mt-1 text-sm text-primary">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <input
          placeholder="Affiliation (Company / University / Organization)"
          className="w-full border-[1px] p-2 border-[#e2e2e2] rounded-lg"
          {...register('affiliation')}
        />
        {errors.affiliation?.message && (
          <p className="ml-1 mt-1 text-sm text-primary">
            {errors.affiliation.message}
          </p>
        )}
      </div>

      <div>
        <input
          placeholder="Your email"
          className="w-full border-[1px] p-2 border-[#e2e2e2] rounded-lg"
          {...register('email')}
        />
        {errors.email?.message && (
          <p className="ml-1 mt-1 text-sm text-primary">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <textarea
          rows={5}
          cols={5}
          placeholder="Your Message"
          className="w-full rounded-lg border-[1px] p-2 border-[#e2e2e2]"
          {...register('message')}
        />
        {errors.message?.message && (
          <p className="ml-1 text-sm text-primary">
            {errors.message.message}
          </p>
        )}
      </div>

      <button
        disabled={isSubmitting}
        className="px-4 rounded-lg border border-black bg-black py-2 font-medium text-white transition-colors hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
