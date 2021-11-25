const fs = require('fs/promises')
const path = require('path')
const contactsPath = path.resolve('./db/contacts.json')
const { v4: uuidv4 } = require('uuid')
const listContacts = require('./listContacts')

const addContact = async body => {
  const contacts = await listContacts()

  const newContact = {
    id: uuidv4(),
    ...body,
  }
  contacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts))

  return newContact
}

module.exports = addContact
