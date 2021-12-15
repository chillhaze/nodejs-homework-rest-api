const sgMail = require('@sendgrid/mail')
require('dotenv').config()

const { SENDGRID_API_KEY } = process.env

sgMail.setApiKey(SENDGRID_API_KEY)

const sendEmail = async data => {
  const email = { ...data, from: 'elon.musk@ts.com' }

  // eslint-disable-next-line no-useless-catch
  try {
    await sgMail.send(email)

    return true
  } catch (error) {
    throw error
  }
}

module.exports = sendEmail

// const email = {
//   to: '',
//   from: 'elon.musk@ts.com',
//   subject: '',
//   html: '',
// }

// sgMail
//   .send(email)
//   .then(() => console.log('Email send success'))
//   .catch(error => console.log(error.message))
