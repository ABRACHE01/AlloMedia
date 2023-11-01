import nodemailer from "nodemailer"



const sendEmail = async (email, subject, verificationLink) => {
  try {

    let htmlTemplate ;

    let transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "81529807402e34",
          pass: "1320bfa38281f7"
        }
      });

    if(subject == "Verify Email"){
     htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
          <title>Email Verification</title>
      </head>
      <body>
          <div>
              <h2>Email Verification</h2>
              <p>Dear user</p>
              <p>Thank you for signing up. Please verify your email address to activate your account:</p>
              <p><a href="${verificationLink}">Verify your email</a></p>
              <p>If you did not create an account or did not request this verification, please ignore this email.</p>
              <p>Best regards,<br>AlloMedia</p>
          </div>
      </body>
      </html>
    `;}

    if(subject == "Forgot Password"){
      htmlTemplate = `
       <!DOCTYPE html>
       <html>
       <head>
           <title>Forgot Password</title>
       </head>
       <body>
           <div>
               <h2>Forgot Password</h2>
               <p>Dear user</p>
               <p>Thank you for following up . Please client link to reset your password:</p>
               <p><a href="${verificationLink}">reset password</a></p>
               <p>Best regards,<br>AlloMedia</p>
           </div>
       </body>
       </html>
     `;}

    await transporter.sendMail({
      from: "your-email@example.com",
      to: email,
      subject: subject,
      html: htmlTemplate,
    });

    return true;
  } catch (error) {
   throw error;
  }
};


export{sendEmail}
