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

userSchema.methods.validateHash = function(pw) {
    return bcryptjs.compareSync(pw, this.userpw);
}

export default userSchema;
