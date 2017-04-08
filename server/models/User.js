import {Schema} from 'mongoose';

const userSchema = new Schema({
    username: String,
    email: String,
    userpw: String
});

export default userSchema;
