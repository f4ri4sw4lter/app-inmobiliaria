import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../constants';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly jwt: JwtService
  ){}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if(!token){
      throw new UnauthorizedException();
    }

    try{
      const payload = await this.jwt.verifyAsync(
        token,
        {
          secret: jwtConstants.secret
        }
      )

      request['user'] = payload;
    }catch{
      throw new UnauthorizedException();
    }

    return true;

  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
