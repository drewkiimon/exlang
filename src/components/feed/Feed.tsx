import { Container, VStack } from '@chakra-ui/react';

import FeedPost from '@/components/feed/FeedPost';
import PostComposer from '@/components/feed/PostComposer';

const dummyPosts = [
  { id: 1, title: 'First Post', body: 'This is the body of the first post.' },
  {
    id: 2,
    title: '一番目の投稿',
    body: 'これは一番目の投稿の本文です。',
  },
  {
    id: 3,
    title: 'Third Post',
    body: 'This is the third dummy post in the feed.',
  },
];

const Feed = () => {
  return (
    <Container maxW="xl" centerContent>
      <PostComposer />
      <VStack gap={6} w="100%" align="center" mt={8}>
        {dummyPosts.map((post) => (
          <FeedPost key={post.id} post={post} />
        ))}
      </VStack>
    </Container>
  );
};

export default Feed;
