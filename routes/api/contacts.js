const express = require('express')
const router = express.Router()

const { validation, ctrlWrapper } = require('../../middlewares')
const { contactsSchema } = require('../../schemas')
const { contactsControllers: ctrl } = require('../../controllers')

const validateMiddleware = validation(contactsSchema)

router.get('/', ctrlWrapper(ctrl.getAllContacts))

router.get('/:contactId', ctrlWrapper(ctrl.getContactById))

router.post('/', validateMiddleware, ctrlWrapper(ctrl.addContact))

router.delete('/:contactId', ctrlWrapper(ctrl.removeContact))

router.put('/:contactId', validateMiddleware, ctrlWrapper(ctrl.updateContact))

module.exports = router
