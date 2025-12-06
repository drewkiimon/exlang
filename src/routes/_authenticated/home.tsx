import { createFileRoute } from '@tanstack/react-router';
import { Box } from '@chakra-ui/react';
import { useAuth } from '@/auth';

export const Route = createFileRoute('/_authenticated/home')({
  component: Home,
});

function Home() {
  const auth = useAuth();

  console.log('AAA auth', auth.user);

  return <Box>Hello, {auth.user?.username}</Box>;
}
