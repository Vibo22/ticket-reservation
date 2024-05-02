// ticket.route.js
const express = require('express');
const router = express.Router();
const Ticket = require('../model/ticket.model');

// Create a new ticket
router.post('/tickets', async (req, res) => {
  try {
    const ticket = new Ticket(req.body);
    await ticket.save();
    res.status(201).send(ticket);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all tickets
router.get('/tickets', async (req, res) => {
  try {
    const tickets = await Ticket.find({});
    res.status(200).send(tickets);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get one ticket
router.get('/tickets/:id', getTicket, (req, res) => {
  res.json(res.ticket);
});

// Update a ticket
router.put('/tickets/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!ticket) {
      return res.status(404).send();
    }
    res.send(ticket);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a ticket
router.delete('/tickets/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) return res.status(404).send();
    res.send(ticket);
  } catch (error) {
    res.status(500).send(error);
  }
});

async function getTicket(req, res, next) {
  try {
    ticket = await Ticket.findById(req.params.id);
    if (ticket == null) {
      return res.status(404).json({ message: 'Cannot find ticket' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.ticket = ticket;
  next();
}

module.exports = router;