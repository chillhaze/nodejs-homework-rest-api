const express = require('express')
const router = express.Router()

const { authUser, validation, ctrlWrapper } = require('../../middlewares')
const { joiSchema, joiUpdateStatusSchema } = require('../../models')
const { contactsControllers: ctrl } = require('../../controllers')

const validateMiddleware = validation(joiSchema)

router.get('/', authUser, ctrlWrapper(ctrl.getAllContacts))

router.get('/:contactId', authUser, ctrlWrapper(ctrl.getContactById))

router.post('/', authUser, validateMiddleware, ctrlWrapper(ctrl.addContact))

router.put(
  '/:contactId',
  authUser,
  validateMiddleware,
  ctrlWrapper(ctrl.updateContact),
)

router.patch(
  '/:contactId/favorite',
  authUser,
  validation(joiUpdateStatusSchema),
  ctrlWrapper(ctrl.updateStatusContact),
)

router.delete('/:contactId', authUser, ctrlWrapper(ctrl.removeContact))

module.exports = router
