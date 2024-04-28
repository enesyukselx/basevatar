"use server";
/*
import { TCanvasDatas } from "@/app/providers/CanvasContext";
import CryptoJS from "crypto-js";

const _key = process.env.LOCALSTORAGE_KEY ?? "secret_key";

export async function encryptCanvasData(data: TCanvasDatas) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), _key).toString();
}

export async function decryptCanvasData(data: string) {
    try {
        const bytes = CryptoJS.AES.decrypt(data, _key);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (e) {
        console.error(e);
        return {};
    }
}
*/
