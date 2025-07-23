export const pantallaData = {
    "nombre": "PANTALLA TEST",
    "uri": "/pantalla/test"
};
export const recordData = {
    pantalla_id: null,
    permite_crear: true,
    permite_actualizar: false,
    permite_eliminar: false,
    permite_listar: true
};

export const createTestRecords = async (PantallaModel, AccionesPantallaModel, cant = 1) => {
    const recordsToCreate = [];
    const pantalla = await PantallaModel.create(pantallaData);

    for(let x = cant; x > 0; x--){
        const data = {
            ...recordData,
            pantalla_id: pantalla.id
        };
        recordsToCreate.push(data);
    }
    const records = await AccionesPantallaModel.bulkCreate(recordsToCreate);
    return records;
}