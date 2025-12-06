import { Box, Flex, HStack } from '@chakra-ui/react';
import { Link, useMatchRoute, useRouter } from '@tanstack/react-router';

import { colors } from '@/components/ui/colors';
import { useAuth } from '@/auth';

export const NavigationHeight = '64px';

// const navigationItems = [
//   {
//     label: 'Home',
//     to: '/',
//   },
//   {
//     label: 'Sign Up',
//     to: '/sign-up',
//   },
// ];

const NavLink = ({
  to,
  label,
  onClick,
}: {
  to?: string;
  label: string;
  onClick?: () => void;
}) => {
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
      <Link to={to} onClick={onClick}>
        {label}
      </Link>
    </Box>
  );
};

const Navigation = () => {
  const auth = useAuth();
  const authenticated = auth.isAuthenticated;

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
      {authenticated ? (
        <Box>
          <NavLink onClick={auth.logout} label="Logout" />
        </Box>
      ) : (
        <HStack gap={4}>
          <NavLink to="/auth/sign-up" label="Sign Up" />
          <NavLink to="/auth/sign-in" label="Sign In" />
        </HStack>
      )}
    </Flex>
  );
};

export default Navigation;
