import * as nodemailer from "nodemailer";

export class MailUtil {
  private transporter: nodemailer.Transporter;

  constructor(private readonly username: string, private readonly password: string) {
    this.transporter = nodemailer.createTransport({
      service : "hotmail",
      auth: {
        user: username,
        pass: password,
      },
    });
  }

  public async sendMail(to: string, subject: string, body: string): Promise<void> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: this.username,
      to: to,
      subject: subject,
      html: body,
    };
    await this.transporter.sendMail(mailOptions);
  }
}
