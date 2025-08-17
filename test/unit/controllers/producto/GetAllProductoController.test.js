import GetAllProductoController from '../../../../src/controllers/producto/GetAllProductoController.js';
import { handleError } from '../../../../src/shared/functions.js';
import GetAllProductoService from '../../../../src/services/producto/GetAllProductoService.js';

jest.mock('../../../../src/shared/functions.js', () => ({
  handleError: jest.fn(),
}));

jest.mock('../../../../src/services/producto/GetAllProductoService.js');

describe('GetAllProductoController', () => {
  let controller;
  let mockService;
  let req;
  let res;

  beforeEach(() => {
    mockService = {
      execute: jest.fn(),
    };
    GetAllProductoService.mockImplementation(() => mockService);

    controller = new GetAllProductoController();
    req = {
      params: {},
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all products and return them', async () => {
    const mockData = [{ id: 1, nombre: 'Test Producto' }];
    mockService.execute.mockResolvedValue(mockData);

    await controller.execute(req, res);

    expect(mockService.execute).toHaveBeenCalledWith(true, {});
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  it('should handle errors and return an error response', async () => {
    const mockError = new Error('Test Error');
    const formattedError = { code: 500, message: 'Internal Server Error' };
    mockService.execute.mockRejectedValue(mockError);
    handleError.mockReturnValue(formattedError);

    await controller.execute(req, res);

    expect(mockService.execute).toHaveBeenCalledWith(true, {});
    expect(handleError).toHaveBeenCalledWith(mockError);
    expect(res.status).toHaveBeenCalledWith(formattedError.code);
    expect(res.json).toHaveBeenCalledWith(formattedError);
  });

  it('should use default repository if none is provided', () => {
    const controllerWithDefaultRepo = new GetAllProductoController();
    expect(controllerWithDefaultRepo.service).toBeDefined();
  });
});