const express = require('express')
const router = express.Router()

const Joi = require('joi')

const contactsOperations = require('../../model')

router.get('/', async (req, res, next) => {
  const result = await contactsOperations.listContacts()
  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  })
  // res.send() - для маленькой разметки <h1>Hello!</h1>
  // res.render("название_шаблона", настройки_шаблона) - для разметки через шаблонизатор
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params

  const result = await contactsOperations.getContactById(contactId)
  if (!result) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: `Contact with id: ${contactId} not found`,
    })
  }
  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  })
})

router.post('/', async (req, res, next) => {
  const body = req.body
  const { name, email, phone } = req.body

  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net', 'ru', 'ua', 'uk', 'org', 'ca'] },
      })
      .required(),
    phone: Joi.string().min(10).max(14).required(),
  })

  const validationResult = schema.validate({ name, email, phone })

  if (name && email && phone) {
    if (validationResult.error) {
      res.status(400).json({
        status: 'error',
        code: 400,
        message: validationResult.error.details,
      })
    } else {
      const result = await contactsOperations.addContact(body)

      res.status(201).json({
        status: 'success',
        code: 201,
        data: {
          result,
        },
      })
    }
  } else {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: 'missing required name field',
    })
  }
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  const result = await contactsOperations.removeContact(contactId)
  console.log(result)

  if (!result) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found',
    })
  } else {
    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'contact deleted',
      data: {
        result,
      },
    })
  }
})

router.put('/:contactId', async (req, res, next) => {
  const body = req.body
  const { name, email, phone } = req.body

  const { contactId } = req.params

  const schema = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ru', 'ua', 'uk', 'org', 'ca'] },
    }),
    phone: Joi.string().min(10).max(14),
  })

  const validationResult = schema.validate({ name, email, phone })

  if (name && email && phone) {
    if (validationResult.error) {
      res.status(400).json({
        status: 'error',
        code: 400,
        message: validationResult.error.details,
      })
    } else {
      const result = await contactsOperations.updateContact(contactId, body)
      console.log(result)
      res.status(201).json({
        status: 'success',
        code: 201,
        data: {
          result,
        },
      })
    }
  } else {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: 'missing fields',
    })
  }
})

module.exports = router
