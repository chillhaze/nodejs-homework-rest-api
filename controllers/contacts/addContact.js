const { contactsOperations } = require('../../models')

const addContact = async (req, res) => {
  const body = req.body

  const result = await contactsOperations.addContact(body)

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result,
    },
  })
}

module.exports = addContact
