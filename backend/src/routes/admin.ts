import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import authenticate from '../middlewares/auth';

const router = express.Router();

// ✅ Corrigido com tipo RequestHandler
const requireAdmin: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
  const user = (req as any).user;

  if (!user || user.role !== 'admin') {
    res.status(403).json({ error: 'Acesso negado: apenas administradores' });
    return; // <-- importante
  }

  next();
};

// ✅ Rota protegida
router.get('/adminpage', authenticate, requireAdmin, (req: Request, res: Response) => {
  res.json({ message: 'Bem-vindo à área administrativa!' });
});

export default router;
