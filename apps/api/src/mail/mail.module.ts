// src/mail/mail.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [MailService],
  controllers: [MailController],
  exports: [MailService],
})
export class MailModule {}
