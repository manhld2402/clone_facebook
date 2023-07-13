const nodeMailer = require("nodemailer");
const mailConfig = require("../config/mail.config");
require("dotenv/config");

exports.sendMail = async (to, subject, htmlcontent) => {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: "manh.ld2402@gmail.com",
      pass: "tpoqhpyqmhufoscl",
    },
  });

  const mailOptions = {
    from: "manh.ld2402@gmail.com",
    to: "vu.nn080899@gmail.com",
    subject: "Hello from Node.js",
    html: `<!DOCTYPE html>
    <html>
    <title>HTML Tutorial</title>
    <body>
    <h1>This is a heading</h1>
    <p>This is a paragr  aph.</p>
    </body>
    </html>`,
  };
  const result = await transporter.sendMail(mailOptions);
  return null;
};
