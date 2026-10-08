const nodemailer = require("nodemailer");

exports.sendValidation = async (to,id) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "active your account",
    text: "active your account",
    html:`
        <div style="font-family: sans-serif; text-align: center; padding: 20px;">
            <h2>Verify Your Email Address</h2>
            <p>Thanks for signing up! Please click the button below to activate your account:</p>
            <div style="margin: 30px 0;">
                <a href="http://localhost:3001/auth/active/${to}/${id}" 
                   style="background-color: #28a745; color: white; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                   Activate My Account
                </a>
            </div>
            <p style="color: #666; font-size: 12px;">If the button doesn't work, copy and paste this link into your browser:</p>
            <p style="color: #007bff; font-size: 12px;">http://localhost:3001/api/active/${to}/${id}</p>
        </div>
    `  
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully: " + info.response);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};
