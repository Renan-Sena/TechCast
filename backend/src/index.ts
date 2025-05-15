import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './db';
import authRouter from './routes/auth';
import episodesRoutes from './routes/episodes';
import accountRoutes from './routes/account';
import adminRoutes from './routes/admin';

dotenv.config({ path: './.env' });
const app = express();

console.log('JWT_SECRET carregado:', process.env.JWT_SECRET);

app.use(
  cors({
    origin: 'http://localhost:5000', // Altere para o seu frontend se necessário
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded());

// Rotas
app.use('/api/auth', authRouter);
app.use('/api/episodes', episodesRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api', accountRoutes); // Inclui /profile com autenticação
app.use('/api', adminRoutes);

// Rota para buscar episódios (com busca opcional)
app.get('/api/episodes', async (req: Request, res: Response) => {
  const { searchTerm } = req.query;

  try {
    const query = searchTerm
      ? 'SELECT * FROM episodes WHERE title ILIKE $1 OR description ILIKE $1'
      : 'SELECT * FROM episodes';
    const values = searchTerm ? [`%${searchTerm}%`] : [];

    const result = await pool.query(query, values);
    console.log('Resultado da busca de episódios:', result.rows);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar podcasts:', error);
    res.status(500).send('Erro ao buscar podcasts.');
  }
});

// Rota para buscar usuários
app.get('/api/users', async (req: Request, res: Response) => {
  const { searchTerm } = req.query;

  try {
    const query = searchTerm
      ? 'SELECT * FROM users WHERE username ILIKE $1 OR email ILIKE $1'
      : 'SELECT * FROM users';
    const values = searchTerm ? [`%${searchTerm}%`] : [];

    const result = await pool.query(query, values);
    console.log('Resultado da busca de perfis de usuários:', result.rows);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar perfis:', error);
    res.status(500).send('Erro ao buscar perfis.');
  }
});

// Rota padrão
app.get('/', (req: Request, res: Response) => {
  res.send('API TechCast no ar!');
});

// Rota de teste de uploads
app.get('/uploads', (req: Request, res: Response) => {
  res.send('foi!');
});

// 🔴 ROTA REMOVIDA: ela causava conflito com /profile protegida
// app.get('/profile', (req: Request, res: Response) => {
//   res.send('profile!  ');
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
