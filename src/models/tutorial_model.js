const mongoose = require('mongoose');

const tutorialsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    published: {
        type: Boolean,
        required: true
    },
},
    {timestamps: true}
);

module.exports = mongoose.model('Tutorials', tutorialsSchema);
