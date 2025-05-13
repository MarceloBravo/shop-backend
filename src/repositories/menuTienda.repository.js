import { MenuTiendaModel } from "../../models/MenuTiendaModel.js";

export const getMenuTienda = async (id) => {
    const data = await MenuTiendaModel.findByPk(id);
    return (data && data.deleted_at == null) ? data : null;
}


export const getAllMenuTienda = async () => {
    const { rows, count } = await MenuTiendaModel.findAndCountAll({
        where: {deleted_at: null},
        order: [['nombre','ASC']]
    });
    return {data: rows, count};
}


export const getPageMenuTienda = async (desde = 1, regPorPag = 10) => {
    const { rows , count } = await MenuTiendaModel.findAndCountAll({
        where: {deleted_at: null},
        offset:desde,
        limit: regPorPag,
        order: [['nombre','ASC']]
    });    
    return {rows, count, totPag: Math.ceil(count / regPorPag)};
}


export const createMenuTienda = async (valor) => {
    const data = await MenuTiendaModel.create(valor);
    return data;
}


export const updateMenuTienda = async (id, data) => {
    const [ menu, created ] = await MenuTiendaModel.findOrCreate({where:{id}, defaults: data});
    if(created) return {data: menu, created};
    // Si el registro ya existe, actualiza los valores
    menu.nombre = data.nombre;
    menu.icono = data.icono;
    menu.menu_padre_id = data.menu_padre_id;
    menu.uri = data.uri;
    menu.posicion = data.posicion;
    menu.pantalla_id = data.pantalla_id;
    menu.deleted_at = null;

    await menu.save();

    return {data: menu, created};
}


export const deleteMenuTienda = async (id) => {
    const result = await MenuTiendaModel.destroy({where: {id}});
    return {id, result};
}


export const softDeleteMenuTienda = async (id) => {
    const record = await MenuTiendaModel.findByPk(id);
    const eliminado = (record && record.deleted_at !== null);
    
    if(eliminado === null || eliminado === true)return null;

    record.deleted_at = new Date();
    await record.save();
    return record;
}
