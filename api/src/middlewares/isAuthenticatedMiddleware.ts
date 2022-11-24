import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const isAuthenticatedMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorization = req.headers.authorization;

  //usuário não habilitou campo de autenticação
  if (!authorization) {
    return res
      .status(400)
      .json({ detail: 'Authentication credentials were not provided' });
  }

  const token = authorization.split(' ')[1];

  //usuário habilitou o campo, mas não informou nenhum token
  if (!token) {
    return res.status(400).json({ detail: 'Token cannot be blank' });
  }

  jwt.verify(
    token,
    process.env.SECRET_KEY as string,
    (err: any, decoded: any) => {
      if (err) {
        return res.status(400).json({ detail: 'Invalid token' });
      }

      req.user = {
        userId: decoded.userId,
        username: decoded.username,
        accountId: decoded.accountId,
      };

      next();
    },
  );
};
