import { prisma } from "@/app/lib/db";

export async function GET() {
    try {
        const date = new Date();
        const now = new Date().getTime();

        // Get settings
        const settings = await prisma.settings.findMany();
        const day = settings.find((setting) => setting.key === "day");
        const finish_time = settings.find((setting) => setting.key === "finish_time");
        const theme = settings.find((setting) => setting.key === "theme");
        const color = settings.find((setting) => setting.key === "color");

        if (!finish_time || !day || !theme || !color) {
            return Response.json({ message: "Setting not found" });
        }

        if (now > +finish_time.value) {
            // Get votes
            const colorVotes = await prisma.votes.findMany({
                where: {
                    day: +day.value + 1,
                    type: "color",
                    isDeleted: false,
                },
            });

            const themeVotes = await prisma.votes.findMany({
                where: {
                    day: +day.value + 1,
                    type: "theme",
                    isDeleted: false,
                },
            });

            // Update Color
            if (colorVotes.length !== 0) {
                //
                const maxCountColor = colorVotes.reduce((maxItem, currentItem) => {
                    return currentItem.count > maxItem.count ? currentItem : maxItem;
                }, colorVotes[0]);

                await prisma.settings.update({
                    where: {
                        id: color.id,
                    },
                    data: {
                        value: maxCountColor.value.join(","),
                    },
                });
            }
            // Update Theme
            if (themeVotes.length !== 0) {
                //
                const maxCountTheme = themeVotes.reduce((maxItem, currentItem) => {
                    return currentItem.count > maxItem.count ? currentItem : maxItem;
                }, themeVotes[0]);

                await prisma.settings.update({
                    where: {
                        id: theme.id,
                    },
                    data: {
                        value: maxCountTheme.value[0],
                    },
                });
            }

            date.setHours(23, 59, 59, 999);
            const new_finish_time = date.getTime() + 1;

            // Update day
            await prisma.settings.update({
                where: {
                    id: day.id,
                },
                data: {
                    value: (parseInt(day.value) + 1).toString(),
                },
            });

            // Update finish time
            await prisma.settings.update({
                where: {
                    id: finish_time.id,
                },
                data: {
                    value: new_finish_time.toString(),
                },
            });

            return Response.json({
                message: "Updated new timestamp",
                new_day: parseInt(day.value) + 1,
                new_finish_time,
            });
        } else {
            return Response.json({
                message: "Not updated",
                day: parseInt(day.value),
                finish_time: +finish_time.value,
                theme: theme.value,
                color: color.value,
            });
        }
    } catch (e: unknown) {
        console.error(e);
        return Response.json({ message: "Error" });
    }
}
