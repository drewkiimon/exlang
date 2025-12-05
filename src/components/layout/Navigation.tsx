import { Flex } from '@chakra-ui/react';
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
      <Link to="/">Home</Link>
    </Flex>
  );
};

export default Navigation;
