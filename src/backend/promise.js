
/*------------------------------------------------------------------*
 * promise.js												        *
 *																	*
 * Historico:	15/04/2022	Primer version							*
 *																	*
 * Implementa funciones auxiliares                                  *
 *------------------------------------------------------------------*/

const dbConnPool     = require('./mysql-connector');         // Manipular conexion a base de datos
const logger         = require('./logger');                  // Incorpora logger

// Funciones exportadas 
module.exports = { dbPromiseQuery }

  /*-----------------------------------------------------------------*
  * dbPromiseQuery(sql)									             *
  *																	 *
  * Entrada:		sql       Consulta SQL a realizar                *
  *																	 *
  * Salida:		    No posee                                         *
  *																	 *
  * Retorno:	    Promise                                          *
  *																	 *
  * Descripcion:													 *
  *																	 *
  * Realiza una consulta a la base y devuelve una Promise con la rta *    
  *------------------------------------------------------------------*/

  function dbPromiseQuery(sql)
  {
      let f = 'dbPromiseQuery'
      return new Promise((resolve, reject) => 
          {
              dbConnPool.query(sql, (err, rows) => {
                      logger.Debug(f, `Query database, sql = ${sql}`)
                      if(err) {
                          logger.Error(f, `Query to db FAILED, err = ${err.code}`)
                          return reject(err)
                      }
                      logger.Debug(f, `Query to db SUCCEDED`)
                      resolve(rows)
                  }
              )
          }
      )
  }