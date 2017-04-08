import {Schema} from 'mongoose';

const commentSchema = new Schema({
    author: String,
    content: String,
    date: Date
});

const postSchema = new Schema({
    post_id: Number,
    title: String,
    author: String,
    content: String,
    comments: [commentSchema],
    date: Date
});

export default postSchema;
