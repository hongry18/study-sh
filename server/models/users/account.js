import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;
 
const Account = new Schema({
    username: { type: String, index: { unique: true }},
    password: String,
    email: String,
    nickname: String,
    accountId: Number,
    role: String,
    date: {
        created: { type: Date, default: Date.now },
        modified: { type: Date, default: Date.now }
    }
});

// generates hash
Account.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, 8);
};
 
// compares the password
Account.methods.validateHash = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// auto increment
autoIncrement.initialize(mongoose.connection);
Account.plugin(autoIncrement.plugin, { model: 'accounts', field: 'accountId' });

const model = mongoose.model('accounts', Account);
 
export default model;
