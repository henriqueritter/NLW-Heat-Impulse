import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken';

interface IPayLoad {
  sub: string
}
export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      errorCode: "token.invalid"
    });
  }

  const [, token] = authToken.split(" "); //remove Bearer do comeco

  try {
    //sub == o ID do usuario
    const { sub } = verify(token, process.env.JWT_SECRET);

    request.user_id = sub;
  } catch (err) {
    return response.status(401).json({ errorCode: "token.expired" })
  }
}