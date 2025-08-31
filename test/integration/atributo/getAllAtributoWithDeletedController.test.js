import request from 'supertest';
import app from '../../appTest.js';
import { sequelize } from '../../../config/database.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { AtributosModel } from '../../../src/models/AtributosModel.js';

describe('Integration Test: GetAllAtributoWithDeletedController', () => {
    let token;
    const dataAtributos = [
            { nombre: 'Peso', valor_string: 'Kilogramos', valor_numerico: 1.3 },
            { nombre: 'Temporada', valor_string: 'Verano', valor_numerico: null },
        ];
        const deleteData = { nombre: 'Unidades', valor_string: null, valor_numerico: 3};
    
    beforeAll(async () => {
        token = global.testToken
    });

    beforeEach(async () => {
        // Crear algunos atributos de prueba, incluyendo uno eliminado
        await AtributosModel.bulkCreate(dataAtributos);

        // Crear un atributo y luego eliminarlo lógicamente
        const deletedAtributo = await AtributosModel.create(deleteData);
        await deletedAtributo.destroy();
    });

    afterEach(async () => {
        // Limpiar todos los atributoes después de cada test
        await AtributosModel.destroy({ where: {}, force: true });
    });

    it('should get all atributos including deleted ones and return success response', async () => {

        const response = await request(app)
            .get('/api/v1/atributo/deleted')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

            const data = response.body.data;
            expect(Array.isArray(data)).toBe(true);
            expect(data.length).toBeGreaterThanOrEqual(3); // 2 activos + 1 eliminado
            
            // Verificar que incluye atributoes eliminados
            const hasDeletedAtributo = data.some(atributo => 
                atributo.deletedAt !== null
            );
        expect(hasDeletedAtributo).toBe(true);
    });

    it('should return empty array when no atributos exist', async () => {
        // Limpiar todos los atributoes
        await AtributosModel.destroy({ where: {}, force: true });

        const response = await request(app)
            .get('/api/v1/atributo/deleted')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBe(0);
    });
}); 