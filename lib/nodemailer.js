import nodemailer from "nodemailer";
import getConfig from "next/config";

const user = process.env.EMAIL_CONFIRM;
const pass = process.env.EMAIL_CONFIRM_KEY;

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
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Confirmation de votre compte",
      html: `
      <div>
        <h1 style="color:#000091;font-size:46px">
          Confirmation de votre inscription
        </h1>
        <h2>Bonjour ${firstName} ${lastName}</h2>
        <img
          src="https://media.giphy.com/media/XD9o33QG9BoMis7iM4/giphy.gif"
          alt="Welcome"
        />
        <p>
          Merci de votre inscription. Veuillez la confirmer en cliquant sur le lien
          ci-dessous
        </p>
        <br />
        <a href=${publicRuntimeConfig.apiUrl}/auth/confirm?code=${confirmationCode}>${publicRuntimeConfig.apiUrl}/auth/confirm?code=${confirmationCode}</a>
        <p> Gunther, de l'équipe Ressources Relationnelles</p>
      </div>`,
    })
    .catch((err) => console.log(err));
};

export default sendConfirmationEmail;
