import request from 'supertest';
import app from '../../appTest.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const  { RolPermisosModel, RolModel, PantallaModel, AccionesPantallaModel } = db;


describe('Integration Test: CreateRolPermisosController', () => {
    let token;
    let rol;
    let pantalla;
    let accionesPantalla;
    let rolPermisosData;

    beforeEach(async () => {
        token = await createUserAndLogin();
        rol = await RolModel.create({ nombre: 'AdministradorTest' });
        pantalla = await PantallaModel.create({ nombre: 'DashboardTest', uri: '/dashboard-test' });
        
        const accionesPantallaData = {
            pantalla_id: pantalla.id,
            permite_crear: true,
            permite_actualizar: true,
            permite_eliminar: true,
            permite_listar: true,
            permite_ver: true,
            acceso: true
        };
        accionesPantalla = await AccionesPantallaModel.create(accionesPantallaData);

        rolPermisosData = {
            rol_id: rol.id,
            acciones_pantalla_id: accionesPantalla.id,
            crear: true,
            actualizar: true,
            eliminar: true,
            listar: true,
            ver: true
        };
    });

    afterEach(async () => {
        if (rolPermisosData) {
            await RolPermisosModel.destroy({ where: {}, force: true });
        }
        if (accionesPantalla) {
            await AccionesPantallaModel.destroy({ where: {}, force: true });
        }
        if (pantalla) {
            await PantallaModel.destroy({ where: {}, force: true });
        }
        if (rol) {
            await RolModel.destroy({ where: { id: rol.id }, force: true });
        }
    });


    it('debe crear un nuevo rolPermisos y retornar respuesta exitosa', async () => {
        const response = await request(app)
            .post('/api/v1/rol_permisos')
            .set('Authorization', `Bearer ${token}`)
            .send(rolPermisosData)
            .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('id');
        expect(response.body.data).toHaveProperty('rol_id');
        expect(response.body.data.rol_id).toBe(rolPermisosData.rol_id);
        expect(response.body.mensaje).toBe('El registro ha sido creado exitosamente.');
    });


    it('debe retornar error si los datos son inválidos', async () => {
        const invalidData = { rol_id: null, acciones_pantalla_id: null, crear: null, actualizar: null, eliminar: null, listar: null, ver: null };
        const response = await request(app)
            .post('/api/v1/rol_permisos')
            .set('Authorization', `Bearer ${token}`)
            .send(invalidData)
            .expect(400);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Datos no válidos');
    });

}); 