
import UpdateTipoDimensionesController from '../../../../src/controllers/tipoDimensiones/UpdateTipoDimensionesController.js';
import UpdateTipoDimensionesService from '../../../../src/services/tipoDimensiones/UpdateTipoDimensionesService.js';
import TipoDimensionesRepository from '../../../../src/repositories/TipoDimensionesRepository.js';
import * as functions from "../../../../src/shared/functions.js";

jest.mock('../../../../src/services/tipoDimensiones/UpdateTipoDimensionesService.js');
jest.mock('../../../../src/repositories/TipoDimensionesRepository.js');

describe('UpdateTipoDimensionesController', () => {
  let updateTipoDimensionesController;
  let mockRequest;
  let mockResponse;
  let mockServiceInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    mockServiceInstance = new UpdateTipoDimensionesService();
    mockServiceInstance.execute = jest.fn();
    UpdateTipoDimensionesService.mockImplementation(() => mockServiceInstance);
    updateTipoDimensionesController = new UpdateTipoDimensionesController();
    mockRequest = {
      params: {},
      body: {},
    };
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    jest.spyOn(functions, 'handleError').mockImplementation((error) => ({ code: error.code || 500, message: error.message }));
  });

  it('should update a tipo dimensiones and return success message', async () => {
    const tipoDimensionesData = { nombre: 'Updated Test', nombre_corto: 'UT' };
    const updatedTipoDimensiones = { id: 1, ...tipoDimensionesData };
    const result = { data: updatedTipoDimensiones, created: false }

    mockRequest.params.id = 1;
    mockRequest.body = tipoDimensionesData;
    
    mockServiceInstance.execute.mockResolvedValue(result);
    
    await updateTipoDimensionesController.execute(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith({
      data: updatedTipoDimensiones,
      mensaje: 'Registro actualizado exitosamente.',
    });
    expect(mockResponse.status).not.toHaveBeenCalled();
  });
  
  it('should create a tipo dimensiones and return success message if created', async () => {
    const tipoDimensionesData = { nombre: 'New Test', nombre_corto: 'NT' };
    const newTipoDimensiones = { id: 2, ...tipoDimensionesData };
    const result = { data: newTipoDimensiones, created: true };

    mockRequest.params.id = 2;
    mockRequest.body = tipoDimensionesData;

    mockServiceInstance.execute.mockResolvedValue(result);

    await updateTipoDimensionesController.execute(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith({
      data: newTipoDimensiones,
      mensaje: 'Registro creado exitosamente.',
    });
    expect(mockResponse.status).not.toHaveBeenCalled();
  });
  
  it('should handle errors and return appropriate status and message', async () => {
    const error = new Error('Validation failed');
    error.code = 400;

    mockRequest.params.id = 1;
    mockRequest.body = { nombre: '', nombre_corto: '' };

    mockServiceInstance.execute.mockRejectedValue(error);

    await updateTipoDimensionesController.execute(mockRequest, mockResponse);

    expect(functions.handleError).toHaveBeenCalledWith(error);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ code: 400, message: 'Validation failed' });
  });
  
  it('should use default repository if none is provided', () => {
    const controller = new UpdateTipoDimensionesController();
    expect(TipoDimensionesRepository).toHaveBeenCalledTimes(2); // Una vez en beforeEach, otra aquí
    expect(controller.service).toBeInstanceOf(UpdateTipoDimensionesService);
  });
});