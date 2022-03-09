const mongoose = require('mongoose');
const { Schema } = mongoose;

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
    },
    createdAt: {
        type: Date,
        default: new Date
    }
});


module.exports = mongoose.model("Article", ArticleSchema);