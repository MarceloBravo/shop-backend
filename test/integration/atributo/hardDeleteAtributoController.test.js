import request from 'supertest';
import app from '../../appTest.js';
import { sequelize } from '../../../config/database.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { AtributosModel } from '../../../src/models/AtributosModel.js';

describe('Integration Test: HardDeleteAtributoController', () => {
    let token;
    let testAtributo;
    const deleteData = { nombre: 'Unidades', valor_string: null, valor_numerico: 3};
    
    beforeAll(async () => {
        token = global.testToken
    });

    beforeEach(async () => {
        // Crear un atributo de prueba antes de cada test
        testAtributo = await AtributosModel.create(deleteData);
    });

    afterEach(async () => {
        // Limpiar el atributo de prueba después de cada test
        await AtributosModel.destroy({ where: {}, force: true });
    });

    it('should hard delete a atributo and return success response', async () => {
        const response = await request(app)
            .delete(`/api/v1/atributo/${testAtributo.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
            
        expect(response.body).toHaveProperty('id');
        expect(parseInt(response.body.id)).toBe(testAtributo.id);

        // Verificar que el atributo fue eliminado completamente de la base de datos
        const deletedAtributo = await AtributosModel.findByPk(testAtributo.id, { paranoid: false });
        expect(deletedAtributo).toBeNull();
    });

    it('should return 404 when atributo does not exist', async () => {
        const response = await request(app)
            .delete('/api/v1/atributo/999999')
            .set('Authorization', `Bearer ${token}`)
            .expect(404);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Error: Registro no encontrado');
    });
}); 