const { Contact } = require('../../models')
const { Conflict } = require('http-errors')

const updateContact = async (req, res) => {
  const body = req.body
  const { _id } = req.user

  const { contactId } = req.params

  const contact = await Contact.findOne({ email: req.body.email })
  if (contact) {
    throw new Conflict(`Contact with email ${req.body.email} already exist`)
  }

  const result = await Contact.findByIdAndUpdate(
    { _id: contactId, owner: _id },
    body,
    {
      new: true,
    },
  )

  if (!result) {
    const error = new Error(`Contact with id: ${contactId} not found`)
    error.status = 404
    throw error
  }

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result,
    },
  })
}

module.exports = updateContact
