
DAM TP 
=======================

## Descripcion

La aplicacion esta dividida en 3 dockers, los cuales se listan a continuacion:
1. base de datos mysql.
2. servidor backend con nodejs y express.
3. servidor frontend con proyecto en ionic. 🔍

Nota: En realidad hay un 4 docker que es el phpmyadmin pero ese aunque esta definido
en el docker-compose.yml no es estrictamente necesario para el funcionamiento.

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

1. Descargar el proyecto 
2. Modificar la IP el backend de manera de setear una IP que posea la maquina host donde se correran los docker.
   El archivo a modificar es src/frontend/ionicApp/src/environment/environment.ts. El campo es el denominado
   backendUrl.
3. Crear la imagen docker dam:1.0.0 para ello correr "docker image build -t dam:1.0.0 ." en el directorio descargado
   del repositorio.
4. Usando la consola ir hasta src/frontend/ionicApp y ejecutar "npm install" para instalar todas las dependencias.
5. Finalmente lanzar la aplicacion ejecutando "docker-compose up" en el directorio descargado del repositorio.

# Referencias
La aplicacion debia contar obligatoriamente con algunas caracteristicas. A continuacion se indican en que partes
dichas caracteristicas fueron implementadas (puede ser que una caracteristica de las pedidas sea usada en mas de 
una pero no se mencionen aqui todos los lugares)
1. Directiva : ngFor. En src/frontend/ionicApp/src/app/home/measurements/measurements.component.html.
2. Directiva : ngIf.  En src/frontend/ionicApp/src/app/home/measurements/mesurement/measurement.component.html
3. Pipe custom: titleCase. Usado en src/frontend/ionicApp/src/app/home/device/device/device.component.html. Definido en 
   src/frontend/ionicApp/src/app/home/common/pipes/
4. Directiva custom: appChButtonBackg. Usado en src/frontend/ionicApp/src/app/home/common/directives/attr. Definido en 
   src/frontend/ionicApp/src/app/home/home.page.html
