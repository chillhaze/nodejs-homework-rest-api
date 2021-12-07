const { Contact } = require('../../models')
const { Conflict } = require('http-errors')

class ContactsControllers {
  async addContact(req, res) {
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

  async getAllContacts(req, res) {
    const { _id } = req.user
    const { page = 1, limit = 5, favorite = false } = req.query
    // формула skip = (page-1)*limit
    const skip = (page - 1) * limit
    const result = await Contact.find({ owner: _id }, '', {
      skip,
      limit: Number(limit),
    }).populate('owner', ' email')

    if (favorite) {
      const result = await Contact.find({ owner: _id, favorite }).populate(
        'owner',
        ' email',
      )

      res.status(200).json({
        status: 'success',
        code: 200,
        data: {
          result,
        },
      })
      return
    }

    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    })
  }

  async getContactById(req, res) {
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
    }
    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    })
  }

  async removeContact(req, res) {
    const { contactId } = req.params
    const { _id } = req.user
    const result = await Contact.findByIdAndRemove({
      _id: contactId,
      owner: _id,
    })

    if (!result) {
      const error = new Error(`Contact with id: ${contactId} not found`)
      error.status = 404
      throw error
    }
    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'contact deleted',
      data: {
        result,
      },
    })
  }

  async updateContact(req, res) {
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

  async updateStatusContact(req, res) {
    const { favorite } = req.body
    const { contactId } = req.params
    const { _id } = req.user

    const result = await Contact.findByIdAndUpdate(
      { _id: contactId, owner: _id },
      { favorite },
      {
        new: true,
      },
    )

    if (!result) {
      const error = new Error('Not found')
      error.status = 404
      throw error
    }

    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    })
  }
}

module.exports = new ContactsControllers()
