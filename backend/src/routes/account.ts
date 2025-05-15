import express, { Request, Response } from 'express';
import { pool } from '../db';
import authenticate from '../middlewares/auth';
import { upload } from '../middlewares/upload';

const router = express.Router();

router.get('/profile', authenticate, async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).user.id;

  try {
    const result = await pool.query(
      'SELECT id, username, email, profile_image_url FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Usuário não encontrado' });
      return;
    }

    const user = result.rows[0];
    res.status(200).json(user);
  } catch (err) {
    console.error('Erro ao buscar perfil:', err);
    res.status(500).json({ error: 'Erro ao buscar perfil' });
  }
});

router.post(
  '/profile/photo',
  authenticate,
  upload.single('photo'),
  async (req: Request, res: Response): Promise<void> => {
    const userId = (req as any).user.id;
    const file = req.file;

    if (!file) {
      res.status(400).json({ error: 'Nenhum arquivo enviado' });
      return;
    }

    const profileImageUrl = `/uploads/${file.filename}`;

    try {
      await pool.query(
        'UPDATE users SET profile_image_url = $1 WHERE id = $2',
        [profileImageUrl, userId]
      );

      res.status(200).json({ message: 'Foto de perfil atualizada com sucesso', url: profileImageUrl });
    } catch (err) {
      console.error('Erro ao atualizar foto de perfil:', err);
      res.status(500).json({ error: 'Erro ao atualizar foto de perfil' });
    }
  }
);

export default router;
