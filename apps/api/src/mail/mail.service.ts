// src/mail/mail.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class MailService {
    private transporter;

    constructor(private readonly authService: AuthService) {

        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER, // tu dirección de Gmail
                pass: process.env.MAIL_PASSWORD, // contraseña de aplicación generada
              },
        });
    }

    async recuperarPassword(email: string, codigo: string) {

        const userExist = await this.authService.findUsuario(email);
        if (!userExist) {
            return {error: 'El usuario no existe'};
        }
        
        const subject = 'Restablecimiento de contraseña - FerreyraApp';
    
        const html = "<h1>Código para restablecer contraseña</h1>\n<p>Este es el codigo de recuperacion: <b>" + codigo + "</b></p><br><h3>Por favor no responda este correo</h3>";

        const mailOptions = {
            from: process.env.MAIL_USER, // Cambia esto al correo desde el cual enviarás los correos
            to: email,
            subject,
            text: '',
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

    private generarCodigoRecuperacion = () => {
        return Math.floor(100000 + Math.random() * 900000);
    }
}
