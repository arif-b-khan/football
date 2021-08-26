import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  appHealth():string{
    return "healthy";
  }
}
