import { Box, Button, Field, Input, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';
import { colors } from '@/components/ui/colors';

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
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log(data);
  };

  return (
    <Box w="320px" backgroundColor={colors.bg} borderRadius="md" p={4}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <VStack gap={4}>
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
