import * as jwt from 'jsonwebtoken';
import { SECRET } from '../common/jwt.secret';


export class JWTUtil {
    generateJWT(user: any) {
        return jwt.sign({
          id: user.id,
          userId: user.userId,
          username: user.username
        }, SECRET, {
          expiresIn: '7d' // 7天过期时间
        });
      };
}