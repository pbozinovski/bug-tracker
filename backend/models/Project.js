const mongoose = require('mongoose')

const Schema = mongoose.Schema


const ProjectSchema = new Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
        required: 'Name is required'
    },
    description: {
        type: String, 
        required: 'Description is required',
    },
    contributors: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    }]
}, {timestamps: true});

module.exports = mongoose.model('Project', ProjectSchema);