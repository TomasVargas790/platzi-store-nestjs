import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from '@utils/config';
@Injectable()
export class AppService {
    constructor(
        @Inject('TASKS') private tasks: string[],
        @Inject(config.KEY) private configService: ConfigType<typeof config>,
    ) {}

    getHello(): string {
        console.log(this.configService);

        return 'Hello World!';
    }
}
