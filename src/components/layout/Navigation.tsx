import { Flex, HStack } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';
import { colors } from '@/components/ui/colors';

export const NavigationHeight = '64px';

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
        <Link to="/">Exlang</Link>
      </HStack>
      <Link to="/sign-up">Sign Up</Link>
    </Flex>
  );
};

export default Navigation;
