// server.js
const express = require('express');
const mongoose = require('mongoose');
const ticketRouter = require('./route/ticket.route');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // for parsing application/json
app.use(ticketRouter);

// Connect to MongoDB
mongoose.connect('mongodb+srv://hasthikavinda:hasthikavinda@cluster0.ofigcdv.mongodb.net/ticketReservation', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});