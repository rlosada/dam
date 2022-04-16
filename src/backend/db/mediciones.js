/*------------------------------------------------------------------*
 * mediciones.js													*
 *																	*
 * Historico:	14/04/2022	Primer version							*
 *																	*
 * Manipula tabla Mediciones                                        *
 *------------------------------------------------------------------*/

// Funciones exportadas 
module.exports = { insertMedicion }

const logger                  = require('../logger');          
const { dbPromiseQuery }      = require('../promise')
 

  /*--------------------------------------------------------------------*
   * insertMedicion(deviceid, value)						            *
   *																	*
   * Entrada:		valveid     Identificador de la valvula             *
   *																	*
   * Salida:		No posee                                            *
   *																	*
   * Retorno:	    < 0   hubo algun error                              *
   *                0     ok                                            *
   *																	*
   * Descripcion:														*
   *																	*
   * Inserta una nueva entrada en la tabla Mediciones                   *     
   *------------------------------------------------------------------*/

async function insertMedicion(deviceid, value)
{
    let query = `INSERT INTO Mediciones (fecha, valor, dispositivoId) VALUES (NOW(), ${value}, ${deviceid})`
    try {
        lastLog = await dbPromiseQuery(query);
    } catch(e) {
        logger.Error(insertMedicion.name, `Fail when trying to insert new entry on Mediciones for device ${deviceid}`);
        return -1;
    }    

    logger.Debug(insertMedicion.name, `New entry on Mediciones with value = ${value} for device ${deviceid} inserted`);

    return 0;
}