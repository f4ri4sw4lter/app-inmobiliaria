import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
   //constructor(private readonly authService: AuthService) {
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'THE123!@#',
            ignoreExpiration: false,
        });
    }

    async validate(payload) {
        return payload;
        /*const user = await this.authService.findUsuario(payload);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;*/
    }
}
