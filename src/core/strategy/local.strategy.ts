import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  //   async validate(username: string, password: string): Promise<any> {
  //     const user = await this.authService.validateUser(username, password);
  //     //TODO: WRAP THIS IS TRY CATCH
  //     if (!user) {
  //       throw new HttpException(
  //         'Username or password incorrect',
  //         HttpStatus.UNAUTHORIZED,
  //       );
  //     }
  //     return user;
  //   }
}
