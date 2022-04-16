/*------------------------------------------------------------------*
 * mysql-connector.js												*
 *																	*
 * Historico:	15/04/2022	Primer version							*
 *																	*
 * Implementa conexion a dB                                         *
 *------------------------------------------------------------------*/

var mysql           = require('mysql');
const logger        = require('./logger');          
const configParams  = require('./enviroment')

// Pool de conexiones
var cpool = mysql.createPool({
    connectionLimit : configParams.dbPoolMaxConn,
    host     : configParams.dbHost,
    port     : configParams.dbPort,
    user     : configParams.dbUser,
    password : configParams.dbPassword,
    database : configParams.dbName
});

logger.Debug('connect' , `Creating connection pool of ${configParams.dbPoolMaxConn} to connect to db ${configParams.dbName} on ${configParams.dbHost}:${configParams.dbPort}`);

// Exportar pool de conexiones
module.exports = cpool;

