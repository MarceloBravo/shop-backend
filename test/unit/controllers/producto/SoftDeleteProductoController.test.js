import SoftDeleteProductoController from '../../../../src/controllers/producto/SoftDeleteProductoController.js';
import { handleError } from '../../../../src/shared/functions.js';
import SoftDeleteProductoService from '../../../../src/services/producto/SoftDeleteProductoService.js';

jest.mock('../../../../src/shared/functions.js', () => ({
  handleError: jest.fn(),
}));

jest.mock('../../../../src/services/producto/SoftDeleteProductoService.js');

describe('SoftDeleteProductoController', () => {
  let controller;
  let mockService;
  let req;
  let res;

  beforeEach(() => {
    mockService = {
      execute: jest.fn(),
    };
    SoftDeleteProductoService.mockImplementation(() => mockService);

    controller = new SoftDeleteProductoController();
    req = {
      params: { id: 1 },
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should soft delete a product and return a success message', async () => {
    mockService.execute.mockResolvedValue(true);

    await controller.execute(req, res);

    expect(mockService.execute).toHaveBeenCalledWith(1);
    expect(res.json).toHaveBeenCalledWith({ id: 1, code: 200, mensaje: 'El registro ha sido borrado exitosamente.' });
  });

  it('should return a failure message if the product was not deleted', async () => {
    mockService.execute.mockResolvedValue(false);

    await controller.execute(req, res);

    expect(mockService.execute).toHaveBeenCalledWith(1);
    expect(res.json).toHaveBeenCalledWith({ id: 1, code: 500, mensaje: 'El registro no púdo ser borrado o registro inexistente' });
  });

  it('should handle errors and return an error response', async () => {
    const mockError = new Error('Test Error');
    const formattedError = { code: 500, message: 'Internal Server Error' };
    mockService.execute.mockRejectedValue(mockError);
    handleError.mockReturnValue(formattedError);

    await controller.execute(req, res);

    expect(mockService.execute).toHaveBeenCalledWith(1);
    expect(handleError).toHaveBeenCalledWith(mockError);
    expect(res.status).toHaveBeenCalledWith(formattedError.code);
    expect(res.json).toHaveBeenCalledWith(formattedError);
  });

  it('should use default repository if none is provided', () => {
    const controllerWithDefaultRepo = new SoftDeleteProductoController();
    expect(controllerWithDefaultRepo.service).toBeDefined();
  });
});