import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import bcrypt from 'bcryptjs';

const Post = new mongoose.Schema({
    postId: Number,
    title: String,
    content: String,
    password: String,
    author: String,
    userId: mongoose.Schema.Types.ObjectId,
    date: {
        created: { type: Date, default: Date.now },
        modified: { type: Date, default: Date.now }
    }
});

// generates hash
Post.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, 8);
};
 
// compares the password
Post.methods.validateHash = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// auto increment
autoIncrement.initialize(mongoose.connection);
Post.plugin(autoIncrement.plugin, { model: 'posts', field: 'postId' });

const model = mongoose.model('posts', Post);
 
export default model;
