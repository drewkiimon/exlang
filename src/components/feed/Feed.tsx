import { Container, VStack } from '@chakra-ui/react';

import { useQuery } from '@tanstack/react-query';
import FeedPost from '@/components/feed/FeedPost';
import PostComposer from '@/components/feed/PostComposer';

const Feed = () => {
  const getPosts = async () => {
    const response = await fetch('http://localhost:4000/api/posts');
    return response.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Container maxW="xl" centerContent>
      <PostComposer />
      <VStack gap={6} w="100%" align="center" mt={8}>
        {data?.posts.map((post) => (
          <FeedPost key={post.id} post={post} />
        ))}
      </VStack>
    </Container>
  );
};

export default Feed;
