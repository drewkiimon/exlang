import { Container, Skeleton, Spinner, VStack } from '@chakra-ui/react';

import { useQuery } from '@tanstack/react-query';
import FeedPost from '@/components/feed/FeedPost';
import PostComposer from '@/components/feed/PostComposer';
import exlangFetch from '@/utils/exlangFetch';

const queryKey = ['posts'];
const queryFn = async () => {
  const response = await exlangFetch('/posts');

  return response.json();
};
const staleTime = 1000 * 60 * 5;

const Feed = () => {
  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn,
    staleTime,
  });

  if (error) return <div>Error: {error.message}</div>;

  return (
    <Container maxW="xl" centerContent>
      <PostComposer />
      <VStack gap={6} w="100%" align="center" mt={8}>
        {isLoading
          ? new Array(3)
              .fill(null)
              .map((_, index) => (
                <Skeleton key={index} height="150px" w="100%" />
              ))
          : data?.posts.map((post) => <FeedPost key={post.id} post={post} />)}
      </VStack>
    </Container>
  );
};

export default Feed;
