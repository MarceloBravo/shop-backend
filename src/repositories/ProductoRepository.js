import db from '../models/index.js'
import { sequelize } from '../../config/database.js';
import { Op } from 'sequelize';

const  ProductoModel = db.ProductoModel;


const include = [
        {
            association: 'atributos_producto',
            attributes: { exclude:['producto_id','atributo_id','tipo_dimension_id','createdAt', 'updatedAt', 'deleted_at'] },
            include: [
                {
                    association: 'atributo',
                    attributes: { exclude:['createdAt', 'updatedAt', 'deleted_at'] },
                }
            ]
        },
        {
            association: 'colores',
            attributes: { exclude:['producto_id','color_id','createdAt', 'updatedAt', 'deleted_at'] },
            include: [
                {
                    association: 'color',
                    attributes: { exclude:['createdAt', 'updatedAt', 'deleted_at'] },
                }
            ]
        },
        {
            association: 'dimensiones',
            attributes: { exclude:['producto_id','tipo_dimension_id','createdAt', 'updatedAt', 'deleted_at'] },
            include: [
                {
                    association: 'unidad_metrica',
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deleted_at'] },
                }
            ]
        },
        {
            association: 'materiales',
            attributes: { exclude:['producto_id','material_id','createdAt', 'updatedAt', 'deleted_at'] },
            include: [
                {
                    association: 'material',
                    attributes: { exclude:['createdAt', 'updatedAt', 'deleted_at'] },
                }
            ]
        },
        {
            association: 'tallas_letra',
            attributes: { exclude:['producto_id','talla_letra_id','createdAt', 'updatedAt', 'deleted_at'] },
            include: [
                {
                    association: 'talla',
                    attributes: { exclude:['createdAt', 'updatedAt', 'deleted_at'] },
                }
            ]
        },
        {
            association: 'tallas_numerica',
            attributes: { exclude:['producto_id','talla_numerica_id','createdAt', 'updatedAt', 'deleted_at'] },
            include: [
                {
                    association: 'talla',
                    attributes: { exclude:['createdAt', 'updatedAt', 'deleted_at'] },
                }
            ]
        },
        {
            association: 'pesos',
            attributes: { exclude: ['producto_id','tipo_dimension_id','createdAt', 'updatedAt', 'deleted_at'] },
            include: [
                {
                    association: 'unidad_metrica',
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deleted_at'] },
                }
            ]
        },
        {
            association: 'valoraciones',
            attributes: { exclude:['producto_id','estrellas','nombre','email','foto'] }
        },
        {
            association: 'subcategoria',
            attributes: { exclude: ['createdAt', 'updatedAt', 'deleted_at'] }
        },
        {
            association: 'marca',
            attributes: { exclude: ['createdAt', 'updatedAt', 'deleted_at'] }
        },
        {
            association: 'genero',
            attributes: { exclude: ['createdAt', 'updatedAt', 'deleted_at'] }
        }
    ];


const query = `SELECT
                    SKU,
                    NOMBRE,
                    DESCRIPCION,
                    SUB_CATEGORIA_ID,
                    GENERO_ID,
                    MARCA_ID,
                    PRECIO,
                    (SELECT json_agg(th)
                        FROM (SELECT ap.id, a.nombre, a.valor_string, a.valor_numerico
                                FROM public.atributos_producto ap 
                                INNER JOIN public.atributos a ON ap.atributo_id = a.id 
                                WHERE ap.producto_id = p.id
                        ) th
                    ) as atributos,
                    cp.color_id,
                    (SELECT row_to_json(dim) 
                        FROM (SELECT alto, ancho, profundo, tipo_dimension_id 
                                FROM public.dimensiones_producto 
                                WHERE producto_id = p.id
                        ) dim 
                    ) as dimensiones,
                    mp.material_id, 
                    tlp.talla_letra_id,  
                    tnp.talla_numerica_id, 
                    (SELECT row_to_json(qry) 
                        FROM (SELECT peso.peso, tipo_dimension_id 
                                FROM public.peso
                                WHERE peso.producto_id = p.id 
                        ) qry 
                    ) as peso 
                FROM
                    PUBLIC.PRODUCTOS p 
                LEFT JOIN public.color_producto cp ON p.id = cp.producto_id 
                LEFT JOIN public.material_producto mp ON p.id = mp.producto_id
                LEFT JOIN public.talla_letra_producto tlp ON p.id = tlp.producto_id 
                LEFT JOIN public.talla_numerica_producto tnp ON p.id = tnp.producto_id 
                LEFT JOIN public.peso ps ON p.id = ps.producto_id 
                WHERE
                    p.ID = :id;`

class ProductoRepository {
    constructor(){
        this.include = include;
        this.query = query; 
    }

    findById = async (id, paranoid = true, transaction = null) => {
        const data = await ProductoModel.findByPk(id, {include: this.include, paranoid, transaction });
        return data;
    }

    getById = async (id, paranoid = true, transaction = null) => {
        const data = await ProductoModel.findByPk(id, {include: this.include, paranoid, transaction});
        return data;
    }


    getAll = async (paranoid = true, filter = {}, orderBy = [['nombre', 'ASC']]) => {
        const { rows, count } = await ProductoModel.findAndCountAll({
            order: orderBy,
            include: this.include,
            paranoid,
            where: filter
        },);
        return {data: rows, count};
    }


    getPage = async (desde = 1, regPorPag = 10, paranoid = true, filter = null, orderBy = [['nombre', 'ASC']]) => {
        const { rows , count } = await ProductoModel.findAndCountAll({
            offset:desde,
            limit: regPorPag,
            order: orderBy,
            include: this.include,
            paranoid,
            where: filter ? this.filterConfig(filter) : {}
        });        
        return {rows, count, totPag: Math.ceil(count / regPorPag)};
    }


    filterConfig = (filter) => {
        const search = `%${filter}%`;
        return {
            [Op.or]: [
                { nombre: { [Op.like]: search } },
                { descripcion: { [Op.like]: search } }
            ]
        };
    }


    create = async (data, transaction) => {
        const result = await ProductoModel.create(data, {transaction});
        return result;
    }


    update = async (id, data, transaction) => {
        let [ record, created ] = await ProductoModel.findOrCreate({where:{id}, defaults: data, transaction});
        if(created) return {data: producto, created};
        if(record.deleted_at !== null) {
            await record.restore({transaction});
            created = true;
        }
        // Si el registro ya existe, actualiza los valores
        record.sku        = data.sku;
        record.nombre        = data.nombre;
        record.descripcion   = data.descripcion;
        record.sub_categoria_id = data.sub_categoria_id;
        record.genero_id     = data.genero_id;
        record.precio        = data.precio;

        await record.save();

        return {data: record, created};
    }


    hardDelete = async (id, transaction) => {
        const result = await ProductoModel.destroy({where: {id}, transaction, force: true, paranoid: false});
        return {id, result};
    }


    softDelete = async (id, transaction = null) => {
        const result = await ProductoModel.destroy({where: {id},transaction});
        return {id, result};
    }


    selectQuery = async (id) => {
        const [results] = await sequelize.query(query,
        {
            replacements: { id },
            type: sequelize.QueryTypes.SELECT
        });
        
        return results ?? null;
    };
}

export default ProductoRepository;  