import { PrismaClient, VoteType } from "@prisma/client";

const prisma = new PrismaClient();

const date = new Date();
date.setUTCHours(23, 59, 59, 999);

const initialSettings = [
    {
        key: "day",
        value: "1",
    },
    {
        key: "theme",
        value: "Base",
    },
    {
        key: "color",
        value: "#ff0000,#00ff00,#0000ff,#f98212,#fedfc3",
    },
    {
        key: "finish_time",
        value: (date.getTime() + 1).toString(),
    },
];

const initialVotes = [
    {
        type: "color" as VoteType,
        value: ["#ff0000", "#00ff00", "#0000ff", "#f98212", "#fedfc3"],
        day: 2,
    },
    {
        type: "theme" as VoteType,
        value: ["Beer"],
        day: 2,
    },
    {
        type: "theme" as VoteType,
        value: ["Book"],
        day: 2,
    },
    {
        type: "color" as VoteType,
        value: ["#69f08d", "#36f569", "#abf7bf", "#d3f5dc", "#0e7d2b", "#010a03"],
        day: 2,
    },
];

const initalOutput = [
    {
        opensea_url: "https://opensea.io/collection/beer",
        day: 0,
        colors: ["#ff0000", "#00ff00", "#0000ff", "#f98212", "#fedfc3"],
        theme: "Example Item",
        contributors: ["0x1234567890"],
        mint_count: 251,
        end_time: new Date(date.getTime() + 1),
    },
];

const seed = async () => {
    await prisma.image.deleteMany();
    await prisma.output.deleteMany();
    await prisma.setting.deleteMany();
    await prisma.vote.deleteMany();
    await prisma.voteLog.deleteMany();

    await prisma.setting.createMany({
        data: initialSettings,
    });

    await prisma.vote.createMany({
        data: initialVotes,
    });

    await prisma.output.createMany({
        data: initalOutput,
    });
};

seed()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
