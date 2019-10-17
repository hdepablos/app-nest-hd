import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "./../config/config.module";
import { ConfigService } from "./../config/config.service";
import { ConnectionOptions } from "typeorm";
import { Configuration } from "./../config/config.keys";
import { join } from "path";

export const databaseProviders = [
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        async useFactory(config: ConfigService){
            const obj = {
                ssl: true,
                type: 'postgres' as 'postgres',
                host: config.get(Configuration.HOST),
                username: config.get(Configuration.USERNAME),
                password: config.get(Configuration.PASSWORD),
                database: config.get(Configuration.DATABASE),
                entities: [join(__dirname, '/../modules/**/*.entity{.ts,.js}')],
                migrations: [join(__dirname, '/migrations/*{.ts,.js}')],
            };
            return obj as ConnectionOptions
        }
    })
]