import {
  EMAIL_HOST,
  EMAIL_PASSWORD,
  EMAIL_USERNAME,
  FROM_EMAIL,
} from "@/config";
import { SendMailOptions, createTransport } from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";

const sendEmail = async (
  email: string,
  subject: string,
  payload,
  template: string
) => {
  try {
    const tranporter = createTransport({
      service: "gmail",

      host: EMAIL_HOST,
      auth: {
        user: EMAIL_USERNAME,
        pass: EMAIL_PASSWORD,
      },
    });

    const source = fs.readFileSync(path.join(__dirname, template), "utf-8");
    const compileTemplate = handlebars.compile(source);
    const options: SendMailOptions = {
      from: FROM_EMAIL,
      to: email,
      subject: subject,
      html: compileTemplate(payload),
    };

    tranporter.sendMail(options, (err, _) => {
      if (err) return err;
      return {
        success: true,
      };
    });
  } catch (error) {
    throw new Error(error);
  }
};

export default sendEmail;
