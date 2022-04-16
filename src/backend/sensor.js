
/*------------------------------------------------------------------*
 * sensor.js  													    *
 *																	*
 * Historico:	14/04/2022	Primer version							*
 *																	*
 * Simula lectura de sensor                                         *
 *------------------------------------------------------------------*/

  // Funciones exportadas 
  module.exports = {getSensorValue}

const logger = require('./logger');           

const MAX_VALUE = 60;
const MIN_VALUE = 0;
const SENSOR_RESPONSE_DELAY_MS = 1500;

  /*-----------------------------------------------------------------*
  * getSensorValue(id)									             *
  *																	 *
  * Entrada:		id       Identificador de la electrovalvula      *
  *																	 *
  * Salida:		    No posee                                         *
  *																	 *
  * Retorno:	    Promise                                          *
  *																	 *
  * Descripcion:													 *
  *																	 *
  * Devuelve una Promise con el valor simulado devuelto por el sen-  *    
  * sor.                                                             *
  *------------------------------------------------------------------*/

async function getSensorValue(id)
{   
    return new Promise((resolve, reject) => 
    {
        logger.Debug(getSensorValue.name, `Reading sensor ${id} value`);
        setTimeout(() => {
            let value = MIN_VALUE + Math.random() * MAX_VALUE;
            value = value.toFixed(2);
            logger.Debug(getSensorValue.name, `Read value ${value} Cb from sensor ${id}`);
            resolve(value)

        }, SENSOR_RESPONSE_DELAY_MS)
        
    })
}

