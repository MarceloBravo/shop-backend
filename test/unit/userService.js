if(jest == undefined){
  let { jest } = require('@jest/globals');
}

// Mock del repositorio de usuarios
const mockUserRepository = {
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn()
};

// Servicio que vamos a testear
class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getUserById(id) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    return user;
  }

  async createUser(userData) {
    if (!userData.email || !userData.name) {
      throw new Error('Datos de usuario incompletos');
    }
    return await this.userRepository.create(userData);
  }
}

describe('UserService', () => {
  let userService;

  beforeEach(() => {
    // Limpiamos los mocks antes de cada test
    jest.clearAllMocks();
    userService = new UserService(mockUserRepository);
  });

  describe('getUserById', () => {
    test('debería retornar un usuario cuando existe', async () => {
      // Arrange
      const mockUser = { id: 1, name: 'Juan', email: 'juan@example.com' };
      mockUserRepository.findById.mockResolvedValue(mockUser);

      // Act
      const result = await userService.getUserById(1);

      // Assert
      expect(result).toEqual(mockUser);
      expect(mockUserRepository.findById).toHaveBeenCalledWith(1);
      expect(mockUserRepository.findById).toHaveBeenCalledTimes(1);
    });

    test('debería lanzar un error cuando el usuario no existe', async () => {
      // Arrange
      mockUserRepository.findById.mockResolvedValue(null);

      // Act & Assert
      await expect(userService.getUserById(1))
        .rejects
        .toThrow('Usuario no encontrado');
    });
  });

  describe('createUser', () => {
    test('debería crear un usuario con datos válidos', async () => {
      // Arrange
      const userData = { name: 'María', email: 'maria@example.com' };
      const createdUser = { id: 1, ...userData };
      mockUserRepository.create.mockResolvedValue(createdUser);

      // Act
      const result = await userService.createUser(userData);

      // Assert
      expect(result).toEqual(createdUser);
      expect(mockUserRepository.execute).toHaveBeenCalledWith(userData);
    });

    test('debería lanzar error con datos incompletos', async () => {
      // Arrange
      const invalidUserData = { name: 'María' };

      // Act & Assert
      await expect(userService.createUser(invalidUserData))
        .rejects
        .toThrow('Datos de usuario incompletos');
      expect(mockUserRepository.execute).not.toHaveBeenCalled();
    });
  });
}); 