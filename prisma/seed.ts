// -------------------------------------------------------------
// Generated using https://remixfast.com/
// Docs: https://remixfast.com/docs/models
// App: ModalRoute
// -------------------------------------------------------------
import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();  

async function seed() {
  const email = "dalalmj@yahoo.com";
  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });
  const hashedPassword = await bcrypt.hash("RemixFast8", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });  
  for (let i = 0; i < 33; i++) {
    let data: Prisma.WidgetCreateInput = {
      widgetName: `Widget ${i + 1}`,
      widgetNumber: `W-${i + 1}`,
    };
    const w = await prisma.widget.create({
      data,
    });
  }
  console.log("Database has been seeded. 🌱");
    }
  seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
