const fs = require('fs/promises')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const contactsPath = path.resolve('./model/contacts.json')

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath)
  return JSON.parse(contacts)
}

const getContactById = async contactId => {
  const contacts = await listContacts()
  const result = contacts.find(item => item.id.toString() === contactId)
  return result
}

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

const updateContact = async (contactId, body) => {
  const contacts = await listContacts()
  const { name, email, phone } = body
  let updatedContact = ''

  contacts.forEach(el => {
    if (el.id === Number(contactId)) {
      el.name = name
      el.email = email
      el.phone = phone
      updatedContact = el
    }
  })
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return updatedContact
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}

// const removeContact = async contactId => {
//   const contacts = await listContacts()
//   const updatedContacts = []
//   let deletedContact = {}

//   contacts.map(item => {
//     if (item.id !== Number(contactId)) {
//       updatedContacts.push(item)
//     } else if (item.id === Number(contactId)) {
//       return (deletedContact = item)
//     }

//     return fs.writeFile(contactsPath, JSON.stringify(updatedContacts))
//   })

//   return deletedContact
// }
