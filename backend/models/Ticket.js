const mongoose = require('mongoose')
const Project = require('../models/Project')

const TicketSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    description: {
        type: String, 
        required: 'Description is required',
    },
    progress: {
        type: String,
        enum: ["Not started", "In progress", "Finished"],
        default: "Not started"
    },
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    project: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Project'
    }
}, {timestamps: true});


// TicketSchema.pre('findOneAndRemove', function(next) {
//     console.log("called remove")
//     console.log(this._conditions._id)
//     console.log(this)
//     Project.updateMany(
//         { tickets: {$in: this._conditions._id} }, 
//         { $pull: { tickets: this._conditions._id  }},
//         { multi: true })  //if reference exists in multiple documents 
//     .exec();
//     next();
// });

module.exports = mongoose.model('Ticket', TicketSchema);