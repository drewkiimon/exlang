import { serve } from '@hono/node-server';
import { Hono } from 'hono';

import postsRouter from './routes/posts.js';
import { cors } from 'hono/cors';
import { zValidator } from '@hono/zod-validator';
import z from 'zod';

const app = new Hono();

// All for all commands, get for only cors on get
app.all(
  '*',
  cors({
    origin: ['http://localhost:3000'],
  })
);

const helloRouter = app.get(
  '/hello',
  zValidator(
    'query',
    z.object({
      name: z.string(),
    })
  ),
  (c) => {
    const data = c.req.valid('query');

    return c.json({
      message: `Hello ${data.name}!`,
    });
  }
);

app.route('/api/posts', postsRouter);

serve(
  {
    fetch: app.fetch,
    port: parseInt(process.env.PORT || '4000'),
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);

export type AppType = typeof helloRouter;
