import {Schema} from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema = new Schema({
    username: String,
    email: String,
    userpw: String
});

userSchema.methods.generateHash = function(pw) {
    return bcryptjs.hashSync(pw, 8);
};

export default userSchema;
