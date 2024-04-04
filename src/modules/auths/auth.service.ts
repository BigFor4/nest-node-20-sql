import { Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
    getHello(): string {
        return 'Hello World!';
    }

    public async login(loginUserDto: LoginUserDto) {
        return loginUserDto;
    }
}
