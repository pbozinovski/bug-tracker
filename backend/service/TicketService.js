const Ticket = require('../models/Ticket')
const Project = require('../models/Project')

const mongoose = require('mongoose');
const { createError } = require('../utils/error');


const getAllTickets = async (req, res, next) => {
        try {
            const tickets = await Ticket.find();
            res.status(200).json(tickets);
       } catch (error) {
            return next(createError(404, 'Ticket not found!'))
       }
};

const findTicketById = async (req, res, next) => {
    const id = req.params.id

    if(!mongoose.isValidObjectId(id)){
        return next(createError(400, 'Bad request, invalid id!'))
    }
    const ticket = await Ticket.findById(id).populate({path: 'author', select: ['username', 'email']});

    if(!ticket){
        return next(createError(404, 'Ticket not found!'))
    }
    res.status(200).json(ticket);
};

const createTicket = async (req, res, next) => {
    try {
        const ticket = await Ticket.create(req.body)
        if(!ticket){
            return next(createError(400, 'Bad request, could not create Ticket!'))
        }
        await Project.updateOne({_id: ticket.project}, { $push: { tickets: ticket._id  }})
        res.status(200).json(ticket);
    } catch (error) {
        return next(createError(400, error.message))
    }
}

const updateTicket = async (req, res, next) => {
    const id = req.params.id;

    if(!mongoose.isValidObjectId(id)){
        return next(createError(400, 'Bad request, invalid id!'))
    }
    try {
        const ticket = await Ticket.findOneAndUpdate({_id: id}, {...req.body},{new: true, runValidators: true})
        res.status(201).json(ticket);
    } catch (error) {
        return next(createError(400, error.message));
    }
};

const deleteTicket = async (req, res, next) => {
    const id = req.params.id
    if(!mongoose.isValidObjectId(id)){
        return next(createError(400, 'Bad request, invalid id!'))
    }
    const deletedTicket = await Ticket.findOneAndRemove({_id: id})

    if(!deletedTicket){
        return next(createError(404, "Ticket not found!"));
    }
    res.status(200).json(deletedTicket)
};

const deleteAllTickets = async (req, res, next) => {
    await Ticket.deleteMany({})
    res.status(200).json({msg:"All tickets are deleted"})
}




module.exports = {
    getAllTickets,
    findTicketById,
    createTicket,
    updateTicket,
    deleteTicket,
    deleteAllTickets
}

