import { Box, Button, Field, Input, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';
import { useRouter } from '@tanstack/react-router';
import { colors } from '@/components/ui/colors';
import exlangFetch from '@/utils/exlangFetch';
import { toaster } from '@/components/ui/toaster';

const passwordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters' })
  .max(20, { message: 'Password must be at most 20 characters' })
  .refine((password) => /[A-Z]/.test(password), {
    message: 'Password must contain an uppercase letter',
  })
  .refine((password) => /[a-z]/.test(password), {
    message: 'Password must contain a lowercase letter',
  })
  .refine((password) => /[0-9]/.test(password), {
    message: 'Password must contain a number',
  })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: 'Password must contain a special character',
  });

const schema = z
  .object({
    firstName: z
      .string('Please enter your first name')
      .min(1, 'First name is required'),
    lastName: z
      .string('Please enter your last name')
      .min(1, 'Last name is required'),
    username: z.string('Please select a username').min(3).max(20),
    email: z.email('Please enter a valid email address'),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const SignUpForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async ({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    username,
  }: z.infer<typeof schema>) => {
    // Double checking
    form.setError('confirmPassword', { message: 'Passwords do not match' });
    if (password !== confirmPassword) {
      return;
    }

    const usernamePassword = `${username}:${password}`;
    const credentials = btoa(usernamePassword);
    const response = await exlangFetch('/auth/sign-up', {
      method: 'POST',
      body: JSON.stringify({ firstName, lastName, email, credentials }),
    });

    if (!response.ok) {
      toaster.error({
        title: 'Failed to sign up',
      });
      return;
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    toaster.success({
      title: 'Signed up successfully',
    });
    router.navigate({ to: '/' });
  };

  return (
    <Box w="320px" backgroundColor={colors.bg} borderRadius="md" p={4}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <VStack gap={4}>
            <Field.Root invalid={!!form.formState.errors.firstName}>
              <Field.Label>First Name</Field.Label>
              <Input
                type="text"
                placeholder="First Name"
                {...form.register('firstName')}
              />
              <Field.ErrorText>
                {form.formState.errors.firstName?.message}
              </Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!!form.formState.errors.lastName}>
              <Field.Label>Last Name</Field.Label>
              <Input
                type="text"
                placeholder="Last Name"
                {...form.register('lastName')}
              />
              <Field.ErrorText>
                {form.formState.errors.lastName?.message}
              </Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!!form.formState.errors.username}>
              <Field.Label>Username</Field.Label>
              <Input
                type="text"
                placeholder="Username"
                {...form.register('username')}
              />
              <Field.ErrorText>
                {form.formState.errors.username?.message}
              </Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!!form.formState.errors.email}>
              <Field.Label>Email</Field.Label>
              <Input
                type="email"
                placeholder="Email"
                {...form.register('email')}
              />
              <Field.ErrorText>
                {form.formState.errors.email?.message}
              </Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!!form.formState.errors.password}>
              <Field.Label>Password</Field.Label>
              <Input
                type="password"
                placeholder="Password"
                {...form.register('password')}
              />
              <Field.ErrorText>
                {form.formState.errors.password?.message}
              </Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!!form.formState.errors.confirmPassword}>
              <Field.Label>Confirm Password</Field.Label>
              <Input
                type="password"
                placeholder="Confirm Password"
                {...form.register('confirmPassword')}
              />
              <Field.ErrorText>
                {form.formState.errors.confirmPassword?.message}
              </Field.ErrorText>
            </Field.Root>
            <Button w="100%" type="submit" bg={colors.primary}>
              Sign up
            </Button>
          </VStack>
        </form>
      </FormProvider>
    </Box>
  );
};

export default SignUpForm;
