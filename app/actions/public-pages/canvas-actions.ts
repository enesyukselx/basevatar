"use server";

export async function uploadImageToServer(data: string) {
    console.log("uploading image to server", data);
    return "https://example.com/image.jpg";
}
