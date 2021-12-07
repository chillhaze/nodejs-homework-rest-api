const { Contact } = require('../../models')
// вариант с npm http-error #1
// const createError = require('http-errors')
// вариант с npm http-error #2
// const { NotFound } = require('http-errors')

const getContactById = async (req, res) => {
  const { contactId } = req.params
  const { _id } = req.user

  const result = await Contact.findById({
    _id: contactId,
    owner: _id,
  }).populate('owner', ' email')

  if (!result) {
    const error = new Error(`Contact with id: ${contactId} not found`)
    error.status = 404
    throw error
    // вариант с npm http-error #1
    // throw createError(404, `Contact with id: ${contactId} not found`)
    // вариант с npm http-error #2
    // throw new NotFound(`Contact with id: ${contactId} not found`)
  }
  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  })
}

module.exports = getContactById
