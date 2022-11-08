import bcrypt from "bcryptjs";
import * as express from 'express';
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { SECRETE_TOKEN_KEY } from "./config/constants";
import mongoDBConnection from "./config/database";
import auth from './middleware/auth'
import { Movies } from "./model/movies";
import { User } from "./model/user";


const app = express();

app.use((req, res, next) => {
    const allowedOrigins = ['http://127.0.0.1:3000', 'http://localhost:3000','https://jwt-node-client.herokuapp.com'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
    res.header('Access-Control-Allow-Methods', 'GET, DELETE,POST,PUT,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization,x-access-token');
    res.header('Access-Control-Allow-Credentials', "true");
    return next();
});
app.use(express.json());

mongoDBConnection()

// Register
app.post("/register", async (req, res) => {

    // Our register logic starts here
    try {
        // Get user input
        const { first_name, last_name, email, password } = req.body;
        console.log(req)
        // Validate user input
        if (!(email && password && first_name && last_name)) {
            return res.status(400).json({ message: "All input is required" });
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(400).json({ message: "User Already Exist. Please Login" });
        }

        //Encrypt user password
        let encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            SECRETE_TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        // save user token
        user.token = token;
        // return new user
        console.log(JSON.stringify(user))
        return res.status(201).json({ message: 'User Created Successfully !!! ' });
    } catch (err) {
        //    console.log(err);
        res.status(200).json({ message: 'User Creation  failed!!!', err });
    }
    // Our register logic ends here
});

// Login
app.post("/login", async (req, res, next) => {
    try {
        // Get user input
        const { email, password } = req.body;
        // Validate user input
        if (!(email && password)) {
            return res.status(400).json({ message: "All input is required" });
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                SECRETE_TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            // save user token
            user.token = token;
            // user
            return res.status(200).json(user);
        } else {
            return res.status(401).json({ message: 'Authentication failed!!!' })
        }
    } catch (err) {
        //    console.log(err);
        res.status(200).json({ message: 'Authentication failed!!!', err });
        next()
    }
});

app.post("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
});

app.post("/ping", (req, res) => {
    res.status(200).send("pong 🙌 ");
});

app.get("/getallmovies", auth, async (req, res) => {
    try {
        const movies = await Movies.find({});
        res.status(200).json(movies)
    } catch (error) {
        console.error("get all movies error", error)
        res.send(500).json(error)
    }
});
app.post("/postmovies", auth, async (req, res, next) => {
    try {
        const movies = req.body.movies;
        console.info(req.body.movies)
        const updatedMovies = await Movies.insertMany([...movies]);
        res.status(200).json({ message: "Posted Movies Successfully !!" })
    } catch (error) {
        console.error("Post movies error", error)
        res.send(500).json({ error: error })
        next()
    }
});
app.put("/updatemovie", auth, async (req, res, next) => {
    let movie = req.body.movie;
    console.log('***updatemovie**', movie)
    try {
        let findMovie = await Movies.findOneAndUpdate({ _id: movie._id ?? new mongoose.Types.ObjectId() }, { $set: { ...movie } }, { upsert: true })
        console.log('**findMovie**', findMovie)
        return res.status(200).json({ message: "Movie Added/Updated Successfully" })

    } catch (error) {
        return res.status(500).json({ message: "Movie Added/Updated Failed", error })
    }
})
app.delete("/deletemovie/:id", auth, async (req, res, next) => {
    let { id } = req.params;
    try {
        let movieDelete = await Movies.remove({ _id: id })
        console.log(movieDelete, '***deletemovie**', id)
        return res.status(200).json({ message: "Movie Deleted Successfully" })
    } catch (error) {
        return res.status(500).json({ message: "Movie Deleted Failed", error })
    }
});
app.post('/logout', auth, async (req, res, next) => {
    let { token } = req.body;
    console.log('***user session destroy**', token)
    try {
        return res.status(200).json({ message: "User Session Logout Success" })
    } catch (error) {
        return res.status(500).json({ message: "User Session Logout failed", error })
    }
})


export default app;
