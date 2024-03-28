import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// initialize the Prisma Client
const prisma = new PrismaClient();

const roundsOfHashing = 10;

async function main() {
  // create two dummy users
  const passwordIko = await bcrypt.hash('password-iko', roundsOfHashing);
  const passwordAfianando = await bcrypt.hash(
    'password-afianando',
    roundsOfHashing,
  );

  const user1 = await prisma.user.upsert({
    where: { email: 'iko@afianando.com' },
    update: {
      password: passwordIko,
    },
    create: {
      email: 'iko@afianando.com',
      name: 'Iko Afianando',
      password: passwordIko,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'afianando@iko.com' },
    update: {
      password: passwordAfianando,
    },
    create: {
      email: 'afianando@iko.com',
      name: 'Afianando Iko',
      password: passwordAfianando,
    },
  });

  console.log({ user1, user2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close the Prisma Client at the end
    await prisma.$disconnect();
  });
