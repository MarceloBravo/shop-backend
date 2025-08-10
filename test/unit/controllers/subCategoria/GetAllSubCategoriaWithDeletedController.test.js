import GetAllSubCategoriaWithDeletedController from '../../../../src/controllers/subCategoria/GetAllSubCategoriaWithDeletedController.js';
import GetAllSubCategoriaService from '../../../../src/services/subCategoria/GetAllSubCategoriaService.js';
import { handleError } from '../../../../src/shared/functions.js';

jest.mock('../../../../src/services/subCategoria/GetAllSubCategoriaService.js');
jest.mock('../../../../src/shared/functions.js');

describe('GetAllSubCategoriaWithDeletedController', () => {
    let controller;
    let req;
    let res;

    const mockServiceInstance = {
        execute: jest.fn(),
    };

    GetAllSubCategoriaService.mockImplementation(() => mockServiceInstance);

    beforeEach(() => {
        controller = new GetAllSubCategoriaWithDeletedController();
        req = {};
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
        jest.clearAllMocks();
    });

    it('should get all subcategories including deleted and return them', async () => {
        const subcategorias = [
            { id: 1, nombre: 'Test SubCategoria 1', categoria_id: 1, deletedAt: null },
            { id: 2, nombre: 'Test SubCategoria 2', categoria_id: 1, deletedAt: new Date() }
        ];
        mockServiceInstance.execute.mockResolvedValue(subcategorias);

        await controller.execute(req, res);

        expect(mockServiceInstance.execute).toHaveBeenCalledWith(false);
        expect(res.json).toHaveBeenCalledWith(subcategorias);
    });

    it('should handle errors and return an error response', async () => {
        const error = new Error('Test Error');
        error.code = 500;
        mockServiceInstance.execute.mockRejectedValue(error);
        const formattedError = { code: 500, message: 'Test Error' };
        handleError.mockReturnValue(formattedError);

        await controller.execute(req, res);

        expect(mockServiceInstance.execute).toHaveBeenCalledWith(false);
        expect(handleError).toHaveBeenCalledWith(error);
        expect(res.status).toHaveBeenCalledWith(formattedError.code);
        expect(res.json).toHaveBeenCalledWith(formattedError);
    });
});