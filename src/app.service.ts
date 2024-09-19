import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return "'Event Nepal' api v1 working !!!";
  }
}
