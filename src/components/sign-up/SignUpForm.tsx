import { colors } from '@/components/ui/colors';
import { Box, Button, Field, Input, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';

const schema = z.object({
  username: z.string('Please select a username').min(3).max(20),
  email: z.email('Please enter a valid email address'),
  password: z
    .string('Please enter a password')
    .min(8)
    .max(32)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    ),
  confirmPassword: z
    .string('Please enter a password')
    .min(8)
    .max(32)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    ),
});

const SignUpForm = () => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
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
            <Button type="submit">Sign up</Button>
          </VStack>
        </form>
      </FormProvider>
    </Box>
  );
};

export default SignUpForm;
