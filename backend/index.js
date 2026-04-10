const express = require("express");
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 4000;
const configureDB = require("./config/db");
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const app = express();
const slotCtlr = require('./app/controller/parkingSlotController');
const authenticate = require('./app/middleware/authenticate');
const { createTicket, exit } = require('./app/controller/parkingTicketController');

configureDB();
app.use(cors());
app.use(express.json());

app.use(morgan('common', { stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flag: 'a' }) }))

app.post('/api/slot', slotCtlr.create);
app.post('/api/ticket/create', createTicket);
app.post('/api/ticket/exit', exit);

app.listen(port, () => {
    console.log("The server is running on port " + port);
})