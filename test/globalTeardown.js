// backend-cv/test/globalTeardown.js
import { sequelize } from '../config/database.js';

export default async () => {
  await sequelize.close();
};