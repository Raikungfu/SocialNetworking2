const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/SocialNetworking', {
    useNewUrlParser: true
})

mongoose.connection.on('err', (err) => {
    console.log(err)
})

module.exports = mongoose;