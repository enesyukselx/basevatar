import { prisma } from "../lib/db";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import axios from "axios";
import { uploadOutputImage } from "./slackHelpers";
import { createOutput } from "./createOutput";

const DUMMY_OPENSEA_URL = "https://opensea.io";

const createImage = async (day: number, colors: string, theme: string) => {
    try {
        const images = await prisma.image.findMany({
            where: {
                day: day,
                isSelected: true,
                isDeleted: false,
            },
        });
        let i = 0;

        if (!fs.existsSync(path.resolve(__dirname, "../uploads"))) {
            fs.mkdirSync(path.resolve(__dirname, "../uploads"));
        }

        for (const image of images) {
            if (i >= 100) break;
            const filename = `${i}.jpg`;
            await downloadImage(
                `https://${process.env.AWS_S3_URL ? process.env.AWS_S3_URL : "localhost:3000"}` + "/" + image.url,
                filename
            );
            i++;
        }

        await combineImages(day);
        await createOutput(DUMMY_OPENSEA_URL, day, colors.split(","), theme, ["dummy"]);

        return images;
    } catch (e) {
        console.error(e);
        return null;
    }
};

const downloadImage = async (url: string, filename: string) => {
    const writer = fs.createWriteStream(path.resolve(__dirname, `../uploads/${filename}`));
    const response = await axios({
        url,
        method: "GET",
        responseType: "stream",
    });
    response.data.pipe(writer);
    return new Promise<void>((resolve, reject) => {
        writer.on("finish", () => resolve());
        writer.on("error", reject);
    });
};

const combineImages = async (day: number) => {
    const images = [];
    const files = fs.readdirSync(path.resolve(__dirname, "../uploads"));
    let i = 0;
    let j = 0;

    for (const file of files) {
        images.push({
            input: path.resolve(__dirname, `../uploads/${file}`),
            top: j * 360,
            left: i * 360,
        });
        i++;

        if (i % 10 === 0) {
            j++;
            i = 0;
        }
    }

    if (!fs.existsSync(path.resolve(__dirname, "../results"))) {
        fs.mkdirSync(path.resolve(__dirname, "../results"));
    }

    const outputPath = path.resolve(__dirname, "../results/day-" + day + "-output.jpg");

    await sharp({
        create: {
            width: 3600,
            height: 3600,
            channels: 3,
            background: { r: 255, g: 255, b: 255 },
        },
    })
        .composite(images)
        .toFile(outputPath);

    fs.rm(path.resolve(__dirname, "../uploads"), { recursive: true }, (err) => {
        if (err) {
            console.error(err);
            return;
        }
    });

    try {
        const url = process.env.SERVER_URL + "/s3-upload" || "http://localhost:3000/s3-upload";
        const uploadApiKey = process.env.UPLOAD_OUTPUT_API_KEY;
        const outputImage = fs.createReadStream(outputPath);

        await axios.post(
            url,
            {
                key: uploadApiKey,
                day,
                file: outputImage,
            },
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        console.log("Image uploaded to server");
    } catch (e) {
        console.log("Error uploading image to server", e);
    }

    await uploadOutputImage(outputPath, day);
    return outputPath;
};

export default createImage;
