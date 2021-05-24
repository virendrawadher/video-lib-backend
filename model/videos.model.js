const mongoose = require("mongoose")
const Schema = mongoose.Schema

module.exports = mongoose.model("Video", new Schema({
    videoId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    publishedAt: {
        type: String,
        required: true
    },
    thumbnailurl: {
        type: String,
        required: true
    },
    viewcount: {
        type: String,
        required: true
    },
    liked: Boolean
}))