import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Content } from "next/font/google";

const s3Client = new S3Client({
    region: process.env.AWS_REGION || "",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
});

async function uploadFileToS3(buffer: Buffer, fileName: string): Promise<string> {
    const fileBuffer = buffer;

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME || "",
        Key: fileName,
        Body: fileBuffer,
        ContentType: "image/jpeg",
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    return fileName;
}

export const POST = async (req: NextRequest) => {
    try {
        const formData = await req.formData();
        const apiKey = formData.get("key");
        const file = formData.get("file") as Blob;
        const day = formData.get("day");

        if (apiKey !== process.env.UPLOAD_OUTPUT_API_KEY) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        if (!file || file.size === 0) {
            return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        try {
            const fileName = await uploadFileToS3(buffer, "outputs/output-day-" + day + ".jpg");

            return NextResponse.json({
                message: "File uploaded successfully",
                fileName,
            });
        } catch (error) {
            return NextResponse.json({ message: "File upload failed" }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ message: "An error occurred" }, { status: 500 });
    }
};
