import mongoose from "mongoose";

const blogsSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: {
        type: mongoose.Schema.Types.ObjectId, ref : 'User'
    },
    createAt: {
        type: Date,
        default: Date.now,

    }
    
});

export default mongoose.model("Blog", blogsSchema);

//Blog.js