import { NextRequest, NextResponse } from "next/server";
import uploadFileToS3 from "@/app/utils/uploadFileToS3";

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
