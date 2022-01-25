require("dotenv").config();
const sendGridMail = require("@sendgrid/mail");
// const apiKey = `${process.env.SENDGRID_API_KEY}`
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

function messageConfig(
  toEmail: string,
  from: string,
  subject: string,
  bodyData: string
) {
  const body = bodyData;
  return {
    to: toEmail,
    from: from,
    subject: subject,
    text: body,
    html: `<strong>${body}</strong>`,
  };
}

export async function sendEmailWithSendGrid(
  toEmail: string,
  from: string,
  subject: string,
  bodyData: string
) {
  try {
    await sendGridMail.send(messageConfig(toEmail, from, subject, bodyData));
  } catch (error: any) {
    console.log(error);
    if (error.response) console.log(error.response.body);
  }
}
