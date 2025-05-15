// import { OpenAI } from 'openai'
// import fs from 'fs'
// import path from 'path'
// import dotenv from 'dotenv';

// // Carrega as variáveis de ambiente do arquivo .env
// dotenv.config();

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

// export async function transcribeAudio(filePath: string) {
//   const file = fs.createReadStream(path.resolve(filePath))

//   const response = await openai.audio.transcriptions.create({
//     file,
//     model: 'whisper-1',
//     response_format: 'text'
//   })

//   return response as string
// }
