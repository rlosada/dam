
/*------------------------------------------------------------------*
 * log_riegos.js													*
 *																	*
 * Historico:	14/04/2022	Primer version							*
 *																	*
 * Manipula tabla Log_Riegos                                        *
 *------------------------------------------------------------------*/

  // Funciones exportadas 
  module.exports = {processLogRiegos}

const logger                  = require('../logger');           
const { dbPromiseQuery }      = require('../promise')


const valveStates = {
    ELECTROVALVULA_OFF : 0,
    ELECTROVALVULA_ON : 1
}

  /*--------------------------------------------------------------------*
   * processLogRiegos(valveid)								            *
   *																	*
   * Entrada:		valveid     Identificador de la valvula             *
   *																	*
   * Salida:		No posee                                            *
   *																	*
   * Retorno:	    < 0   hubo algun error                              *
   *                = 0   cierro valvula                                *
   *                > 0   abro valvula                                  *
   *																	*
   * Descripcion:														*
   *																	*
   * Recupera la entrada mas nueva para la valveid en la tabla          *
   * Log_Riegos. Si no existe, inserta una con apertura = CERRADA de    *
   * lo contrario inserta una con apertura = !apertura_anterior.        *     
   *------------------------------------------------------------------*/
   async function processLogRiegos(valveid)
   {
     let query = '';
 
     // Recuperar el log de riego mas nuevo para la valvula elegida
     query = `SELECT apertura, fecha FROM Log_Riegos WHERE electrovalvulaId = ${valveid} ORDER BY fecha DESC LIMIT 1`;
     let lastLog;
     try {
         lastLog = await dbPromiseQuery(query);
     } catch(e) {
         return -1;
     }
 
     // Si no hay log de riego se asume que la valvula esta cerrada (es como se inicializa el sistema) y por lo tanto se realiza
     // un INSERT en la tabla de Log_Riegos. Si hay una entrada, entonces se agrega una nueva entrada con la fecha de hoy y con
     // el estado de la valvula opuesto al valor leido
     if(lastLog.length === 0) {
         logger.Debug(processLogRiegos.name, `No entries found for valve ${valveid}, inserting entry default on Log_Riegos`);
         query = `INSERT INTO Log_Riegos (apertura, fecha, electrovalvulaId) VALUES (${valveStates.ELECTROVALVULA_OFF}, NOW(), ${valveid});`
         try {
             await dbPromiseQuery(query);
         } catch(e) {
             return -1;
         }
     }
     else {
         let newValue;
         let newValueStr;
         if(lastLog[0].apertura === valveStates.ELECTROVALVULA_OFF) {
             newValue = valveStates.ELECTROVALVULA_ON;
             newValueStr = 'true';
         }
         else {
             newValue = valveStates.ELECTROVALVULA_OFF;
             newValueStr = 'false';
         }
         logger.Debug(processLogRiegos.name, `Adding new entry to Log_Riegos with apertura = ${newValueStr}`);
         query = `INSERT INTO Log_Riegos (apertura, fecha, electrovalvulaId) VALUES (${newValue}, NOW(), ${valveid});`
         try {
             await dbPromiseQuery(query);
         } catch(e) {
             return -1;
         }
         return (newValue === valveStates.ELECTROVALVULA_OFF) ? 0 : 1
     }
   }
 