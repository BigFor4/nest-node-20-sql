import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@configs/database.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            ignoreEnvFile: true,
        }),
        DatabaseModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
