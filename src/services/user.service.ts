import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { __ as t } from 'i18n';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import {
    CreateUserInput, LoginUserData,
} from '../interfaces/user.interface';
import * as config from 'config';
import { CryptoUtil } from '../utils/crypto.util';
import { JWTUtil } from 'src/utils/jwt.util';
import { CurlUtil } from 'src/utils/curl.util';
import { RequestUtil } from 'src/utils/request.util';

const loginSettings = config.get<ILoginSettings>('LOGIN_SETTINGS');

@Injectable()
export class UserService {
    
    constructor(
        @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
        @Inject(CryptoUtil) private readonly cryptoUtil: CryptoUtil,
        @Inject(JWTUtil) private readonly jwtUtil: JWTUtil,
        @Inject(CurlUtil) private readonly curlUtil: CurlUtil,
        @Inject(RequestUtil) private readonly requestUtil: RequestUtil
    ) { }

    // /**
    //  * Cteate a user
    //  *
    //  * @param user The user object
    //  */
    // async createUser(createUserInput: CreateUserInput): Promise<void> {
    //     if (!(createUserInput.username && createUserInput.userId)) {
    //         throw new RpcException({ code: 10001, message: t('Please make sure the username, userId all exist at least one')});
    //     }
    //     const user = await this.userRepo.save(createUserInput);
    // }

    // /**
    //  * Delete users in the recycle bin
    //  *
    //  * @param id The specified user id
    //  */
    // async deleteUser(id: number): Promise<void> {
    //     await this.userRepo.createQueryBuilder('user').update('user.deleted = true').execute();
    // }


    /**
     * user login by username or email
     *
     * @param loginName loginName: username or email
     * @param password password
     */
    // async login(loginUserData: LoginUserData) {
    //     const url = loginSettings.javaApi + '/auth/open-api/autotest/useradmin/v1/login'
    //     const requestData = {
    //         url: url,
    //         method: this.requestUtil.getRequestMethodTypeString(1),
    //         data: loginUserData
    //     }
    //     const result = await this.curlUtil.makeRequest(requestData).toPromise().catch(
    //         err => {
    //             throw new RpcException({ code: 10005, message: t('Failed to request Java login interface') });
    //         }
    //     )
    //     if (!result.data) {
    //         throw new RpcException({ code: 10003, message: t('Please confirm that the user name and password are correct') });
    //     }
    //     if (result.data.code === 10000) {
    //         // 请求成功储存用户
    //         const userData = {
    //             userId: result.data.data.userInfoVO.id,
    //             username: result.data.data.userInfoVO.username
    //         }
    //         const user = await this.userRepo.save(userData).catch(
    //             err => {
    //                 throw new RpcException({ code: 10006, message: t('Failed to save login user data') });
    //             }
    //         )
    //         const token = this.jwtUtil.generateJWT(user);
    //         // 保存java平台的token
    //         result.data.data.userInfoVO.javaToken = result.data.data.userInfoVO.token;
    //         // 自动化测试平台的token
    //         result.data.data.userInfoVO.token = token;
    //         result.data.data.userInfoVO.userId = result.data.data.userInfoVO.id;
    //         result.data.data.userInfoVO.id = user.id;
    //         return {token: token}
    //     } else if (result.data.code === 21010 || result.data.code === 190003) {
    //         return {code: result.data.code, msg: result.data.msg}
    //     }
    //     else {
    //         throw new RpcException({ code: 10003, message: t('Please confirm that the user name and password are correct') });
    //     }
    // }

    async login(loginName: string, password: string) {
        return {username: 'logintest'}
    }

}