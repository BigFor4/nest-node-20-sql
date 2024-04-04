import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { User } from '@models/user';
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DATABASE_HOST || 'localhost',
            port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 3306,
            username: process.env.DATABASE_USERNAME || 'root',
            password: process.env.DATABASE_PASSWORD || 'admin',
            database: process.env.DATABASE_NAME || 'pivot',
            entities: [User],
            synchronize: true,
        }),
    ],
})
export class DatabaseModule {}
