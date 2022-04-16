/*------------------------------------------------------------------*
 * get.js													        *
 *																	*
 * Historico:	09/04/2022	Primer version							*
 *																	*
 * Implementa procesamiento de los GET                              *
 *------------------------------------------------------------------*/

 // Funciones exportadas 
 module.exports = { getAllDevices, getDeviceLastMeasurement, getAllDeviceMeasurements, getAllDeviceLogs }

  const logger           = require('../logger');                  
  const { processQuery } = require('../common');
 
/*------------------------------------------------------------------*
 * getAllDevices(req, res)									        *
 *																	*
 * Entrada:		req         Request HTTP                            *
 *																	*
 * Salida:		res         Response HTTP                           *
 *																	*
 * Retorno:	    No posee                                            *
 *																	*
 * Descripcion:														*
 *																	*
 * Recupera todos los dispositivos existentes. Incluye informacion  *
 * basica de cada dispositivo.                                      *
 *------------------------------------------------------------------*/

function getAllDevices(req, res) 
{
    logger.Debug(getAllDevices.name, 'Getting device list from dB')
    query = 'SELECT * FROM Dispositivos'; 
    processQuery(query, req, res)

}

/*------------------------------------------------------------------*
 * getDeviceLastMeasurement(req, res)								*
 *																	*
 * Entrada:		req         Request HTTP                            *
 *																	*
 * Salida:		res         Response HTTP                           *
 *																	*
 * Retorno:	    No posee                                            *
 *																	*
 * Descripcion:														*
 *																	*
 * Recupera la ultima medicion del dispositivo identificado por su  *
 * id.                                                              *
 *------------------------------------------------------------------*/

function getDeviceLastMeasurement(req, res)
{
    logger.Debug(getDeviceLastMeasurement.name, `Getting last measurement for device ${req.params.devid} from dB`)
    query = `SELECT * FROM Mediciones WHERE dispositivoId = ${req.params.devid} ORDER BY fecha  DESC LIMIT 1`; 
    processQuery(query, req, res)
}

/*------------------------------------------------------------------*
 * getAllDeviceMeasurements(req, res)								*
 *																	*
 * Entrada:		req         Request HTTP                            *
 *																	*
 * Salida:		res         Response HTTP                           *
 *																	*
 * Retorno:	    No posee                                            *
 *																	*
 * Descripcion:														*
 *																	*
 * Recupera las mediciones del dispositivo identificado por su id   *
 * en orden de fecha descendente.                                   *
 *------------------------------------------------------------------*/

function getAllDeviceMeasurements(req, res)
{
    logger.Debug(getAllDeviceMeasurements.name, `Getting all measurements for device ${req.params.devid} from dB`)
    query = `SELECT * FROM Mediciones WHERE dispositivoId = ${req.params.devid} ORDER BY fecha  DESC`; 
    processQuery(query, req, res)

}


/*------------------------------------------------------------------*
 * getAllDeviceLogs(req, res)								        *
 *																	*
 * Entrada:		req         Request HTTP                            *
 *																	*
 * Salida:		res         Response HTTP                           *
 *																	*
 * Retorno:	    No posee                                            *
 *																	*
 * Descripcion:														*
 *																	*
 * Recupera los logs de riego del dispositivo identificado por su   *
 * id en orden de fecha descendente.                                *
 *------------------------------------------------------------------*/

function getAllDeviceLogs(req, res)
{
    logger.Debug(getAllDeviceLogs.name, `Getting all logs for device ${req.params.devid} from dB`)
    
    query  = ''
    query += 'SELECT Log_Riegos.* FROM Dispositivos INNER JOIN Log_Riegos ' 
    query += 'ON Dispositivos.electrovalvulaId = Log_Riegos.electrovalvulaId '
    query += `WHERE Dispositivos.dispositivoId = ${req.params.devid} `
    query += 'ORDER BY Log_Riegos.fecha DESC'

    processQuery(query, req, res)

}