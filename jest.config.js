export default {
  
  testEnvironment: 'node',
  moduleFileExtensions: ['js','json','ts','tsx','node'],
  transformIgnorePatterns: ['/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/test/setupTest.js'],
  
  globalSetup: '<rootDir>/test/globalSetup.js',
  globalTeardown: '<rootDir>/test/globalTeardown.js',
  extensionsToTreatAsEsm: ['.ts'], 
};