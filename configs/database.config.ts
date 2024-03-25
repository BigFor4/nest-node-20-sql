import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { User } from '@entities/user';
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.HOST || 'localhost',
            port: process.env.PORT ? parseInt(process.env.PORT) : 3306,
            username: process.env.USERNAME || 'root',
            password: process.env.PASSWORD || 'admin',
            database: process.env.DATABASE_NAME || 'pivot',
            entities: [User],
            synchronize: true,
        }),
    ],
})
export class DatabaseModule {}
