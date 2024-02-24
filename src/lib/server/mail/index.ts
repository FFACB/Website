import nodemailer from 'nodemailer'
import { getParametre } from '../parametres/parametres';
import { logger } from '$lib/server/logs';

class Mailer {
    isInit: boolean;
    transporter: any;
    sender: string;

    constructor() {
        this.isInit = false;
        this.transporter = null;
        this._init()
        this.sender = "";
    }

    async _init() {


        try {

            const PUBLIC_SMTP_HOST = await getParametre("PUBLIC_SMTP_HOST")
            const PUBLIC_SMTP_PORT = await getParametre("PUBLIC_SMTP_PORT")
            const PUBLIC_SMTP_IDENTIFIANT = await getParametre("PUBLIC_SMTP_IDENTIFIANT")
            const SECRET_SMTP_PASSWORD = await getParametre("SECRET_SMTP_PASSWORD")
            const PUBLIC_SMTP_SENDER = await getParametre("PUBLIC_SMTP_SENDER")

            if (!PUBLIC_SMTP_HOST || !PUBLIC_SMTP_PORT || !PUBLIC_SMTP_IDENTIFIANT || !SECRET_SMTP_PASSWORD || !PUBLIC_SMTP_SENDER) {
                logger.error({}, "Erreur lors de la récupération des paramètres de configuration du serveur SMTP")
            }

            if (PUBLIC_SMTP_HOST.value.length <= 0 || PUBLIC_SMTP_PORT.value.length <= 0 || PUBLIC_SMTP_IDENTIFIANT.value.length <= 0 || SECRET_SMTP_PASSWORD.value.length <= 0 || PUBLIC_SMTP_SENDER.value.length <= 0) {
                logger.warn({}, "Erreur lors de la récupération des paramètres de configuration du serveur SMTP")
            }
            this.sender = PUBLIC_SMTP_SENDER.value;
            this.transporter = nodemailer.createTransport({
                host: PUBLIC_SMTP_HOST.value,
                port: PUBLIC_SMTP_PORT.value,
                secure: false, //window.location.protocol === "https:" ? true : false,
                auth: {
                    user: PUBLIC_SMTP_IDENTIFIANT.value,
                    pass: SECRET_SMTP_PASSWORD.value,
                },
            });

            this.isInit = true;
        } catch (e) {
            logger.error(e, "Erreur lors de l'initialisation du serveur SMTP")
        }


    }

    async sendMail(to: string, subject: string, text: string, html: string): Promise<Boolean> {

        if (!this.isInit) {
            console.error("Please initialize SMTP connection")
            return false
        }
        try {
            const info = await this.transporter.sendMail({
                from: `<${this.sender}>`, // sender address
                to,
                subject,
                text,
                html,
            })
        } catch (err) {
            logger.error(err, "Erreur lors de l'envoi du mail")
            return false;
        }

        return true;

    }
}

const mailer = new Mailer()
export default mailer;