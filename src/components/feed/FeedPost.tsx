import { Box, Heading, Text } from '@chakra-ui/react';
import { colors } from '@/components/ui/colors';

type Post = {
  id: number;
  title?: string;
  content: string;
  createdAt: string;
};

type Props = {
  post: Post;
};
const FeedPost = ({ post }: Props) => {
  console.log(post.createdAt);
  return (
    <Box
      key={post.id}
      bg={colors.bgLight}
      color={colors.text}
      border="1px solid"
      borderColor={colors.border}
      borderRadius="md"
      shadow="md"
      w="100%"
      p={6}
    >
      {post.title && (
        <Heading size="md" mb={2} color={colors.primary}>
          {post.title}
        </Heading>
      )}
      <Text color={colors.textMuted}>{post.content}</Text>
      <Text fontSize="sm" color={colors.textMuted} mt={4}>
        {new Date(post.createdAt).toLocaleString()}
      </Text>
    </Box>
  );
};

export default FeedPost;
