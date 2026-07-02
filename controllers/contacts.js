const { getDB } = require('../db');
const { ObjectId } = require('mongodb');

const getAllContacts = async (req, res) => {
  const db = getDB();
  const contacts = await db.collection('contacts').find({}).toArray();
  res.json(contacts);
};

const getContactById = async (req, res) => {
  const db = getDB();
  const contact = await db.collection('contacts').findOne({ _id: new ObjectId(req.params.id) });
  res.json(contact);
};

const createContact = async (req, res) => {
  const db = getDB();
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const result = await db.collection('contacts').insertOne(contact);
  res.json(result);
};

const updateContact = async (req, res) => {
  const db = getDB();
  const id = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const result = await db.collection('contacts').replaceOne({ _id: id }, contact);
  res.json(result);
};

const deleteContact = async (req, res) => {
  const db = getDB();
  const id = new ObjectId(req.params.id);
  const result = await db.collection('contacts').deleteOne({ _id: id });
  res.json(result);
};

module.exports = { getAllContacts, getContactById, createContact, updateContact, deleteContact };