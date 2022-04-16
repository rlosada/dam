/*------------------------------------------------------------------*
 * patch.js															*
 *																	*
 * Historico:	08/12/2021	Primer version							*
 *																	*
 * Implementa procesamiento de los PATCH                            *
 *------------------------------------------------------------------*/

  // Funciones exportadas 
  module.exports = {patchDevice}

  const { StatusCode }          = require('status-code-enum');    
  const logger                  = require('../logger');           
  const { getDeviceFromValve }  = require('../db/dipositivos');
  const { processLogRiegos }    = require('../db/log_riegos');
  const { insertMedicion }      = require('../db/mediciones');
  const { getSensorValue }      = require('../sensor');
  
    
  /*------------------------------------------------------------------*
   * patchDevice(req, res)									            *
   *																	*
   * Entrada:		req         Request HTTP                            *
   *																	*
   * Salida:		res         Response HTTP                           *
   *																	*
   * Retorno:	    No posee                                            *
   *																	*
   * Descripcion:														*
   *																	*
   * Actualiza el estado de la electrovalvula si corresponde.           *
   *------------------------------------------------------------------*/
  function patchDevice(req, res)
  {
    logger.Debug(patchDevice.name, `Changing status of irrigation solenoid valve ${req.params.valveid}`)
    _pathDevice(req, res);
  }


  /*------------------------------------------------------------------*
   * _pathDevice(req, res)									            *
   *																	*
   * Entrada:		req         Request HTTP                            *
   *																	*
   * Salida:		res         Response HTTP                           *
   *																	*
   * Retorno:	    No posee                                            *
   *																	*
   * Descripcion:														*
   *																	*
   * Actualiza el estado de la electrovalvula si corresponde.           *
   *------------------------------------------------------------------*/

async function _pathDevice(req, res)
{
    let valveid = req.params.valveid;

    // Procesar la peticion sobre la tabla de Log_Riegos
    let rc = await processLogRiegos(valveid);
    if(rc < 0) {
        // Hubo algun problema
        return res.status(StatusCode.ServerErrorInternal).send()
    } else if(rc > 0) {
        // Se abrio la valvula
        res.status(StatusCode.SuccessOK);
        res.send();
        return;
    }
    
    // Se cerro la valvula, insertar una entrada en Mediciones
    // -------------------------------------------------------

    // Obtener identificador de dispositivo
    let deviceid;
    try {
        deviceid = await getDeviceFromValve(valveid)
    } catch(e) {
        res.status(StatusCode.ServerErrorInternal).send();
        res.send();
        return;
    }

    // Simular la lectura del sensor
    let value
    try {
    value = await getSensorValue(valveid);
    } catch(e) {
        res.status(StatusCode.ServerErrorInternal).send();
        res.send();
        return;
    }

    // Cargar nueva entrada en Mediciones 
    try {
        rc = await insertMedicion(deviceid, value)
    } catch(e) {
        res.status(StatusCode.ServerErrorInternal).send();
        res.send();
        return;
    }
    
    res.status(StatusCode.SuccessOK);
    res.send();
}




 