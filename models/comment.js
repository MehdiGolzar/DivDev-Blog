const { Schema, model } = require('mongoose');

const commentSchema = new Schema({ 
    content: {
        type: String,
        required: true
    },
	article: {
		type: Schema.Types.ObjectId,
		ref: 'Article',
		required: true
	},
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
	createdAt: {
		type: Date,
		default: Date.now
	}
});


module.exports = model("Comment", commentSchema);