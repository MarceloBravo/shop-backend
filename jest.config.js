export default {
  transform: {
    '^.+\\.[tj]s$': 'babel-jest', // Usa babel-jest para transformar archivos .js y .ts
  },
  testEnvironment: 'node', // Configura el entorno de pruebas
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'], // Extensiones reconocidas
  transformIgnorePatterns: [
    '/node_modules/', // Ignora la transformación de node_modules
  ],
};