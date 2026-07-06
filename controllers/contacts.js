const { getDB } = require('../db');
const { ObjectId } = require('mongodb');

const getAllContacts = async (req, res) => {
  try {
    const db = getDB();
    const contacts = await db.collection('contacts').find({}).toArray();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve contacts' });
  }
};

const getContactById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid contact ID' });
    }
    const db = getDB();
    const contact = await db.collection('contacts').findOne({ _id: new ObjectId(req.params.id) });
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve contact' });
  }
};

const createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ error: 'All fields are required: firstName, lastName, email, favoriteColor, birthday' });
    }
    const db = getDB();
    const contact = { firstName, lastName, email, favoriteColor, birthday };
    const result = await db.collection('contacts').insertOne(contact);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create contact' });
  }
};

const updateContact = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid contact ID' });
    }
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ error: 'All fields are required: firstName, lastName, email, favoriteColor, birthday' });
    }
    const db = getDB();
    const id = new ObjectId(req.params.id);
    const contact = { firstName, lastName, email, favoriteColor, birthday };
    const result = await db.collection('contacts').replaceOne({ _id: id }, contact);
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json({ message: 'Contact updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update contact' });
  }
};

const deleteContact = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid contact ID' });
    }
    const db = getDB();
    const id = new ObjectId(req.params.id);
    const result = await db.collection('contacts').deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete contact' });
  }
};

module.exports = { getAllContacts, getContactById, createContact, updateContact, deleteContact };