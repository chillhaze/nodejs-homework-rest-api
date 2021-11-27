const { Contact } = require('../../models')

const updateContact = async (req, res) => {
  const body = req.body

  const { contactId } = req.params
  const result = await Contact.findByIdAndUpdate({ _id: contactId }, body, {
    new: true,
  })

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
