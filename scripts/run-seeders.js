import rolSeeder from '../seeders/20250327121711-rol-seeder.js';
import usuarioSeeder from '../seeders/20250327124254-usuario-seeder.js';
import pantallaSeeder from '../seeders/20250327130144-pantalla-seeder.js';
import menuSeeder from '../seeders/20250327134722-menu-seeder.js';
import accionesPantallaSeeder from '../seeders/20250327143750-acciones_pantalla-seeder.js';
import rolPermisoSeeder from '../seeders/20250327150624-rol_permiso-seeder.js';
import tiendaMenuSeeder from '../seeders/20250329222237-tienda_menu-seeder.js';
import categoriasSeeder from '../seeders/20250330174204-categorias-seeder.js';

export async function runSeeders(sequelize) {
    try {
        console.log('Iniciando seeders...');
        
        // Ejecutar seeders en orden
        await rolSeeder.up(sequelize.getQueryInterface(), sequelize.constructor);
        console.log('✅ Roles creados');
        
        await usuarioSeeder.up(sequelize.getQueryInterface(), sequelize.constructor);
        console.log('✅ Usuarios creados');
        
        await pantallaSeeder.up(sequelize.getQueryInterface(), sequelize.constructor);
        console.log('✅ Pantallas creadas');
        
        await menuSeeder.up(sequelize.getQueryInterface(), sequelize.constructor);
        console.log('✅ Menús creados');
        
        await accionesPantallaSeeder.up(sequelize.getQueryInterface(), sequelize.constructor);
        console.log('✅ Acciones de pantalla creadas');
        
        await rolPermisoSeeder.up(sequelize.getQueryInterface(), sequelize.constructor);
        console.log('✅ Permisos de roles creados');
        
        await tiendaMenuSeeder.up(sequelize.getQueryInterface(), sequelize.constructor);
        console.log('✅ Menús de tienda creados');
        
        await categoriasSeeder.up(sequelize.getQueryInterface(), sequelize.constructor);
        console.log('✅ Categorías creadas');
        
        console.log('¡Todos los seeders se ejecutaron correctamente! 🚀');
    } catch (error) {
        console.error('Error ejecutando los seeders:', error);
        throw error;
    }
}


