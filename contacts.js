const express = require('express');
const router = express.Router();
const { getDB } = require('./db');
const { ObjectId } = require('mongodb');

router.get('/', async (req, res) => {
  const db = getDB();
  const contacts = await db.collection('contacts').find({}).toArray();
  res.json(contacts);
});

router.get('/:id', async (req, res) => {
  const db = getDB();
  const contact = await db.collection('contacts').findOne({ _id: new ObjectId(req.params.id) });
  res.json(contact);
});

module.exports = router;