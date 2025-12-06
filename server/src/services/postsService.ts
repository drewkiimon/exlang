import type { Prisma } from '../../generated/prisma/client';
import { prisma } from '../../prisma/prisma';

export const getPosts = async () => {
  return prisma.post.findMany({ orderBy: { createdAt: 'desc' } });
};

export const createPost = async (post: Prisma.PostCreateInput) => {
  return prisma.post.create({
    data: post,
  });
};
