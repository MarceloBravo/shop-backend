import GetAllSubCategoriaController from '../../../../src/controllers/subCategoria/GetAllSubCategoriaController.js';
import GetAllSubCategoriaService from '../../../../src/services/subCategoria/GetAllSubCategoriaService.js';
import { handleError } from '../../../../src/shared/functions.js';

jest.mock('../../../../src/services/subCategoria/GetAllSubCategoriaService.js');
jest.mock('../../../../src/shared/functions.js');

describe('GetAllSubCategoriaController', () => {
    let controller;
    let req;
    let res;

    const mockServiceInstance = {
        execute: jest.fn(),
    };

    GetAllSubCategoriaService.mockImplementation(() => mockServiceInstance);

    beforeEach(() => {
        controller = new GetAllSubCategoriaController();
        req = {};
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
        jest.clearAllMocks();
    });

    it('should get all subcategories and return them', async () => {
        const subcategorias = [
            { id: 1, nombre: 'Test SubCategoria 1', categoria_id: 1 },
            { id: 2, nombre: 'Test SubCategoria 2', categoria_id: 1 }
        ];
        mockServiceInstance.execute.mockResolvedValue(subcategorias);

        await controller.execute(req, res);

        expect(mockServiceInstance.execute).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(subcategorias);
    });

    it('should handle errors and return an error response', async () => {
        const error = new Error('Test Error');
        error.code = 500;
        mockServiceInstance.execute.mockRejectedValue(error);
        const formattedError = { code: 500, message: 'Test Error' };
        handleError.mockReturnValue(formattedError);

        await controller.execute(req, res);

        expect(mockServiceInstance.execute).toHaveBeenCalled();
        expect(handleError).toHaveBeenCalledWith(error);
        expect(res.status).toHaveBeenCalledWith(formattedError.code);
        expect(res.json).toHaveBeenCalledWith(formattedError);
    });
});