import { Box } from '@chakra-ui/react';
import { useRouter } from '@tanstack/react-router';
import { colors } from '@/components/ui/colors';
import Navigation, { NavigationHeight } from '@/components/layout/Navigation';
import { useAuth } from '@/auth';

const Main = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const auth = useAuth();

  if (!auth.isAuthenticated) {
    router.navigate({ to: '/auth/sign-in' });
  }

  return (
    <Box h="100vh" w="100vw">
      <Navigation />
      <Box
        as="main"
        bg={colors.bgDark}
        px={6}
        py={4}
        height={`calc(100vh - ${NavigationHeight})`}
        overflow="auto"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Main;
