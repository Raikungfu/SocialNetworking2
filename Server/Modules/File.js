const mongoose = require('./Connection')

var Schema = mongoose.Schema;

const FileSchema = new Schema({
    type: { type: String, required: true },
    url: { type: String, required: true }
},{
    collection: 'File'
})

const File = mongoose.model('File', FileSchema)
module.exports = File;