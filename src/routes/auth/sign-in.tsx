import { createFileRoute } from '@tanstack/react-router';
import { Box } from '@chakra-ui/react';
import SignInForm from '@/components/auth/SignInForm';

export const Route = createFileRoute('/auth/sign-in')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Box
      width="100%"
      h="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <SignInForm />
    </Box>
  );
}
