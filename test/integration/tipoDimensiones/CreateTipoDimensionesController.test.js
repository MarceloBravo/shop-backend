import app from '../../appTest.js';
import request from 'supertest';
import { sequelize } from '../../../config/database.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { TipoDimensionesModel } from '../../../src/models/TipoDimensionesModel.js';

describe('CreateTipoDimensionesController', () => {
    let token;

    beforeAll(async () => {
        await TipoDimensionesModel.destroy({ where: {} }); // Clear existing records
        token = global.testToken
    });
    
    afterAll(async () => {
        await TipoDimensionesModel.destroy({ where: {} }); // Clear existing records
        //await sequelize.close();
    });
    
    it('should create a new tipo dimension', async () => {
        const tipoDimensionData = {
            nombre: 'Peso',
            nombre_corto: 'Kg'
        };

        const response = await request(app)
            .post('/api/v1/tipo_dimensiones')
            .set('Authorization', `Bearer ${token}`)
            .send(tipoDimensionData);
            
        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('id');
        expect(response.body.data.nombre).toBe(tipoDimensionData.nombre);
        expect(response.body.data.nombre_corto).toBe(tipoDimensionData.nombre_corto);
        expect(response.body.mensaje).toBe('El registro ha sido creado exitosamente.');
    });

    it('should return error when nombre is missing', async () => {
        const tipoDimensionData = {
            nombre_corto: 'Kg'
        };

        const response = await request(app)
            .post('/api/v1/tipo_dimensiones')
            .set('Authorization', `Bearer ${token}`)
            .send(tipoDimensionData);

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Error: Datos no válidos:');
        expect(response.body.details[0]).toBe('El campo nombre es obligatorio y debe tener un máximo de hasta 30 carácteres.');
    });

    it('should return error when nombre_corto is missing', async () => {
        const tipoDimensionData = {
            nombre: 'Peso'
        };

        const response = await request(app)
            .post('/api/v1/tipo_dimensiones')
            .set('Authorization', `Bearer ${token}`)
            .send(tipoDimensionData);

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Error: Datos no válidos:');
        expect(response.body.details[0]).toBe('El campo nombre_corto es obligatorio y debe tener un máximo de hasta 10 carácteres.');
    });

    it('should return error when trying to create duplicate nombre', async () => {
        const tipoDimensionData = {
            nombre: 'Peso',
            nombre_corto: 'Lb'
        };

        const response = await request(app)
            .post('/api/v1/tipo_dimensiones')
            .set('Authorization', `Bearer ${token}`)
            .send(tipoDimensionData);
            
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Error: Ya existe un tipo de dimensión con ese nombre');
    });
});
