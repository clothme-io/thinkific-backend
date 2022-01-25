import AWS from "aws-sdk";

export const ses_welcomeEmail = async function (
  subject: string,
  body: string,
  senderEmail: string,
  departmentSender: string,
  receiverEmail: string,
  receiverName: string
) {
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
  });

  const ses = new AWS.SES({ apiVersion: "2010-12-01" });

  const params = {
    Destination: {
      ToAddresses: [receiverEmail] // Email address/addresses that you want to send your email
    },
    Message: {
      Body: {
        Html: {
          // HTML Format of the email
          Charset: "UTF-8",
          Data: `<html>
                    <body>
                        <h1>Hey ${receiverName}</h1>
                        <p style='color:black'>${body}</p>
                    </body>
                </html>`,
        },
        Text: {
          Charset: "UTF-8",
          Data: body,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: departmentSender + " " + senderEmail,
  };

  const result = ses.sendEmail(params).promise();
  return result;
};
