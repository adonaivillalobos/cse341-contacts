require('dotenv').config();
const express = require('express');
const { connectDB } = require('./db');
const contactsRouter = require('./routes/contacts');

const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/contacts', contactsRouter);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});