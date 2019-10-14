import * as fs from 'fs';
import { parse } from 'dotenv';

export class ConfigService {
    private envConfig: {
        [key: string]: string
    }

    constructor() {
        const isDev = process.env.NODE_ENV !== "production";

        if (isDev) {
            const envFilePath = __dirname + '/../../.env';
            const existPath = fs.existsSync(envFilePath);

            if (!existPath) {
                console.log('El archivo de configuración no existe');
                process.exit(0);
            }

            this.envConfig = parse(fs.readFileSync(envFilePath));

        } else {
            this.envConfig = {
                PORT: process.env.PORT,
            }
        }
    }

    get(key: string): string {
        return this.envConfig[key];
    }
}
