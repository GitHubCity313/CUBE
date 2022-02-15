import nodemailer from "nodemailer";
import getConfig from "next/config";

const user = process.env.EMAIL_CONFIRM;
const pass = process.env.EMAIL_CONFIRM_KEY;

console.log(user, pass);
const { publicRuntimeConfig } = getConfig();

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

const sendConfirmationEmail = (
  lastName,
  firstName,
  email,
  confirmationCode
) => {
  console.log("Check");
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Confirmation de votre compte",
      html: `<h1>Email Confirmation</h1>
        <h2>Bonjour ${firstName} ${lastName}</h2>
        <p>Merci de votre inscription. Veuillez la confirmer en cliquant sur le lien ci-dessous</p>
        <a href=${publicRuntimeConfig.apiUrl}/confirm/${confirmationCode}> Cliquez ici</a>
        </div>`,
    })
    .catch((err) => console.log(err));
};

export default sendConfirmationEmail;
