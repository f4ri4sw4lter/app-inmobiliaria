// src/mail/mail.controller.ts
import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) { }

}
