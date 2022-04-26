
DAM TP 
=======================

## Descripcion

La aplicacion esta dividida en 3 dockers, los cuales se listan a continuacion:
1. base de datos mysql.
2. servidor backend con nodejs y express.
3. servidor frontend con proyecto en ionic. 🔍

# API del servidor backend

Los paths aqui son relativos a http://[ip_docker_frontend]:[port]

1. Lista de dispositivos'. Path relativo: /devices/'. 
2. Ultima medicion de un dispositivo. Path relativo: '/devices/:devid/lastmeasurement' 
3. Mediciones de un dispositivo. Path relativo: '/devices/:devid/allmeasurements'
4. Logs de riego de un dispositivo. Path relativo: '/devices/:devid/logsriego'
5. Ultimo log de riego. Path relativo: '/devices/:devid/lastlogriego'          
6. Accion sobre electrovalvula. Path relativo: '/valves/:valveid'       

# Base de datos

Durante el primer inicio, al no existir la base de datos se corre el script  ./db/dumps/sistema-riego.sql.

# Aplicacion IONIC

La aplicacion IONIC esta armada de la siguiente manera:
 ```sh
src
│   environment
│   └── environment.ts      # variables de entorno a configurar antes de correr el proyecto
│   misc                        
│   └──devices.ts              # representa un dispositivo
│   └──logriego.ts             # representa un log de riego
│   └──measurement.ts          # repersenta una lectura
│   └──logger.ts               # logger
│  app
│   └──services                    
│   │    └── backendSrv          # servicio para comunicacion con el backend
│   │    └── routeBuilderSrv     # servicio para generacion de rutas internas
│   └──home                    
│       └── common              
│       │   └── components      
│       │   |     └── title     # Componente de titulo
│       │   └── directives      
|       │   |     └── attr      # Directivas de atributo      
│       │   └── pipes           # Pipes comunes
│       └── device              # Componente p/mostrar dispositivo en pagina principal
│       └── device-info         # Componentes p/mostrar dispositivo en pagina del dispositivo
│       └── logriegos           # Componentes p/mostrar los logs de riego de un dispositivo
│       └── measurements        # Componentes p/mostrar los logs de mediciones de un dispositivo
```
Nota: Por simplicidad no se listan las carpetas especificas de angular/ionic ni tampoco archivos sueltos.

# Breve explicacion del comportamiento de la aplicacion

Cuando la aplicacion carga se muestra el componente "home.page". Este hace uso de "device" para mostar
cada uno de los dispositivos.
Luego la hacer click sobre cualquiera de los dispositivos se muestra "device-info" el cual a su vez usa
"sensor-detail" para mostrar el sensor. Si se presiona el boton para cambiar el estado de la valvula, se
vuelve al "home.page" (luego de haber enviado al backend la orden de hacer el cambio). Si se presiona el 
boton para mostrar las mediciones, se muestra "measurements" que a su vez usa "measurement". Finalmente si
se presiona el boton para mostrar los logs de riego se muestra "logsriego" que a su vez utiliza "logriego".

Todas las pantallas, execpto la principal, poseen un boton para volver a la pantalla anterior para permitir
la navegacion.

#  Ejecucion
Para ejecutar la aplicacion realizar los siguientes pasos:
