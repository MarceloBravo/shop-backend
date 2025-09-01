import request from 'supertest';
import app from '../../appTest.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const  { RolPermisosModel, RolModel, PantallaModel, AccionesPantallaModel } = db;

describe('Integration Test: GetAllRolPermisosController', () => {
    let token;
    const rol = { nombre: 'Administrador'};
    const pantalla = { nombre: 'Dashboard', uri: '/dashboard'};
    const ACCIONES_PANTALLA_DATA = { pantalla_id: null, permite_crear: true, permite_actualizar: true, permite_eliminar: true, permite_listar: true, permite_ver: true, acceso: true };
    const ROL_PERMISOS_DATA = { rol_id: null, acciones_pantalla_id: null, crear: true, actualizar: true, eliminar: true, listar: true, ver: true };

    beforeAll(async () => {
        token = await createUserAndLogin();
        ACCIONES_PANTALLA_DATA.pantalla_id = (await PantallaModel.create(pantalla)).id;        
        ROL_PERMISOS_DATA.rol_id = (await RolModel.create(rol)).id;
        ROL_PERMISOS_DATA.acciones_pantalla_id = (await AccionesPantallaModel.create(ACCIONES_PANTALLA_DATA)).id;
        await RolPermisosModel.create(ROL_PERMISOS_DATA);
        //console.log('Datos de prueba creados:', ROL_PERMISOS_DATA);
    });

    afterAll(async () => {
        await RolPermisosModel.destroy({ where: { rol_id: ROL_PERMISOS_DATA.rol_id, acciones_pantalla_id: ROL_PERMISOS_DATA.acciones_pantalla_id }, force: true });
        await RolModel.destroy({ where: { id: ROL_PERMISOS_DATA.rol_id }, force: true });
        await AccionesPantallaModel.destroy({ where: { id: ROL_PERMISOS_DATA.acciones_pantalla_id }, force: true });
        await PantallaModel.destroy({ where: { id: ACCIONES_PANTALLA_DATA.pantalla_id }, force: true });
        //console.log('Datos de prueba eliminados');
    });

    it('debe listar los permisos por roles', async () => {
        const response = await request(app)
            .get('/api/v1/rol_permisos')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
            
        expect(response.body).toHaveProperty('data');
        expect(Array.isArray(response.body.data)).toBe(true);
        const found = response.body.data.find(r => r.rol_id === ROL_PERMISOS_DATA.rol_id && r.acciones_pantalla_id === ROL_PERMISOS_DATA.acciones_pantalla_id);
        expect(found).toBeDefined();
    });
}); 