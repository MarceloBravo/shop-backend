//import app from '../../../src/app.js';
import app from '../../appTest.js';
import request from 'supertest';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { UsuarioModel } = db;

describe('UpdateUsuarioController', () => {
    let testUsuario;
    let token;

    beforeAll(async () => {
        await UsuarioModel.destroy({ 
            where: {}, 
            force: true 
        }); // Clear existing records
        token = await createUserAndLogin();
        
        try {
            // Create test data
            testUsuario = await UsuarioModel.create({
                rut: '11111111-1',
                nombres: 'Test User',
                apellido1: 'Apellido1',
                apellido2: 'Apellido2',
                direccion: '123 Test St',
                fono: '123456789',
                email: 'test@example.com',
                user_name: 'testuser',
                password: 'password123',
                rol_id: 1
            });
        } catch (error) {
            console.error('Error creating test data:', error);
            throw error;
        }
    });

    afterAll(async () => {
        await UsuarioModel.destroy({ 
            where: {}, 
            force: true 
        }); // Clear existing records
        //await sequelize.close();
    });

    it('should update usuario', async () => {
        const updateData = {
            rut: '22222222-2',
            nombres: 'Updated User',
            apellido1: 'UpdatedApellido1',
            apellido2: 'UpdatedApellido2',
            direccion: '456 Updated St',
            fono: '987654321',
            email: 'updated@example.com',
            user_name: 'updateduser',
            password: 'newpassword123',
            rol_id: 2
        };

        const response = await request(app)
            .put(`/api/v1/usuario/${testUsuario.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updateData);
            
        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('id', testUsuario.id);
        expect(response.body.data).toHaveProperty('nombres', updateData.nombres);
        expect(response.body.data).toHaveProperty('email', updateData.email);
        expect(response.body.mensaje).toBe('Registro actualizado exitosamente.');

        // Verify in database
        const updated = await UsuarioModel.findByPk(testUsuario.id);
        expect(updated.nombres).toBe(updateData.nombres);
        expect(updated.email).toBe(updateData.email);
    });

    it('should return 404 for non-existent id', async () => {
        const response = await request(app)
            .put('/api/v1/usuario/999999')
            .set('Authorization', `Bearer ${token}`)
            .send({
                rut: '33333333-3',
                nombres: 'New User',
                apellido1: 'NewApellido1',
                apellido2: 'NewApellido2',
                direccion: '789 New St',
                fono: '555666777',
                email: 'new@example.com',
                user_name: 'newuser',
                password: 'password123',
                rol_id: 1
            });
            
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Error: El usuario no existe.');
    });

    it('should not allow update without authentication', async () => {
        const response = await request(app)
            .put(`/api/v1/usuario/${testUsuario.id}`)
            .send({
                rut: '44444444-4',
                nombres: 'Unauthorized Update',
                apellido1: 'UnauthorizedApellido1',
                apellido2: 'UnauthorizedApellido2',
                direccion: '999 Unauthorized St',
                fono: '111222333',
                email: 'unauthorized@example.com',
                user_name: 'unauthorizeduser',
                password: 'password123',
                rol_id: 1
            });

        expect(response.status).toBe(403);
    });

    it('should return error when required fields are missing', async () => {
        const response = await request(app)
            .put(`/api/v1/usuario/${testUsuario.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({});
            
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Error: Datos no válidos:');
    });

    it('should return error for duplicate email', async () => {
        // Create another user first
        await UsuarioModel.create({
            rut: '44444444-4',
            nombres: 'Other User',
            apellido1: 'OtherApellido1',
            apellido2: 'OtherApellido2',
            direccion: '321 Other St',
            fono: '999888777',
            email: 'other@example.com',
            user_name: 'otheruser',
            password: 'password123',
            rol_id: 1
        });

        const response = await request(app)
            .put(`/api/v1/usuario/${testUsuario.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                rut: '55555555-5',
                nombres: 'Test User',
                apellido1: 'TestApellido1',
                apellido2: 'TestApellido2',
                direccion: '555 Test St',
                fono: '444555666',
                email: 'other@example.com', // Trying to use existing email
                user_name: 'testuser2',
                password: 'password123',
                rol_id: 1
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });
});
