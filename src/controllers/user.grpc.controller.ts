import { Controller, Inject, Get } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { __ as t } from 'i18n';
import { UserService } from '../services/user.service';
import { LoginUserData } from 'src/interfaces/user.interface';

@Controller()
export class UserGrpcController {
    constructor(
        @Inject(UserService) private readonly userService: UserService
    ) { }

    //@GrpcMethod('UserService')
    @Get()
    async login(payload: { username: string, password: string }) {
        const data = await this.userService.login(payload.username, payload.password);
        return { code: 200, message: t('Login success'), data };
    }

}
