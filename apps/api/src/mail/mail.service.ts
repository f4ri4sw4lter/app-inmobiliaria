// src/mail/mail.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class MailService {
    private transporter;

    constructor(private readonly authService: AuthService) {

        this.transporter = nodemailer.createTransport({
            service: 'outlook',
            auth: {
                user: process.env.MAIL_USR,
                pass: process.env.MAIL_PSS,
            },
        });
    }

    async sendMail(to: string, subject: string, text: string, html?: string) {
        const mailOptions = {
            from: process.env.MAIL_USR, // Cambia esto al correo desde el cual enviarás los correos
            to,
            subject,
            text,
            html, // Opcional si deseas enviar correos en formato HTML
        };

        try {
            const result = await this.transporter.sendMail(mailOptions);
            return result;
        } catch (error) {
            console.error('Error al enviar correo:', error);
            throw new Error('No se pudo enviar el correo');
        }
    }

    async recuperarPassword(email?: string) {

        const userExist = await this.authService.findUsuario(email);
        if (!userExist) {
            return {error: 'El usuario no existe'};
        }
        
        const subject = 'Restablecimiento de contraseña - FerreyraApp';
        const codigo = this.generarCodigoRecuperacion();
        const html = "<h1>Código para restablecer contraseña</h1>\n<p>Este es el codigo de recuperacion: <b>" + codigo + "</b></p><br><h3>Por favor no responda este correo</h3>";

        const mailOptions = {
            from: process.env.MAIL_USR,
            to: email,
            subject,
            text: '',
            html,
        };

        try {
            const result = await this.transporter.sendMail(mailOptions);
            return result;
        } catch (error) {
            console.error('Error al enviar correo:', error);
            throw new Error('No se pudo enviar el correo');
        }
    }

    private generarCodigoRecuperacion = () => {
        return Math.floor(100000 + Math.random() * 900000);
    }
}
