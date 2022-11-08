
import http from "http";
import app from "./app";
import { API_PORT } from "./config/constants";
const server = http.createServer(app);

// server listening 
server.listen(API_PORT, () => {
    console.log(`Server running on port ${API_PORT}`);
});
