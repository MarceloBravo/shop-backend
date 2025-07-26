
import { sequelize } from './database.js';

export const waitForDb = async (maxIntentos = 10) => {
    let intentos=0;

    try{
        while (intentos <= 10){
            intentos++;
            await sequelize.autenticate();
            console.log('Conexión establecida con la base dedatos...');
            await sequelize.close();
        }
    }catch(e){
        console.log(`Esperando a base de datos. Intento ${intentos} de ${maxIntentos}`);
        await new Promise((res) => setTimeout(3000))
    }
    return sequelize;
}