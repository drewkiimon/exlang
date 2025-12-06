import { Box } from '@chakra-ui/react';
import { colors } from '@/components/ui/colors';
import Navigation, { NavigationHeight } from '@/components/layout/Navigation';

const Main = ({ children }: { children: React.ReactNode }) => (
  <Box h="100vh" w="100vw">
    <Navigation />
    <Box
      as="main"
      bg={colors.bgDark}
      px={6}
      py={4}
      height={`calc(100vh - ${NavigationHeight})`}
      overflow="auto"
    >
      {children}
    </Box>
  </Box>
);

export default Main;
