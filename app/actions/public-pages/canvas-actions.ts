"use server";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/app/lib/db";
import { getSession } from "@/app/utils/sessionHelpers";
import { postNewSlackMessage } from "@/app/utils/slackHelpers";
import fetchSettings from "../common/fetch-settings";
import uploadFileToS3 from "@/app/utils/uploadFileToS3";

export async function uploadImageToServer(data: string) {
    try {
        const base64Image = data.split(";base64,").pop();
        if (!base64Image) return;
        const { setting: day } = await fetchSettings("day");
        const session = await getSession();
        if (!session || !day) return;
        const userAddress = session.address;
        const userHasAlreadyUploaded = await checkIfUserHasAlreadyUploaded(+day, userAddress);
        if (userHasAlreadyUploaded) return;

        const buffer = Buffer.from(base64Image, "base64");
        const s3Url = await uploadFileToS3(buffer, `images/${day}/${uuidv4()}.jpg`);

        await saveToDatabase(+day, s3Url, userAddress);
        //slack message
        const slackConservationId = "C078QPSCK6W";
        await postNewSlackMessage(
            slackConservationId,
            `New saved image from ${userAddress} on *day ${day}*:
https://${process.env.AWS_S3_URL}/${s3Url}
            `
        );

        return s3Url;
    } catch (e) {
        console.error(e);
    }
}

const saveToDatabase = async (day: number, url: string, address: string, isSelected: boolean = true) => {
    try {
        await prisma.image.create({
            data: {
                day,
                url,
                address,
                isSelected,
            },
        });
    } catch (e) {
        console.error(e);
    }
};

export const checkIfUserHasAlreadyUploaded = async (day: number, address: string) => {
    try {
        if (!day || !address) return false;
        const image = await prisma.image.findFirst({
            where: {
                day,
                address,
            },
        });
        return image;
    } catch (e) {
        console.error(e);
    }
};
