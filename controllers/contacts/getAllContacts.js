const { Contact } = require('../../models')

const getAllContacts = async (req, res) => {
  const result = await Contact.find({})
  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  })

  // res.send() - для маленькой разметки <h1>Hello!</h1>
  // res.render("название_шаблона", настройки_шаблона) - для разметки через шаблонизатор
}

module.exports = getAllContacts
