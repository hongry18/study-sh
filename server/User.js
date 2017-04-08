import {Schema} from 'mongoose';

const userSchema = new Schema({
    username: String,
    userpw: String,
    email: String
});

export default userSchema;
