import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { DatabaseModule } from '@configs/database.config';
import { AuthModule } from '@modules/auths/auth.module';
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            ignoreEnvFile: true,
        }),
        // DatabaseModule
        AuthModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
