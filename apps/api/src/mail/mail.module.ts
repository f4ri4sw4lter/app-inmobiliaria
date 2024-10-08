// src/mail/mail.module.ts
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [MailService],
  imports: [AuthModule],
  controllers: [MailController],
  exports: [MailService],
})
export class MailModule {}
