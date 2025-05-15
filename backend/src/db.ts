import { Pool } from 'pg';

export const pool = new Pool({
  connectionString: 'postgresql://postgres:!!!R3N4N@localhost:5432/techcast',
  // ssl: { rejectUnauthorized: false }  // Descomente se estiver usando SSL
});

pool.on('connect', () => {
  console.log('Conectado ao banco de dados com sucesso!');
});

pool.on('error', (err) => {
  console.error('Erro na conexão com o banco de dados:', err);
});
