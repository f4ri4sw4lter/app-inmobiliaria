// src/mail/mail.controller.ts
import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) { }

    @Post('send')
    async sendMail(
        @Body('to') to: string,
        @Body('subject') subject: string,
        @Body('text') text: string,
        @Body('html') html?: string,
    ) {
        return await this.mailService.sendMail(to, subject, text, html);
    }

    @Post('recuperarPassword')
    async recuperarPassword(@Res() res, @Body('mail') mail: string) {
        const respuesta = await this.mailService.recuperarPassword(mail);
        console.log(respuesta)
        if (respuesta.error) {

            return res.status(HttpStatus.BAD_REQUEST).json({
                message: respuesta.error
            });

        } else {

            return res.status(HttpStatus.OK).json({
                message: 'Usuario creado.'
            });

        }
    }
}
