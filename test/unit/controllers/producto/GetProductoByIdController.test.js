import GetProductoByIdController from '../../../../src/controllers/producto/GetProductoByIdController.js';
import { handleError } from '../../../../src/shared/functions.js';
import GetByProductoService from '../../../../src/services/producto/GetByProductoService.js';

jest.mock('../../../../src/shared/functions.js', () => ({
  handleError: jest.fn(),
}));

jest.mock('../../../../src/services/producto/GetByProductoService.js');

describe('GetProductoByIdController', () => {
  let controller;
  let mockService;
  let req;
  let res;

  beforeEach(() => {
    mockService = {
      execute: jest.fn(),
    };
    GetByProductoService.mockImplementation(() => mockService);

    controller = new GetProductoByIdController();
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

  it('should get a product by id and return it', async () => {
    const mockData = { id: 1, nombre: 'Test Producto' };
    mockService.execute.mockResolvedValue(mockData);

    await controller.execute(req, res);

    expect(mockService.execute).toHaveBeenCalledWith(1, false, true);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  it('should handle errors and return an error response', async () => {
    const mockError = new Error('Test Error');
    const formattedError = { code: 500, message: 'Internal Server Error' };
    mockService.execute.mockRejectedValue(mockError);
    handleError.mockReturnValue(formattedError);

    await controller.execute(req, res);

    expect(mockService.execute).toHaveBeenCalledWith(1, false, true);
    expect(handleError).toHaveBeenCalledWith(mockError);
    expect(res.status).toHaveBeenCalledWith(formattedError.code);
    expect(res.json).toHaveBeenCalledWith(formattedError);
  });

  it('should use default repository if none is provided', () => {
    const controllerWithDefaultRepo = new GetProductoByIdController();
    expect(controllerWithDefaultRepo.service).toBeDefined();
  });
});