import path from "path";
import fs from "fs";
import sharp from "sharp";
import axios from "axios";
import uploadOutputImage from "./slack/uploadOutputImage";

const combineImages = async (day: number) => {
    const images = [];
    const uploadDir = path.resolve(__dirname, "../uploads");

    if (!fs.existsSync(uploadDir)) {
        console.warn(`Uploads directory ${uploadDir} not found. Skipping combineImages for day ${day}.`);
        return null;
    }

    const files = fs.readdirSync(uploadDir);
    let i = 0;
    let j = 0;

    console.log(`Found ${files.length} files in ${uploadDir} for day ${day}.`);

    for (const file of files) {
        if (!file.endsWith(".jpg")) {
            console.warn(`Skipping non-jpg file: ${file}`);
            continue;
        }
        const inputPath = path.resolve(uploadDir, file);
        try {
            const stats = fs.statSync(inputPath);
            if (stats.size === 0) {
                console.warn(`Skipping empty file: ${file}`);
                continue;
            }
        } catch (statError) {
            console.error(`Error accessing file ${file}:`, statError);
            continue;
        }

        images.push({
            input: inputPath,
            top: j * 360,
            left: i * 360,
        });
        i++;

        if (i % 10 === 0) {
            j++;
            i = 0;
        }
    }

    if (images.length === 0) {
        console.warn(`No valid images found to combine for day ${day}. Skipping sharp processing.`);
        fs.rm(uploadDir, { recursive: true, force: true }, (err) => {
            if (err) console.error("Error removing empty uploads directory:", err);
        });
        return null;
    }

    const resultsDir = path.resolve(__dirname, "../results");
    if (!fs.existsSync(resultsDir)) {
        fs.mkdirSync(resultsDir);
    }

    const outputPath = path.resolve(resultsDir, `day-${day}-output.jpg`);

    console.log(`Compositing ${images.length} images into ${outputPath}`);

    // Create composite image using sharp
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

    // Clean up uploads directory
    fs.rm(uploadDir, { recursive: true, force: true }, (err) => {
        if (err) {
            console.error("Error removing uploads directory:", err);
        } else {
            console.log("Uploads directory cleaned successfully after combining.");
        }
    });

    // Upload combined image to server
    try {
        const url =
            (process.env.SERVER_URL ? process.env.SERVER_URL + "/s3-upload" : null) ||
            "http://localhost:3000/s3-upload";
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

    // Upload combined image to Slack
    await uploadOutputImage(outputPath, day);
    return outputPath; // Return path of the combined image
};

export default combineImages;
