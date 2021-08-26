import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('health')
  @Header('Cache-Control', 'none')
  healthcheck(): string {
    return this.appService.appHealth();
  }
}
