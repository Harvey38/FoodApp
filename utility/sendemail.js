const nodemailer = require("nodemailer");
const pug = require("pug");
const htmlToText =require('html-to-text');
module.exports = class Email {
  constructor(user, url) {
    this.name = user.name;
    this.url = url;
    this.to = user.email;
    this.from = "Tushar Gupta <tusharguptat635@gmail.com>";
  }
  newnodemailer() {
    return nodemailer.createTransport({
      service:"gmail",
      host: "smtp.mailtrap.io",
      auth: {
        user: "tusharguptat635@gmail.com",
          pass: "ldqnlsvfkwaiyxqg"
      }
    });
  }
  async send(template, subject) {
    var html = pug.renderFile(`${__dirname}/../template/${template}.pug`, {
      name: this.name,
      url: this.url
    });
    let EmailOptions = {
      from: this.from, //sender address
      to: this.to,
      subject: subject,
      html: html,
      text: htmlToText.fromString(html)
    };
    await this.newnodemailer().sendMail(EmailOptions);
  }
  async sendWelcome() {
    await this.send("Welcome", "Welcome to the food family");
  }
};
