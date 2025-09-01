import GetPageSubCategoriaWithDeletedController from '../../../../src/controllers/subCategoria/GetPageSubCategoriaWithDeletedController.js';
import GetPageSubCategoriaService from '../../../../src/services/subCategoria/GetPageSubCategoriaService.js';
import { handleError } from '../../../../src/shared/functions.js';

jest.mock('../../../../src/services/subCategoria/GetPageSubCategoriaService.js');
jest.mock('../../../../src/shared/functions.js');

describe('GetPageSubCategoriaWithDeletedController', () => {
    let controller;
    let req;
    let res;
    let mockSubCategoriaRepository;

    const mockServiceInstance = {
        execute: jest.fn(),
    };

    GetPageSubCategoriaService.mockImplementation(() => mockServiceInstance);

    beforeEach(() => {
        mockSubCategoriaRepository = {
            getPage: jest.fn(),
        };
        controller = new GetPageSubCategoriaWithDeletedController(mockSubCategoriaRepository);
        req = {
            params: { pag: 1, limit: 10 }
        };
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
        jest.clearAllMocks();
    });

    it('should get a page of subcategories including deleted and return them', async () => {
        const subcategories = [
            { id: 1, nombre: 'Test SubCategoria 1', categoria_id: 1, deletedAt: null },
            { id: 2, nombre: 'Test SubCategoria 2', categoria_id: 1, deletedAt: new Date() }
        ];
        const pag = 1;
        const serviceResponse = {
            rows: subcategories,
            count: 2,
            totPag: 1,
        };
        const expectedResponse = { 
            data: { 
                data: subcategories, 
                totReg: subcategories.length, 
                rows: subcategories.length, 
                pag: pag,
                totPag: serviceResponse.totPag 
            } 
        };
        mockServiceInstance.execute.mockResolvedValue(serviceResponse);

        await controller.execute(req, res);
        
        expect(mockServiceInstance.execute).toHaveBeenCalledWith(pag, 10, false);
        expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });

    it('should handle errors and return an error response', async () => {
        const error = new Error('Test Error');
        error.code = 500;
        mockServiceInstance.execute.mockRejectedValue(error);
        const formattedError = { code: 500, message: 'Test Error' };
        handleError.mockReturnValue(formattedError);

        await controller.execute(req, res);

        expect(mockServiceInstance.execute).toHaveBeenCalledWith(1, 10, false);
        expect(handleError).toHaveBeenCalledWith(error);
        expect(res.status).toHaveBeenCalledWith(formattedError.code);
        expect(res.json).toHaveBeenCalledWith(formattedError);
    });

    it('throw a error if none repository is provided', () => {
      expect(() => new GetPageSubCategoriaWithDeletedController()).toThrow('No se ha recibido un repositorio');
  });
});