import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

export default function setupStaticFiles(app) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  app.use(express.static(path.join(__dirname, 'public')));
}
