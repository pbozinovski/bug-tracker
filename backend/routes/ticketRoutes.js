const router = require('express').Router();
const {
    getAllTickets,
    findTicketById,
    createTicket,
    updateTicket,
    deleteTicket,
    deleteAllTickets
} = require('../service/TicketService');
const { verifyToken, verifyUser, verifyAdmin } = require('../utils/verifyToken');

// create ticket
router.post('/',[verifyToken, verifyUser], createTicket);

// get all Tickets
router.get('/', [verifyToken, verifyAdmin], getAllTickets);

// get Ticket by id
router.get('/:id', [verifyToken, verifyUser], findTicketById);

// update Ticket
router.patch('/:id',[verifyToken, verifyUser], updateTicket);

// delete Ticket
router.delete('/:id',[verifyToken, verifyUser], deleteTicket)

router.delete('/delete/all', deleteAllTickets)

module.exports = router;