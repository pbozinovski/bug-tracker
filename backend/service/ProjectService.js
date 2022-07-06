const Project = require('../models/Project')
const Ticket = require("../models/Ticket")
const mongoose = require('mongoose');
const { createError } = require('../utils/error');


const getAllProjects = async (req, res, next) => {
        try {
            const projects = await Project.find();
            res.status(200).json(projects);
       } catch (error) {
            return next(createError(404, 'Project not found!'))
       }
};

const findProjectById = async (req, res, next) => {
    const id = req.params.id

    if(!mongoose.isValidObjectId(id)){
        return next(createError(400, 'Bad request, invalid id!'))
    }
    const project = await Project.findById(id).populate({path: 'contributors', select: ['username', 'email']});

    if(!project){
        return next(createError(404, 'Project not found!'))
    }
    res.status(200).json(project);
};

const addProject = async (req, res, next) => {
    try {
        const project = await Project.create(req.body)
        if(!project){
            return next(createError(400, 'Bad request, could not create project!'))
        }
        res.status(200).json(project);
    } catch (error) {
        return next(createError(400, 'No project, something went wrong...!'))
    }
}

const updateProject = async (req, res, next) => {
    const id = req.params.id;

    if(!mongoose.isValidObjectId(id)){
        return next(createError(400, 'Bad request, invalid id!'))
    }
    try {
        const {contributors, ...other} = req.body;
        const project = await Project.findOneAndUpdate({_id: id}, {...other}, {new: true})
        res.status(201).json(project);
    } catch (error) {
        return next(createError(400, error.message));
    }
};

const addContributorsToProject = async (req, res, next) => {
    const id = req.params.id;

    if(!mongoose.isValidObjectId(id)){
        return next(createError(400, 'Bad request, invalid id!'))
    }
    try {
        const {contributors} = req.body;
        const project = await Project.findById(id)
        contributors.forEach(c => {
            if(!project.contributors.includes(c))
                project.contributors.push(c)
        })
        await project.save()
        res.status(201).json(project);
    } catch (error) {
        return next(createError(400, error.message));
    }
}

const removeContributorsFromProject = async (req, res, next) => {
    const id = req.params.id;

    if(!mongoose.isValidObjectId(id)){
        return next(createError(400, 'Bad request, invalid id!'))
    }
    try {
        const {contributors} = req.body;
        const project = await Project.findById(id)
        
        contributors.forEach(c => {
            project.contributors = project.contributors.filter(pc => pc.valueOf()!==c)
        })
        await project.save()
        res.status(201).json(project);
    } catch (error) {
        return next(createError(400, error.message));
    }
}

// const addTicketsToProject = async (req, res, next) => {
//     const id = req.params.id;

//     if(!mongoose.isValidObjectId(id)){
//         return next(createError(400, 'Bad request, invalid id!'))
//     }
//     try {
//         const {tickets} = req.body;
//         const project = await Project.findById(id)
//         tickets.forEach(c => {
//             if(!project.tickets.includes(c))
//                 project.tickets.push(c)
//         })
//         await project.save()
//         res.status(201).json(project);
//     } catch (error) {
//         return next(createError(400, error.message));
//     }
// }

const removeTicketFromProject = async (req, res, next) => {
    const id = req.params.id;

    if(!mongoose.isValidObjectId(id)){
        return next(createError(400, 'Bad request, invalid id!'))
    }
    try {
        const {ticket} = req.body;
        const project = await Project.findById(id)
        project.tickets = project.tickets.filter(pt => pt.valueOf()!==ticket)
        await Ticket.findOneAndRemove({_id: ticket})
        await project.save()
        res.status(201).json(project);
    } catch (error) {
        return next(createError(400, error.message));
    }
}

const deleteProject = async (req, res, next) => {
    const id = req.params.id
    if(!mongoose.isValidObjectId(id)){
        return next(createError(400, 'Bad request, invalid id!'))
    }
    const deletedProject = await Project.findOneAndRemove({_id: id})

    if(!deletedProject){
        return next(createError(404, "Project not found!"));
    }
    res.status(200).json(deletedProject)
};


module.exports = {
    getAllProjects,
    findProjectById,
    addProject,
    addContributorsToProject,
    removeContributorsFromProject,
    removeTicketFromProject,
    updateProject,
    deleteProject
}

