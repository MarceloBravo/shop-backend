import { AtributosModel } from "../../models/AtributosModel.js";
import { AtributosProductoModel } from "../../models/AtributosProductoModel.js";
import { ColorModel } from "../../models/ColorModel.js";
import { ColorProductoModel } from "../../models/ColorProductoModel.js";
import { DimensionesProductoModel } from "../../models/DimensionesProductoModel.js";
import { MaterialModel } from "../../models/MaterialModel.js";
import { MaterialProductoModel } from "../../models/MaterialProductoModel.js";
import { PesoProductoModel } from "../../models/PesoProductoModel.js";
import { ProductoModel } from "../../models/ProductoModel.js";
import { TallaLetraModel } from "../../models/TallaLetraModel.js";
import { TallaLetraProductoModel } from "../../models/TallaLetraProductoModel.js";
import { TallaNumericaModel } from "../../models/TallaNumericaModel.js";
import { TallaNumericaProductoModel } from "../../models/TallaNumericaProductoModel.js";
import { TipoDimensionesModel } from "../../models/TipoDimensionesModel.js";
import { sequelize } from '../../config/database.js';
import { ValoracionProductoModel } from "../../models/ValoracionProductoModel.js";

const include = [
        {
            model: AtributosProductoModel,
            attributes: { exclude:['producto_id','atributo_id','tipo_dimension_id','createdAt', 'updatedAt', 'deleted_at'] },
            include: [
                {
                    model: AtributosModel,
                    attributes: { exclude:['createdAt', 'updatedAt', 'deleted_at'] },
                }
            ]
        },
        {
            model: ColorProductoModel,
            as: 'colores',
            attributes: { exclude:['producto_id','color_id','color_id','createdAt', 'updatedAt', 'deleted_at'] },
            include: [
                {
                    model: ColorModel,
                    as: 'color',
                    attributes: { exclude:['createdAt', 'updatedAt', 'deleted_at'] },
                }
            ]
        },
        {
            model: DimensionesProductoModel,
            attributes: { exclude:['producto_id','tipo_dimension_id','createdAt', 'updatedAt', 'deleted_at'] },
            include: [
                {
                    model: TipoDimensionesModel,
                    as: 'unidad_metrica',                            
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deleted_at'] },
                }
            ]
        },
        {
            model: MaterialProductoModel,
            attributes: { exclude:['producto_id','material_id','createdAt', 'updatedAt', 'deleted_at'] },
            include: [
                {
                    model: MaterialModel,
                    attributes: { exclude:['createdAt', 'updatedAt', 'deleted_at'] },
                }
            ]
        },
        {
            model: TallaLetraProductoModel,
            attributes: { exclude:['producto_id','talla_letra_id','createdAt', 'updatedAt', 'deleted_at'] },
            include: [
                {
                    model: TallaLetraModel,
                    attributes: { exclude:['createdAt', 'updatedAt', 'deleted_at'] },
                }
            ]
        },
        {
            model: TallaNumericaProductoModel,
            attributes: { exclude:['producto_id','talla_numerica_id','createdAt', 'updatedAt', 'deleted_at'] },
            include: [
                {
                    model: TallaNumericaModel,
                    attributes: { exclude:['createdAt', 'updatedAt', 'deleted_at'] },
                }
            ]
        },
        {
            model: PesoProductoModel,
            attributes: { exclude: ['producto_id','tipo_dimension_id','createdAt', 'updatedAt', 'deleted_at'] },
            include: [
                {
                    model: TipoDimensionesModel,
                    as: 'unidad_metrica',
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deleted_at'] },
                }
            ]
        },
        {
            model: ValoracionProductoModel,
            attributes: { exclude:['producto_id','estrellas','nombre','email','foto'] }
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

// ************************ Métodos ************************
export const getProducto = async (id) => {
    const data = await ProductoModel.findByPk(id, {include});
    return (data && data.deleted_at == null) ? data : null;
}


export const getAllProducto = async (orderBy = [['nombre', 'ASC']]) => {
    const { rows, count } = await ProductoModel.findAndCountAll({
        where: {deleted_at: null},
        order: orderBy,
        include
    },);
    return {data: rows, count};
}


export const getPageProducto = async (desde = 1, regPorPag = 10, orderBy = [['nombre', 'ASC']]) => {
    const { rows , count } = await ProductoModel.findAndCountAll({
        where: {deleted_at: null},
        offset:desde,
        limit: regPorPag,
        order: orderBy,
        include
    });    
    return {rows, count, totPag: Math.ceil(count / regPorPag)};
}


export const createProducto = async (data, transaction) => {
    const result = await ProductoModel.create(data, {transaction});
    return result;
}


export const updateProducto = async (id, data, transaction) => {
    const [ record, created ] = await ProductoModel.findOrCreate({where:{id}, defaults: data, transaction});
    if(created) return {data: producto, created};
    // Si el registro ya existe, actualiza los valores
    record.sku        = data.sku;
    record.nombre        = data.nombre;
    record.descripcion   = data.descripcion;
    record.sub_categoria_id = data.sub_categoria_id;
    record.genero_id     = data.genero_id;
    record.precio        = data.precio;
    record.deleted_at    = null;

    await record.save();

    return {data: record, created};
}


export const deleteProducto = async (id, transaction) => {
    const result = await ProductoModel.destroy({where: {id}},{transaction});
    return {id, result};
}


export const softDeleteProducto = async (id) => {
    const record = await ProductoModel.findByPk(id);
    const eliminado = (record && record.deleted_at !== null);
    
    if(eliminado === null || eliminado === true)return null;

    record.deleted_at = new Date();
    await record.save();
    return record;
}


export const getProductoQuery = async (id) => {
    const [results, metadata] = await sequelize.query(query,
      {
        replacements: { id },
        type: sequelize.QueryTypes.SELECT
      }
    );
    
    return results ?? null;
  };