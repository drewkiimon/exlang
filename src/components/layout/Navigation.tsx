import { Box, Flex, HStack } from '@chakra-ui/react';
import {
  Link,
  useMatchRoute,
  useRouter,
  useRouterState,
} from '@tanstack/react-router';
import { useEffect } from 'react';
import { colors } from '@/components/ui/colors';

export const NavigationHeight = '64px';

const navigationItems = [
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'Sign Up',
    to: '/sign-up',
  },
];

const NavLink = ({ to, label }: { to: string; label: string }) => {
  const matchRoute = useMatchRoute();
  const isActive = !!matchRoute({ to });

  return (
    <Box
      px={3}
      py={2}
      borderRadius="md"
      bg={isActive ? colors.bgLight : 'transparent'}
      transition="background 0.15s"
      fontWeight={isActive ? 'bold' : 'normal'}
    >
      <Link to={to}>{label}</Link>
    </Box>
  );
};

const Navigation = () => {
  return (
    <Flex
      as="nav"
      justify="space-between"
      align="center"
      bg={colors.bg}
      px={6}
      py={3}
      h={NavigationHeight}
    >
      <HStack gap={4}>
        <NavLink to="/" label="Exlang" />
      </HStack>
      <NavLink to="/sign-up" label="Sign Up" />
    </Flex>
  );
};

export default Navigation;
