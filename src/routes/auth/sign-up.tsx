import { createFileRoute } from '@tanstack/react-router';
import { Box } from '@chakra-ui/react';
import SignUpForm from '@/components/auth/SignUpForm';

export const Route = createFileRoute('/auth/sign-up')({
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
      <SignUpForm />
    </Box>
  );
}
