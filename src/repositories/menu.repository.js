import { MenuModel } from "../../models/MenuModel.js";

export const getMenu = async (id) => {
    const data = await MenuModel.findByPk(id);
    return (data && data.deleted_at == null) ? data : null;
}


export const getAllMenu = async () => {
    const { rows, count } = await MenuModel.findAndCountAll({
        where: {deleted_at: null},
        order: [['nombre','ASC']]
    });
    return {data: rows, count};
}


export const getPageMenu = async (desde = 1, regPorPag = 10) => {
    const { rows , count } = await MenuModel.findAndCountAll({
        where: {deleted_at: null},
        offset:desde,
        limit: regPorPag,
        order: [['nombre','ASC']]
    });    
    return {rows, count, totPag: Math.ceil(count / regPorPag)};
}


export const createMenu = async (valor) => {
    const data = await MenuModel.create(valor);
    return data;
}


export const updateMenu = async (id, data) => {
    const [ menu, created ] = await MenuModel.findOrCreate({where:{id}, defaults: data});
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


export const deleteMenu = async (id) => {
    const result = await MenuModel.destroy({where: {id}});
    return {id, result};
}


export const softDeleteMenu = async (id) => {
    const record = await MenuModel.findByPk(id);
    const eliminado = (record && record.deleted_at !== null);
    
    if(eliminado === null || eliminado === true)return null;

    record.deleted_at = new Date();
    await record.save();
    return record;
}
