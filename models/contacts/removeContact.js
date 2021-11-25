const fs = require('fs/promises')
const path = require('path')
const contactsPath = path.resolve('./db/contacts.json')
const listContacts = require('./listContacts')

const removeContact = async contactId => {
  const contacts = await listContacts()
  const updatedContacts = []
  let deletedContact

  contacts.map(item => {
    if (item.id.toString() !== contactId) {
      updatedContacts.push(item)
    } else {
      deletedContact = item
    }
    return deletedContact
  })

  fs.writeFile(contactsPath, JSON.stringify(updatedContacts))

  return deletedContact
}

module.exports = removeContact
