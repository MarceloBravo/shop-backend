import request from 'supertest';
import { app } from '../../../src/index.js';
import { sequelize } from '../../../config/database.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { ColorModel } from '../../../src/models/ColorModel.js';

describe('Integration Test: GetAllColorWithDeletedController', () => {
    let token;
    
    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
    });

    beforeEach(async () => {
        // Crear algunos colores de prueba, incluyendo uno eliminado
        await ColorModel.bulkCreate([
            { nombre: 'Active Color 1', valor: '#ACTIVE1' },
            { nombre: 'Active Color 2', valor: '#ACTIVE2' }
        ]);

        // Crear un color y luego eliminarlo lógicamente
        const deletedColor = await ColorModel.create({
            nombre: 'Deleted Color',
            valor: '#DELETED'
        });
        await deletedColor.destroy();
    });

    afterEach(async () => {
        // Limpiar todos los colores después de cada test
        await ColorModel.destroy({ where: {}, force: true });
    });

    it('should get all colors including deleted ones and return success response', async () => {

        const response = await request(app)
            .get('/api/v1/color/deleted')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

            const data = response.body.data;
            expect(Array.isArray(data)).toBe(true);
            expect(data.length).toBeGreaterThanOrEqual(3); // 2 activos + 1 eliminado
            
            // Verificar que incluye colores eliminados
            const hasDeletedColor = data.some(color => 
                color.nombre === 'Deleted Color' && color.deletedAt
            );
        expect(hasDeletedColor).toBe(true);
    });

    it('should return empty array when no colors exist', async () => {
        // Limpiar todos los colores
        await ColorModel.destroy({ where: {}, force: true });

        const response = await request(app)
            .get('/api/v1/color/deleted')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBe(0);
    });
}); 