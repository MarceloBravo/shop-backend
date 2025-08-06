// backend-cv/test/globalTeardown.js
import { sequelize } from '../src/models/index.js';

export default async () => {
  await sequelize.close();
};