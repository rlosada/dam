
/*------------------------------------------------------------------*
 * dispositivos.js													*
 *																	*
 * Historico:	14/04/2022	Primer version							*
 *																	*
 * Manipula tabla Dispositivos                                      *
 *------------------------------------------------------------------*/

  // Funciones exportadas 
  module.exports = {getDeviceFromValve}

const logger                  = require('../logger');           
const { dbPromiseQuery }      = require('../promise')


/*------------------------------------------------------------------*
 * getDeviceFromValve(valveid)								        *
 *																	*
 * Entrada:		valveid     Identificador de la valvula             *
 *																	*
 * Salida:		No posee                                            *
 *																	*
 * Retorno:	    No posee                                            *
 *																	*
 * Descripcion:														*
 *																	*
 * Recupera el identificador del dispositivo asociado a la valvula  *
 *------------------------------------------------------------------*/

async function getDeviceFromValve(valveid)
{
    let devices;

    // Recuperar el identificador del dispositivo
    let query = `SELECT dispositivoId FROM Dispositivos WHERE electrovalvulaId = ${valveid}`
    try {
        devices = await dbPromiseQuery(query);
    } catch(e) {
        return -1;
    }    
    if( devices.length !== 1) {
        logger.Error(getDeviceFromValve.name, `More than one device was assigned to valve ${valveid}`);
        return -1;
    }  
    logger.Debug(getDeviceFromValve.name, `Device ${devices[0].dispositivoId} was assigned to valve ${valveid}`);
    return devices[0].dispositivoId;
}