import { CategoriaModel } from '../../../../src/models/CategoriaModel.js';
import { SubCategoriaModel } from '../../../../src/models/SubCategoriaModel.js';
import { GeneroModel } from '../../../../src/models/GeneroModel.js';
import { MarcaModel } from '../../../../src/models/MarcaModel.js';

export const createRelatedTestDataProducto = async () => {
    await destroyRelatedTestDataProducto();
    
    const categoria = await CategoriaModel.create({
        nombre: 'Categoria Test',
        descripcion: 'Descripcion de la categoria test' 
    });
    const subCategoria = await SubCategoriaModel.create({
        nombre: 'SubCategoria Test',
        categoria_id: categoria.id
    });
    const genero = await GeneroModel.create({
        genero: 'Masculino'
    });
    const marca = await MarcaModel.create({
        nombre: 'Marca Test',
        logo: 'http://example.com/logo.jpg'
    });

    return {
        categoria,
        subCategoria,
        genero,
        marca
    };
}


export const destroyRelatedTestDataProducto = async () => {
    await SubCategoriaModel.destroy({ where: {}, force: true });
    await CategoriaModel.destroy({ where: {}, force: true });
    await MarcaModel.destroy({ where: {}, force: true });
    await GeneroModel.destroy({ where: {}, force: true });
}