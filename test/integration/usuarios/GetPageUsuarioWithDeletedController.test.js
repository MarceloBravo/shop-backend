import { app } from '../../../src/index.js';
import request from 'supertest';
import { sequelize } from '../../../config/database.js';
import { UsuarioModel } from '../../../src/models/UsuarioModel.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';

describe('GetPageUsuarioWithDeletedController', () => {
    let token;

    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
        await UsuarioModel.destroy({ 
            where: {}, 
            force: true 
        }); // Clear existing records
        
        try {
            // Create test data - 15 records
            const testData = Array.from({ length: 15 }, (_, i) => ({
                rut: `${i + 11111111}-${i + 1}`,
                nombres: `User ${i + 1}`,
                apellido1: `Apellido1_${i + 1}`,
                apellido2: `Apellido2_${i + 1}`,
                direccion: `123 Test St ${i + 1}`,
                fono: `12345678${i + 1}`,
                email: `user${i + 1}@example.com`,
                user_name: `testuser${i + 1}`,
                password: 'password123',
                rol_id: 1
            }));
            
            await UsuarioModel.bulkCreate(testData);

            // Soft delete some records
            await UsuarioModel.destroy({
                where: {
                    email: ['user1@example.com', 'user5@example.com', 'user10@example.com']
                }
            });
        } catch (error) {
            console.error('Error setting up test data:', error);
            throw error;
        }
    });

    afterAll(async () => {
        await UsuarioModel.destroy({ 
            where: {}, 
            force: true 
        }); // Clear existing records
        await sequelize.close();
    });

    it('should return paginated usuarios including deleted ones', async () => {
        const response = await request(app)
            .get('/api/v1/usuario/deleted/page/1/5')  // page 1, limit 5
            .set('Authorization', `Bearer ${token}`);
            
        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('rows', 5);
        expect(response.body.data).toHaveProperty('totReg', 15);
        expect(response.body.data).toHaveProperty('pag', 1);
        expect(response.body.data).toHaveProperty('totPag', 3);
        expect(response.body.data.data.length).toBe(5);
    });

    it('should include deleted items in results', async () => {
        const response = await request(app)
            .get('/api/v1/usuario/deleted/page/1/10')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        const deletedItems = response.body.data.data.filter(item => item.deleted_at !== null);
        expect(deletedItems.length).toBeGreaterThan(0);
    });

    it('should return correct page with specified limit', async () => {
        const response = await request(app)
            .get('/api/v1/usuario/deleted/page/2/3')  // page 2, limit 3
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.data.data.length).toBe(3);
    });

    it('should return empty array for page beyond available records', async () => {
        const response = await request(app)
            .get('/api/v1/usuario/deleted/page/10/5')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.data.data.length).toBe(0);
        expect(response.body.data.rows).toBe(0);
        expect(response.body.data.totReg).toBe(15);
    });

    it('should handle invalid page number', async () => {
        const response = await request(app)
            .get('/api/v1/usuario/deleted/page/-1/5')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Error: OFFSET must not be negative');
    });

    it('should handle invalid limit number', async () => {
        const response = await request(app)
            .get('/api/v1/usuario/deleted/page/1/-5')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Error: LIMIT must not be negative');
    });
});
