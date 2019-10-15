import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "src/config/config.module";
import { ConfigService } from "src/config/config.service";
import { ConnectionOptions } from "typeorm";
import { Configuration } from "src/config/config.keys";
import { join } from "path";

export const databaseProviders = [
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        async useFactory(config: ConfigService){
            return {
                ssl: true,
                type: 'postgres' as 'postgres',
                host: config.get(Configuration.HOST),
                username: config.get(Configuration.USERNAME),
                password: config.get(Configuration.PASSWORD),
                entities: [join(__dirname, '**/**.entity{.ts,.js}')],
                migrations: [join(__dirname, '/migrations/*{.ts,.js}')],
            } as ConnectionOptions
        }
    })
]