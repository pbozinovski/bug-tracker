const router = require('express').Router();
const {
    getAllProjects,
    findProjectById,
    updateProject,
    addContributorsToProject,
    removeContributorsFromProject,
    removeTicketFromProject,
    deleteProject,
    addProject
} = require('../service/ProjectService');

const { verifyToken, verifyUser, verifyAdmin } = require('../utils/verifyToken');

// get all Projects
router.get('/', [verifyToken, verifyAdmin], getAllProjects);

// get Project by id
router.get('/:id', [verifyToken, verifyUser], findProjectById);

// add Project
router.post('/', [verifyToken, verifyUser], addProject);

// add Contributors to project  
router.post('/:id/contributors', [verifyToken, verifyUser], addContributorsToProject);

// remove Contributors from project
router.delete('/:id/contributors', [verifyToken, verifyUser], removeContributorsFromProject);

// // add Tickets to project  
// router.post('/:id/tickets', [verifyToken, verifyUser], addTicketsToProject);

// remove Tickets from project
router.delete('/:id/tickets', [verifyToken, verifyUser], removeTicketFromProject);

// update Project
router.patch('/:id',[verifyToken, verifyUser], updateProject);

// delete Project
router.delete('/:id',[verifyToken, verifyUser], deleteProject)

module.exports = router;