import { Box } from '@chakra-ui/react';
import { createFileRoute } from '@tanstack/react-router';
import SignUpForm from '@/components/sign-up/SignUpForm';

export const Route = createFileRoute('/sign-up')({
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
