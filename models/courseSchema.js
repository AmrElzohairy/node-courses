let mongoose = require('mongoose');

let courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,}
        ,
        price : {
        type: Number,
        required: true,
        min: 0
    },
})

module.exports = mongoose.model('Course', courseSchema);