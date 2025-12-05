import { Box, Text } from '@chakra-ui/react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  return (
    <Box h="100vh" w="100vw" bg="gray.900" textAlign="center">
      <Text color="white">Hello World</Text>
    </Box>
  );
}
