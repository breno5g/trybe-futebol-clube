import { sign, verify } from 'jsonwebtoken';
import { IJWT, IToken } from '../interfaces';

export default class JWT {
  private jwtSecret = 'jwt_secret';

  generateToken(user: IJWT): string {
    const { jwtSecret } = this;
    const token = sign({ data: user }, jwtSecret, {
      expiresIn: '7d',
      algorithm: 'HS256',
    });
    return token;
  }

  validateToken(token: string): IToken | null {
    try {
      const { jwtSecret } = this;
      const result = verify(token, jwtSecret);
      return result as IToken;
    } catch (error) {
      return null;
    }
  }
}
