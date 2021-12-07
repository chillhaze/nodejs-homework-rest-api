const { Contact } = require('../../models')

const getAllContacts = async (req, res) => {
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
  // в populate передаем расширеные настройки от owner, и пооля, которые нужно указать в ответе, чтобы повысить читабельность

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
