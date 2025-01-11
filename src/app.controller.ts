import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return `oaa`;
    }

    @Get('nuevo')
    newEndpoint() {
        return `yo soy nuevo`;
    }

    @Get('/ruta/')
    hello() {
        return `asdasdasd`;
    }
}
