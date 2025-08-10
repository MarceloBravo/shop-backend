import GetByIdSubCategoriaController from '../../../../src/controllers/subCategoria/GetByIdSubCategoriaController.js';
import GetByIdSubCategoriaService from '../../../../src/services/subCategoria/GetByIdSubCategoriaService.js';
import { handleError } from '../../../../src/shared/functions.js';

jest.mock('../../../../src/services/subCategoria/GetByIdSubCategoriaService.js');
jest.mock('../../../../src/shared/functions.js');

describe('GetByIdSubCategoriaController', () => {
    let controller;
    let req;
    let res;

    const mockServiceInstance = {
        execute: jest.fn(),
    };

    GetByIdSubCategoriaService.mockImplementation(() => mockServiceInstance);

    beforeEach(() => {
        controller = new GetByIdSubCategoriaController();
        req = {
            params: { id: 1 }
        };
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
        jest.clearAllMocks();
    });

    it('should get a subcategory by id and return it', async () => {
        const subcategoria = { id: 1, nombre: 'Test SubCategoria', categoria_id: 1 };
        mockServiceInstance.execute.mockResolvedValue(subcategoria);

        await controller.execute(req, res);

        expect(mockServiceInstance.execute).toHaveBeenCalledWith(req.params.id);
        expect(res.json).toHaveBeenCalledWith(subcategoria);
    });

    it('should return a 404 error if subcategory is not found', async () => {
        mockServiceInstance.execute.mockResolvedValue(null);

        await controller.execute(req, res);

        expect(mockServiceInstance.execute).toHaveBeenCalledWith(req.params.id);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ mensaje: 'Registro no encontrado' });
    });

    it('should handle errors and return an error response', async () => {
        const error = new Error('Test Error');
        error.code = 500;
        mockServiceInstance.execute.mockRejectedValue(error);
        const formattedError = { code: 500, message: 'Test Error' };
        handleError.mockReturnValue(formattedError);

        await controller.execute(req, res);

        expect(mockServiceInstance.execute).toHaveBeenCalledWith(req.params.id);
        expect(handleError).toHaveBeenCalledWith(error);
        expect(res.status).toHaveBeenCalledWith(formattedError.code);
        expect(res.json).toHaveBeenCalledWith(formattedError);
    });
});