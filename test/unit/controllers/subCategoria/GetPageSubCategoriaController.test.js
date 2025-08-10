import GetPageSubCategoriaController from '../../../../src/controllers/subCategoria/GetPageSubCategoriaController.js';
import GetPageSubCategoriaService from '../../../../src/services/subCategoria/GetPageSubCategoriaService.js';
import { handleError } from '../../../../src/shared/functions.js';

jest.mock('../../../../src/services/subCategoria/GetPageSubCategoriaService.js');
jest.mock('../../../../src/shared/functions.js');

describe('GetPageSubCategoriaController', () => {
    let controller;
    let req;
    let res;

    const mockServiceInstance = {
        execute: jest.fn(),
    };

    GetPageSubCategoriaService.mockImplementation(() => mockServiceInstance);

    beforeEach(() => {
        controller = new GetPageSubCategoriaController();
        req = {
            params: { pag: 1, limit: 10 }
        };
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
        jest.clearAllMocks();
    });

    it('should get a page of subcategories and return them', async () => {
        const subcategories = [
            { id: 1, nombre: 'Test SubCategoria 1', categoria_id: 1 },
            { id: 2, nombre: 'Test SubCategoria 2', categoria_id: 1 }
        ];
        const serviceResponse = {
            rows: subcategories,
            count: 2,
            totPag: 1
        };
        mockServiceInstance.execute.mockResolvedValue(serviceResponse);

        await controller.execute(req, res);

        expect(mockServiceInstance.execute).toHaveBeenCalledWith(1, 10);
        expect(res.json).toHaveBeenCalledWith({
            data: {
                data: subcategories,
                totReg: 2,
                rows: 2,
                pag: 1,
                totPag: 1
            }
        });
    });

    it('should use default pagination parameters if not provided', async () => {
        req.params = {};
        const subcategories = [
            { id: 1, nombre: 'Test SubCategoria 1', categoria_id: 1 }
        ];
        const serviceResponse = {
            rows: subcategories,
            count: 1,
            totPag: 1
        };
        mockServiceInstance.execute.mockResolvedValue(serviceResponse);

        await controller.execute(req, res);

        expect(mockServiceInstance.execute).toHaveBeenCalledWith(1, 10);
    });

    it('should handle errors and return an error response', async () => {
        const error = new Error('Test Error');
        error.code = 500;
        mockServiceInstance.execute.mockRejectedValue(error);
        const formattedError = { code: 500, message: 'Test Error' };
        handleError.mockReturnValue(formattedError);

        await controller.execute(req, res);

        expect(mockServiceInstance.execute).toHaveBeenCalledWith(1, 10);
        expect(handleError).toHaveBeenCalledWith(error);
        expect(res.status).toHaveBeenCalledWith(formattedError.code);
        expect(res.json).toHaveBeenCalledWith(formattedError);
    });
});