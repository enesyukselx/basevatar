import { prisma } from "@basevatar/database";
import fs from "fs";
import path from "path";
import { createOutput } from "./createOutput";
import downloadImage from "./downloadImage";
import combineImages from "./combineImages";

const DUMMY_OPENSEA_URL = "https://opensea.io";

const createImage = async (day: number, colors: string, theme: string) => {
    try {
        // Fetch selected images for the day from DB
        const dbImages = await prisma.image.findMany({
            where: {
                day: day,
                isSelected: true,
                isDeleted: false,
            },
        });

        // Limit to first 100 images
        const imagesToDownload = dbImages.slice(0, 100);

        // Exit if no images found
        if (imagesToDownload.length === 0) {
            console.log(`No selected images found for day ${day}. Skipping image creation.`);
            return null;
        }

        // Ensure upload directory exists
        const uploadDir = path.resolve(__dirname, "../uploads");
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }

        // Download images in parallel
        const downloadPromises = imagesToDownload.map(async (image, index) => {
            const filename = `${index}.jpg`;
            const baseUrl = process.env.AWS_S3_URL ? `https://${process.env.AWS_S3_URL}` : "http://localhost:3000"; // Use http for local
            const imageUrl = `${baseUrl}/${image.url}`;
            // Attempt download, log error and return null on failure
            return downloadImage(imageUrl, filename).catch((err) => {
                console.error(`Failed to download ${imageUrl}: ${err.message}`);
                return null;
            });
        });

        // Wait for all downloads to finish
        await Promise.all(downloadPromises);
        console.log(`Finished attempting downloads for day ${day}.`);

        // Combine downloaded images
        const combinedImagePath = await combineImages(day);

        // Exit if combination failed
        if (!combinedImagePath) {
            console.warn(`Image combination failed or produced no output for day ${day}. Skipping createOutput.`);
            return null;
        }

        // Create final output (e.g., metadata)
        await createOutput(DUMMY_OPENSEA_URL, day, colors.split(","), theme, ["dummy"]);

        return imagesToDownload; // Return the list of images attempted
    } catch (e) {
        console.error(`Error in createImage for day ${day}:`, e);
        return null;
    }
};

export default createImage;
