import axios from "axios";
import path from "path";
import fs from "fs";

const downloadImage = (url: string, filename: string): Promise<void> => {
    const filePath = path.resolve(__dirname, `../uploads/${filename}`);
    const writer = fs.createWriteStream(filePath);

    return new Promise((resolve, reject) => {
        axios({
            url,
            method: "GET",
            responseType: "stream",
            validateStatus: (status) => status >= 200 && status < 300,
        })
            .then((response) => {
                response.data.pipe(writer);

                response.data.on("error", (err: Error) => {
                    console.error(`Error during download stream from ${url}:`, err);
                    writer.close();
                    fs.unlink(filePath, () => {});
                    reject(err);
                });

                writer.on("error", (err: Error) => {
                    console.error(`Error writing file ${filename}:`, err);
                    fs.unlink(filePath, () => {});
                    reject(err);
                });

                writer.on("finish", () => {
                    console.log(`Finished downloading ${filename}`);
                    resolve();
                });
            })
            .catch((error) => {
                console.error(
                    `Failed to initiate download from ${url}:`,
                    error instanceof Error ? error.message : error
                );
                fs.unlink(filePath, () => {});
                reject(error);
            });
    });
};

export default downloadImage;
