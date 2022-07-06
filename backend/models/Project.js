const mongoose = require('mongoose')
const Ticket = require('./Ticket')

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
    }],
    tickets: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Ticket"
    }]
}, {timestamps: true});

ProjectSchema.pre('findOneAndRemove', async function(next) {
    console.log("called remove")
    await Ticket.deleteMany({project: this.getFilter()["_id"]})
    next();
});

module.exports = mongoose.model('Project', ProjectSchema);