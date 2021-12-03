const { Contact } = require('../../models')
const { Conflict } = require('http-errors')

const addContact = async (req, res) => {
  const body = req.body
  const { _id } = req.user

  const contact = await Contact.findOne({ email: req.body.email })
  if (contact) {
    throw new Conflict(`Contact with email ${req.body.email} already exist`)
  }

  const result = await Contact.create({ ...body, owner: _id })

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result,
    },
  })
}

module.exports = addContact
