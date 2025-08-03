import request from 'supertest';
import { app } from '../../../src/index.js';
import { sequelize } from '../../../config/database.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { MarcaModel } from '../../../src/models/MarcaModel.js';

describe('Integration Test: GetAllMarcaWithDeletedController', () => {
    let token;
    
    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
    });

    beforeEach(async () => {
        // Crear algunas marcas de prueba, incluyendo una eliminada
        await MarcaModel.bulkCreate([
            { nombre: 'Nike', logo: 'path/to/nike.png' },
            { nombre: 'Adidas', logo: 'path/to/adidas.png' },
        ]);

        // Crear una marca y luego eliminarla lógicamente
        const deletedMarca = await MarcaModel.create({
            nombre: 'Puma',
            logo: 'path/to/puma.png'
        });
        await deletedMarca.destroy();
    });

    afterEach(async () => {
        // Limpiar todas las marcas después de cada test
        await MarcaModel.destroy({ where: {}, force: true });
    });

    it('should get all marcas including deleted ones and return success response', async () => {

        const response = await request(app)
            .get('/api/v1/marca/deleted')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

            const data = response.body.data;
            expect(Array.isArray(data)).toBe(true);
            expect(data.length).toBeGreaterThanOrEqual(3); // 2 activas + 1 eliminada
            
            // Verificar que incluye marcas eliminadas
            const hasDeletedMarca = data.some(marca => marca.deletedAt );
        expect(hasDeletedMarca).toBe(true);
    });

    it('should return empty array when no marcas exist', async () => {
        // Limpiar todas las marcas
        await MarcaModel.destroy({ where: {}, force: true });

        const response = await request(app)
            .get('/api/v1/marca/deleted')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBe(0);
    });
}); 