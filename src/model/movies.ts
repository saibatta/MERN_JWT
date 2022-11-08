import mongoose from "mongoose";

const moviesSchema = new mongoose.Schema({
    title: { type: String, default: null, require: true },
    year_release: { type: Number, default: 2022, require: true },
    imdb_rating: { type: String, default: "0" },
})

export const Movies = mongoose.model('movies', moviesSchema);


// title: "Hello Movie 1",
//     year_release: "2022",
//         imdb_rating: '4.5',