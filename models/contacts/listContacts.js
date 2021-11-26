const fs = require('fs/promises')
const path = require('path')
const contactsPath = path.resolve('./db/contacts.json')

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath)
  return JSON.parse(contacts)
}

module.exports = listContacts
