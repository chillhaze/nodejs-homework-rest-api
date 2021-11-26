const fs = require('fs/promises')
const path = require('path')
const contactsPath = path.resolve('./db/contacts.json')
const listContacts = require('./listContacts')

const updateContact = async (contactId, body) => {
  const contacts = await listContacts()
  const { name, email, phone } = body
  let updatedContact = ''

  contacts.forEach(item => {
    if (item.id.toString() === contactId) {
      item.name = name
      item.email = email
      item.phone = phone
      updatedContact = item
    }
  })
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return updatedContact
}

module.exports = updateContact
