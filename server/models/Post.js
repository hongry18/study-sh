import { Schema } from 'mongoose';


const postSchema = new Schema({
    title: String,
    content: String,
    author: String,
    date: Date
});

export default postSchema;
