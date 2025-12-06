import { Hono } from 'hono';
import { createPost, getPosts } from '../services/postsService';

const postsRouter = new Hono();

postsRouter.get('/', async (c) => {
  const posts = await getPosts();

  return c.json(
    {
      posts,
    },
    200
  );
});

postsRouter.post('/', async (c) => {
  const req = await c.req.json();

  const post = await createPost({
    content: req.content,
    author: {
      connect: {
        uuid: '00000000-0000-0000-0000-000000000000',
      },
    },
  });

  return c.json(
    {
      post,
    },
    201
  );
});

export default postsRouter;
