/*------------------------------------------------------------------*
 * environment.js											    	*
 *																	*
 * Historico:	07/12/2021	Primer version							*
 *																	*
 * Parametros de Configuracion                                      *
 *------------------------------------------------------------------*/

const dotenv = require('dotenv');

dotenv.config();

const configParams = {
    dbHost     : process.env.DB_HOST,
    dbPort     : process.env.DB_PORT,
    dbUser     : process.env.DB_USER,
    dbPassword : process.env.DB_PASS,
    dbName     : process.env.DB_NAME,
    backListenPort : process.env.BACK_LISTEN_PORT,
    dbPoolMaxConn : process.env.DB_POOL_MAX_CONN
}

module.exports = configParams;