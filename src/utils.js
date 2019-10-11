import dotenv from 'dotenv'; // env 파일을 읽어온다.
import path from "path";
dotenv.config({path: path.resolve(__dirname, ".env")});

import { adjectives, nouns } from "./word";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import jwt from "jsonwebtoken";

export const generateSecret = () => {
    const randomNumber = Math.floor(Math.random() * adjectives.length);
    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
}

export const sendMail = (email) => {
    const options= {
        auth: {
            api_user: process.env.SENDGRID_USERNAME,
            api_key: process.env.SENDGRID_PASSWORD
        }
    };
    const client = nodemailer.createTransport(sgTransport(options));
    return client.sendMail(email);
};

export const sendSecretMail = (adress, secret) => {
    const email = {
        from: "ghdjk2216@gmail.com",
        to: adress,
        subject: "🔒 Login Secret for Elicious 🔒",
        html: `Hello, your login secret is <strong>${secret}</strong>,<br/>Copy past on the app/website to log in`
    }
    return sendMail(email);
}

export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);