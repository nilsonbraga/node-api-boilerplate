import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  try {
    const [, token] = bearerToken.split(' ');
    const decodedToken = await promisify(jwt.verify)(
      token,
      authConfig.secretKey
    );

    const { id } = decodedToken;
    req.user_id = id;

    return next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid Token' });
  }
};
