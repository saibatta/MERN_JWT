// const mongoose = require("mongoose");
import * as  mongoose  from "mongoose"

//const { MONGO_URI } = process.env;
const MONGO_URI = 'mongodb+srv://jwt-mongo-user:jwt-mongo-user@jwt-node-mongodb.8iu24yh.mongodb.net/?retryWrites=true&w=majority'

const DBConnect = () => {
    // Connecting to the database
    mongoose
        .connect(MONGO_URI)
        .then(() => {
            console.log("Successfully connected to database");
        })
        .catch((error) => {
            console.log("database connection failed. exiting now...");
            console.error(error);
            process.exit(1);
        });
};

export default DBConnect;