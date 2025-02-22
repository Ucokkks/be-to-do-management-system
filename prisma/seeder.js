const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function domain() {
    // Seed Users
    for (let i = 0; i < 10; i++) {
        const username = faker.internet.userName();
        const email = faker.internet.email();
        const password = await bcrypt.hash('password123', 10); 

        await prisma.user.create({
            data: {
                username,
                email,
                password,
            },
        });
    }

    // Get all users
    const users = await prisma.user.findMany();

    // Seed Tasks
    for (let i = 0; i < 20; i++) {
        const title = faker.lorem.words(3);
        const desc = faker.lorem.sentence();
        const priority = faker.helpers.arrayElement(['low', 'medium', 'high']);
        const deadline = faker.date.future();
        const createdBy = faker.helpers.arrayElement(users).username;

        await prisma.task.create({
            data: {
                title,
                desc,
                priority,
                deadline,
                created_by: createdBy,
            },
        });
    }
}

domain()
    .then(() => {
        console.log('Seeding selesai!');
        prisma.$disconnect();
    })
    .catch((e) => {
        console.error(e);
        prisma.$disconnect();
        process.exit(1);
    });
