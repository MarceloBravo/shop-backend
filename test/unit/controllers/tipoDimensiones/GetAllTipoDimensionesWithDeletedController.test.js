import GetAllTipoDimensionesWithDeletedController from '../../../../src/controllers/tipoDimensiones/GetAllTipoDimensionesWithDeletedController.js';
import GetAllTipoDimensionesService from '../../../../src/services/tipoDimensiones/GetAllTipoDimensionesService.js';
import * as functions from "../../../../src/shared/functions.js";

jest.mock('../../../../src/services/tipoDimensiones/GetAllTipoDimensionesService.js');

describe('GetAllTipoDimensionesWithDeletedController', () => {
  let getAllTipoDimensionesWithDeletedController;
  let mockRequest;
  let mockResponse;
  let mockServiceInstance;
  let mockTipoDimensionesRepository;

  beforeEach(() => {
    jest.clearAllMocks()

    mockServiceInstance = new GetAllTipoDimensionesService();
    mockServiceInstance.execute = jest.fn();
    mockTipoDimensionesRepository = {
      getAll: jest.fn(),
    }
    GetAllTipoDimensionesService.mockImplementation(() => mockServiceInstance);

    getAllTipoDimensionesWithDeletedController = new GetAllTipoDimensionesWithDeletedController(mockTipoDimensionesRepository);
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    jest.spyOn(functions, 'handleError').mockImplementation((error) => ({ code: error.code || 500, message: error.message }));
  });

  it('should return all tipo dimensiones including deleted ones', async () => {
    const tipoDimensiones = [{ id: 1, nombre: 'Test1' }, { id: 2, nombre: 'Test2', deleted_at: new Date() }];

    mockServiceInstance.execute.mockResolvedValue(tipoDimensiones);

    await getAllTipoDimensionesWithDeletedController.execute(mockRequest, mockResponse);

    expect(mockServiceInstance.execute).toHaveBeenCalledWith(false);  // false para incluir eliminados
    expect(mockResponse.json).toHaveBeenCalledWith(tipoDimensiones);
    expect(mockResponse.status).not.toHaveBeenCalled();
  });

  it('should handle errors and return appropriate status and message', async () => {
    const error = new Error('Database error');
    error.code = 500;

    mockServiceInstance.execute.mockRejectedValue(error);

    await getAllTipoDimensionesWithDeletedController.execute(mockRequest, mockResponse);

    expect(functions.handleError).toHaveBeenCalledWith(error);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ code: 500, message: 'Database error' });
  });

  it('throw a error if none repository is provided', () => {
      expect(() => new GetAllTipoDimensionesWithDeletedController()).toThrow('No se ha recibido un repositorio');
  });
});