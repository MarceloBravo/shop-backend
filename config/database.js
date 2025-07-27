import dotenv from 'dotenv';
import Sequelize from 'sequelize';

// Configurar dotenv según el entorno - DEBE IR PRIMERO
const nodeEnv = process.env.NODE_ENV?.trim() || 'development';

//if (nodeEnv === 'test') {
//    dotenv.config({ path: './.env.test' });
//} else {
dotenv.config({ path: './.env' });
//}

const dbName = nodeEnv === 'test' ? process.env.DB_NAME_TEST : process.env.DB_NAME;
const dbUser = nodeEnv === 'test' ? process.env.DB_USER_TEST : process.env.DB_USER;
const dbPass = nodeEnv === 'test' ? process.env.DB_PASS_TEST : process.env.DB_PASS;
const dbHost = nodeEnv === 'test' ? process.env.DB_HOST_TEST : process.env.DB_HOST;
const dbPort = nodeEnv === 'test' ? process.env.DB_PORT_TEST : process.env.DB_PORT;

const dbJson = {
    host: dbHost,
    port: dbPort,
    dialect: 'postgres',
    //logging: nodeEnv !== 'test' ? console.log : false,
    logging: console.log,
};

export const sequelize = new Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    port: dbPort,
    dialect: 'postgres',
    logging: nodeEnv !== 'test' ? console.log : false,
});

export const waitForDb = async () => {
    let intentos=0;
    let conected = false;
    const maxIntentos = 20;

    while (!conected && intentos <= maxIntentos){
        try{
            intentos++;
            await sequelize.authenticate();
            conected = true;
            console.log('Conexión establecida con la base dedatos...');
        }catch(e){
            console.log(e.errors,`Esperando a base de datos. Intento ${intentos} de ${maxIntentos}`);
            await new Promise((res) => setTimeout(res, 3000));
        }
    }
}