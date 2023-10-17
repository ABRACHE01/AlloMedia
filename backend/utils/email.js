import nodemailer from "nodemailer"



const sendEmail = async (email, subject, verificationLink) => {
  try {

    let transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: 2525,
      auth: {
        user: 'e0400916a8ed83',
        pass: process.env.PASS
      }
    });

    const htmlTemplate = `
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
    `;

    await transporter.sendMail({
      from: "your-email@example.com",
      to: email,
      subject: subject,
      html: htmlTemplate,
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email not sent");
    console.error(error);
  }
};


export{sendEmail}
