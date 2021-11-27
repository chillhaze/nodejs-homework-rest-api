const express = require('express')
const router = express.Router()

const { validation, ctrlWrapper } = require('../../middlewares')
const { joiSchema, joiUpdateStatusSchema } = require('../../models')
const { contactsControllers: ctrl } = require('../../controllers')

const validateMiddleware = validation(joiSchema)

router.get('/', ctrlWrapper(ctrl.getAllContacts))

router.get('/:contactId', ctrlWrapper(ctrl.getContactById))

router.post('/', validateMiddleware, ctrlWrapper(ctrl.addContact))

router.put('/:contactId', validateMiddleware, ctrlWrapper(ctrl.updateContact))

router.patch(
  '/:contactId/favorite',
  validation(joiUpdateStatusSchema),
  ctrlWrapper(ctrl.updateStatusContact),
)

router.delete('/:contactId', ctrlWrapper(ctrl.removeContact))

module.exports = router
