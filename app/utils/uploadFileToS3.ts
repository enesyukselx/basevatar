import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

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

export default uploadFileToS3;
