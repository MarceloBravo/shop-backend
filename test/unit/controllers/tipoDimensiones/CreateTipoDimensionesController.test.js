import CreateTipoDimensionesController from '../../../../src/controllers/tipoDimensiones/CreateTipoDimensionesController.js';
import CreateTipoDimensionesService from '../../../../src/services/tipoDimensiones/CreateTipoDimensionesService.js';
import * as functions from "../../../../src/shared/functions.js";

jest.mock('../../../../src/services/tipoDimensiones/CreateTipoDimensionesService.js');

describe('CreateTipoDimensionesController', () => {
  let createTipoDimensionesController;
  let mockRequest;
  let mockResponse;
  let mockServiceInstance;
  let mockTipoDimensionesRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockServiceInstance = new CreateTipoDimensionesService();
    mockServiceInstance.execute = jest.fn();
    mockTipoDimensionesRepository = {
      create: jest.fn(),
      getById: jest.fn(),
    }
    CreateTipoDimensionesService.mockImplementation(() => mockServiceInstance);

    createTipoDimensionesController = new CreateTipoDimensionesController(mockTipoDimensionesRepository);
    mockRequest = {
      body: {},
    };
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    jest.spyOn(functions, 'handleError').mockImplementation((error) => ({ code: error.code || 500, message: error.message }));
  });

  it('should create a new tipo dimensiones and return success message', async () => {
    const tipoDimensionesData = { nombre: 'Test', nombre_corto: 'T' };
    const createdTipoDimensiones = { id: 1, ...tipoDimensionesData };

    mockRequest.body = tipoDimensionesData;
    mockServiceInstance.execute.mockResolvedValue(createdTipoDimensiones);

    await createTipoDimensionesController.execute(mockRequest, mockResponse);

    expect(mockServiceInstance.execute).toHaveBeenCalledWith(tipoDimensionesData);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: createdTipoDimensiones,
      mensaje: 'El registro ha sido creado exitosamente.',
    });
    expect(mockResponse.status).not.toHaveBeenCalled();
  });

  it('should handle errors and return appropriate status and message', async () => {
    const error = new Error('Validation failed');
    error.code = 400;

    mockRequest.body = { nombre: '', nombre_corto: '' };
    mockServiceInstance.execute.mockRejectedValue(error);

    await createTipoDimensionesController.execute(mockRequest, mockResponse);

    expect(functions.handleError).toHaveBeenCalledWith(error);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ code: 400, message: 'Validation failed' });
  });

  it('throw a error if none repository is provided', () => {
      expect(() => new CreateTipoDimensionesController()).toThrow('No se ha recibido un repositorio');
    });
});