/**
 * Analiza las asociaciones de los modelos de Sequelize para determinar el orden de creación correcto.
 * @param {object} db - El objeto de base de datos de Sequelize con todos los modelos cargados.
 * @returns {string[]} Un array de nombres de modelos en el orden en que deben ser sincronizados.
 */
export default function getModelsInOrder (db,dbModel){

    const allModels = {}; // Usar un objeto para búsqueda fácil: { modelName: model }
    const graph = {};     // Grafo de adyacencia: modelo -> [modelos que dependen de él]
    const inDegree = {};  // Grado de entrada: modelo -> número de dependencias

    // 1. Inicializar las estructuras de datos
    for (const modelName in db) {
        const model = db[modelName];
        if (model && model.prototype && model.prototype instanceof dbModel) {
            allModels[modelName] = model;
            graph[modelName] = [];
            inDegree[modelName] = 0;
        }
    }

    // 2. Construir el grafo de dependencias y contar los grados de entrada
    for (const modelName in allModels) {
        const model = allModels[modelName];
        const dependencies = new Set(); // Usar un Set para evitar dependencias duplicadas

        // Caso A: Dependencias definidas a través de asociaciones explícitas (ej: belongsTo)
        for (const assocName in model.associations) {
            const association = model.associations[assocName];
            if (association.associationType === 'BelongsTo') {
                const targetModel = association.target;
                const targetModelName = Object.keys(allModels).find(key => allModels[key] === targetModel);
                if (targetModelName) {
                    dependencies.add(targetModelName);
                }
            }
        }

        // Caso B: Dependencias definidas a través de la clave 'references' en los atributos
        const attributes = model.getAttributes();
        for (const attributeName in attributes) {
            const attribute = attributes[attributeName];
            if (attribute.references) {
                const targetTableName = typeof attribute.references === 'string' ? attribute.references : attribute.references.model;
                const targetModelName = Object.keys(allModels).find(key => allModels[key].tableName === targetTableName);
                if (targetModelName) {
                    dependencies.add(targetModelName);
                }
            }
        }

        // Añadir las dependencias encontradas al grafo
        for (const depName of dependencies) {
            graph[depName].push(modelName);
            inDegree[modelName]++;
        }
    }

    // 3. Ordenamiento Topológico
    const queue = Object.keys(allModels).filter(modelName => inDegree[modelName] === 0);
    const sortedOrder = [];

    while (queue.length > 0) {
        const currentModelName = queue.shift();
        sortedOrder.push(currentModelName);

        for (const dependentModel of graph[currentModelName]) {
            inDegree[dependentModel]--;
            if (inDegree[dependentModel] === 0) {
                queue.push(dependentModel);
            }
        }
    }

    // 4. Detección de dependencias circulares
    if (sortedOrder.length !== Object.keys(allModels).length) {
        const modelsInCycle = Object.keys(allModels).filter(m => !sortedOrder.includes(m));
        throw new Error(
            `Error: Se ha detectado una dependencia circular. No se puede determinar el orden de creación. Modelos involucrados: ${modelsInCycle.join(', ')}`
        );
    }

    return sortedOrder;
}