import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'segredo-super-seguro';

export default function authenticate(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Token ausente ou mal formatado' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; role: string };

    // Inclui o ID e o role no req.user
    (req as any).user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (err) {
    console.error('Erro ao verificar token:', err);
    res.status(403).json({ error: 'Token inválido' });
  }
}
