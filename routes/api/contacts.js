const express = require('express')
const router = express.Router()

const { authUser, validation, ctrlWrapper } = require('../../middlewares')
const { joiSchema, joiUpdateStatusSchema } = require('../../models')
const { contactsControllers: ctrl } = require('../../controllers')

const validateMiddleware = validation(joiSchema)

router.get('/', authUser, ctrlWrapper(ctrl.ContactsControllers.getAllContacts))

router.get(
  '/:contactId',
  authUser,
  ctrlWrapper(ctrl.ContactsControllers.getContactById),
)

router.post(
  '/',
  authUser,
  validateMiddleware,
  ctrlWrapper(ctrl.ContactsControllers.addContact),
)

router.put(
  '/:contactId',
  authUser,
  validateMiddleware,
  ctrlWrapper(ctrl.ContactsControllers.updateContact),
)

router.patch(
  '/:contactId/favorite',
  authUser,
  validation(joiUpdateStatusSchema),
  ctrlWrapper(ctrl.ContactsControllers.updateStatusContact),
)

router.delete(
  '/:contactId',
  authUser,
  ctrlWrapper(ctrl.ContactsControllers.removeContact),
)

module.exports = router
