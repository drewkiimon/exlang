import { Box, Button, Field, Input, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';
import { useRouter } from '@tanstack/react-router';
import { colors } from '@/components/ui/colors';
import exlangFetch from '@/utils/exlangFetch';
import { Toaster, toaster } from '@/components/ui/toaster';

const schema = z.object({
  username: z
    .string('Please enter your username')
    .min(1, 'Username is required'),
  password: z
    .string('Please enter your password')
    .min(1, 'Password is required'),
});

const SignInForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async ({ username, password }: z.infer<typeof schema>) => {
    try {
      const usernamePassword = `${username}:${password}`;
      const credentials = btoa(usernamePassword);

      const response = await exlangFetch('/auth/sign-in', {
        method: 'POST',
        body: JSON.stringify({ credentials }),
      });

      if (!response.ok) {
        console.log('CCC', response);
        throw new Error('Failed to sign in');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      toaster.success({
        title: 'Signed in successfully',
      });
      router.navigate({ to: '/' });
    } catch (error) {
      toaster.error({
        title: 'Failed to sign in',
      });
    }
  };

  return (
    <Box w="320px" backgroundColor={colors.bg} borderRadius="md" p={4}>
      <Toaster />
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
            <Button w="100%" type="submit" bg={colors.primary}>
              Sign in
            </Button>
          </VStack>
        </form>
      </FormProvider>
    </Box>
  );
};

export default SignInForm;
