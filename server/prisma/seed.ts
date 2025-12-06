import type { Prisma } from '../generated/prisma/client';
import { prisma } from './prisma';

const users: Prisma.UserCreateInput[] = [
  {
    uuid: '00000000-0000-0000-0000-000000000000',
    firstName: 'Alice',
    lastName: 'Wong',
    username: 'ckwong',
    email: 'w.aliceck@gmail.com',
  },
  {
    uuid: '11111111-1111-1111-1111-111111111111',
    firstName: 'Andrew',
    lastName: 'Pagan',
    username: 'drewkiimon',
    email: 'drewkiimo@gmail.com',
  },
];

const posts: Prisma.PostCreateInput[] = [
  {
    title: 'First Post',
    content: 'This is the body of the first post.',
    author: {
      connect: { uuid: '00000000-0000-0000-0000-000000000000' },
    },
  },
  {
    title: 'この秋の雨が多すぎる',
    content: '今年の秋は雨の日がとても多かったです。',
    author: {
      connect: { uuid: '11111111-1111-1111-1111-111111111111' },
    },
  },
];

async function main() {
  console.log('\n🌱✨ Starting fancy Prisma seeding process! ✨🌱\n');

  console.log('🌱✨ Creating users... ✨🌱');
  const createdUsers = await prisma.user.createMany({
    data: users,
  });

  console.log(`✨🌱 Created ${createdUsers.count} users! 🌱✨`);

  console.log('🌱✨ Creating posts... ✨🌱');
  for (const post of posts) {
    await prisma.post.create({
      data: post,
    });
  }

  console.log('✨🌱 Created posts! 🌱✨');
  console.log('\n🌱✨ Prisma seeding process completed! ✨🌱\n');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
