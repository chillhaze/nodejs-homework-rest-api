const listContacts = require('./listContacts')

const getContactById = async contactId => {
  const contacts = await listContacts()
  const result = contacts.find(item => item.id.toString() === contactId)
  return result
}
module.exports = getContactById
