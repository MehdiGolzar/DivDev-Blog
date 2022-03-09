const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    summary: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    image: {
        type: String,
        default: "Article_default_Image.png"
    },
    createdAt: {
        type: Date,
        default: new Date
    },
    src: {
        type: String
    }
});


module.exports = mongoose.model("Article", ArticleSchema);