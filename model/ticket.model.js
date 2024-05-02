// ticket.model.js
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  noOfPersons: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true
  }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;