import request from 'supertest';
import { app } from '../../../src/index.js';
import { RolPermisosModel } from '../../../src/models/RolPermisosModel.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { RolModel } from '../../../src/models/RolModel.js';
import { PantallaModel } from '../../../src/models/PantallaModel.js';
import { AccionesPantallaModel } from '../../../src/models/AccionesPantallaModel.js';

describe('Integration Test: UpdateRolPermisosController', () => {
    let token;
    let rol;
    let pantalla;
    let accionesPantalla;
    let rolPermisos;

    const rolData = { nombre: 'TestRolForUpdate' };
    const pantallaData = { nombre: 'TestPantallaForUpdate', uri: '/test-update' };
    const accionesPantallaData = { permite_crear: true, permite_actualizar: true, permite_eliminar: true, permite_listar: true, permite_ver: true, acceso: true };
    const initialRolPermisosData = { crear: true, actualizar: true, eliminar: true, listar: true, ver: true };

    beforeEach(async () => {
        token = await TestAuthHelper.createUserAndLogin();
        
        rol = await RolModel.create(rolData);
        pantalla = await PantallaModel.create(pantallaData);
        
        const completeAccionesPantallaData = { ...accionesPantallaData, pantalla_id: pantalla.id };
        accionesPantalla = await AccionesPantallaModel.create(completeAccionesPantallaData);

        const completeRolPermisosData = { ...initialRolPermisosData, rol_id: rol.id, acciones_pantalla_id: accionesPantalla.id };
        rolPermisos = await RolPermisosModel.create(completeRolPermisosData);
    });

    afterEach(async () => {
        if (rolPermisos) {
            await RolPermisosModel.destroy({ where: { id: rolPermisos.id }, force: true });
        }
        if (accionesPantalla) {
            await AccionesPantallaModel.destroy({ where: { id: accionesPantalla.id }, force: true });
        }
        if (pantalla) {
            await PantallaModel.destroy({ where: { id: pantalla.id }, force: true });
        }
        if (rol) {
            await RolModel.destroy({ where: { id: rol.id }, force: true });
        }
    });

    it('debe actualizar un rolPermisos exitosamente', async () => {
        const updatedData = { 
            ...initialRolPermisosData,
            rol_id: rol.id, 
            acciones_pantalla_id: accionesPantalla.id,
            crear: false // Change one value
        };

        const response = await request(app)
            .put(`/api/v1/rol_permisos/${rolPermisos.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedData)
            .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('crear', false);
        expect(response.body.data).toHaveProperty('actualizar', true);
        expect(response.body.mensaje).toMatch(/(actualizado|creado)/);
    });

    it('debe retornar error si los datos son inválidos (falta un campo)', async () => {
        const invalidData = { 
            rol_id: rol.id, 
            acciones_pantalla_id: accionesPantalla.id,
            // Missing 'crear' and other boolean fields
        };

        const response = await request(app)
            .put(`/api/v1/rol_permisos/${rolPermisos.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(invalidData)
            .expect(400);
            
        expect(response.body).toHaveProperty('error', 'Error: Datos no válidos:');
        expect(response.body).toHaveProperty('details');
        expect(response.body.details).toContain("El campo 'crear' es obligatorio.");
    });
});