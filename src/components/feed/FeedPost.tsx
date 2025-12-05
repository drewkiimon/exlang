import { Box, Heading, Text } from '@chakra-ui/react';
import { colors } from '@/components/ui/colors';

type Post = {
  id: number;
  title?: string;
  body: string;
  created_at: string;
};

type Props = {
  post: Post;
};
const FeedPost = ({ post }: Props) => {
  console.log(post.created_at);
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
      <Text color={colors.textMuted}>{post.body}</Text>
      <Text fontSize="sm" color={colors.textMuted} mt={4}>
        {new Date(post.created_at).toLocaleString()}
      </Text>
    </Box>
  );
};

export default FeedPost;
