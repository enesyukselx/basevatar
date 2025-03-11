import axios from "axios";

const serverStatusHelper = async () => {
    try {
        const response = await axios.get(process.env.SERVER_URL || "http://localhost:3000");
        return response.status === 200;
    } catch {
        console.log("Server is not running.");
        return false;
    }
};

export { serverStatusHelper };
