/*------------------------------------------------------------------*
 * common.js														*
 *																	*
 * Historico:	07/12/2021	Primer version							*
 *																	*
 * Funciones y elementos comunes                                    *
 *------------------------------------------------------------------*/

const logger             = require("./logger");
const { dbPromiseQuery } = require('./promise')
const { StatusCode }     = require('status-code-enum');           // Incorpora constantes con los codigos HTTP 

// Funciones exportadas 
module.exports = { processQuery };


/*-----------------------------------------------------------------*
 * processQuery(query, req, res)				                    *
 *																	*
 * Entrada:		query       Instruccion SQL a ejecutar              *
 *              req         Request HTTP                            *
 *              res         Respose HTTP                            * 
 *																	*
 * Salida:		No posee                                            *
 *																	*
 * Retorno:	    No posee                                            *
 *																	*
 * Descripcion:														*
 *																	*
 * Ejecuta la quey SQL sobre la base y luego envia la respuesta     *
 * HTTP.                                                            *
 *------------------------------------------------------------------*/

 function processQuery(query, req, res)
{
   dbPromiseQuery(query)
   .then(response => { 
       res.status(StatusCode.SuccessOK);
       res.send(JSON.stringify(response)); 
   })
   .catch(err => {
       res.status(StatusCode.ServerErrorInternal).send()
   })
}