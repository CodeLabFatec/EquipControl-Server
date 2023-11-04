import { config } from '../config/config';
import nodemailer from 'nodemailer';

const mailService = nodemailer.createTransport({
    host: config.email.host,
    port: config.email.port,
    secure: false,
    auth: {
        user: config.email.user,
        pass: config.email.pass
    }
});

interface EmailType {
    to: string | string[];
    subject: string;
    text: string;
}

export const sendEmail = async (email: EmailType) => {
    await mailService.sendMail({
        from: `EquipControl <${config.email.user}>`, // sender address
        to: email.to, // list of receivers
        subject: email.subject, // Subject line
        text: email.text // plain text body
    });
};
