/*------------------------------------------------------------------*
 * index.js													        *
 *																	*
 * Historico:	09/04/2022	Primer version							*
 *																	*
 * Entry point                                                      *
 *------------------------------------------------------------------*/

var express         = require('express');
var app             = express();
const getRoutes     = require('./routes/get');
const patchRoutes   = require('./routes/patch')
const logger        = require('./logger');          
const configParams  = require('./enviroment')

// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));

app.get('/devices/', getRoutes.getAllDevices);                                    // Lista de dispositivos
app.get('/devices/:devid/lastmeasurement', getRoutes.getDeviceLastMeasurement);   // Ultima medicion de un dispositivo
app.get('/devices/:devid/allmeasurements', getRoutes.getAllDeviceMeasurements);   // Ultima medicion de un dispositivo
app.get('/devices/:devid/logsriego', getRoutes.getAllDeviceLogs);                 // Logs de riego de un dispositivo
app.patch('/valves/:valveid', patchRoutes.patchDevice);                           // Accion sobre electrovalvula       

app.listen(configParams.backListenPort, (req, res) => {
    logger.Info('main' , `NodeJS API Irrigation System up and running at port ${configParams.backListenPort}!`);
});


