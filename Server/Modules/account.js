const mongoose = require('./Connection');

let Schema = mongoose.Schema;

let AccountSchema = new Schema({
    username: String,
    password: String,
    avt: String,
    age: Date,
    gender: String,
    name: String
},{
    collection: 'account'
})

const Account = mongoose.model('account', AccountSchema);

module.exports = Account;
