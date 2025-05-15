import express, { Request, Response } from "express";
import { pool } from '../db';
import authenticate from '../middlewares/auth';
import { upload } from '../middlewares/upload';

const router = express.Router();

router.post('/upload', authenticate, upload.single('audio'), async (req: Request, res: Response): Promise<void> => {
    const { title, description } = req.body;
    const userId = (req as any).user.id;
    const file = req.file;
  
    if (!file) {
        res.status(400).json({ error: 'Arquivo não enviado' });
        return;
    }
  
    const audioUrl = `/uploads/${file.filename}`;
  
    try {
        const result = await pool.query(
            `INSERT INTO episodes (title, description, audio_url, user_id)
            VALUES ($1, $2, $3, $4) RETURNING *`,
            [title, description, audioUrl, userId]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao salvar episódio' });
    }
});

export default router;

