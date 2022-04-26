import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendSrvService } from 'src/app/services/backendSrv/backend-srv.service';
import { RouteBuilderSrvService } from 'src/app/services/routeBuilderSrv/route-builder-srv.service';
import { Device } from 'src/misc/device';
import { logError, logDebug } from 'src/misc/logger';
import { LogRiego } from 'src/misc/logriego';

@Component({
  selector: 'app-logriegos',
  templateUrl: './logriegos.component.html',
  styleUrls: ['./logriegos.component.scss'],
})
export class LogriegosComponent implements OnInit {

  device?: Device;
  logRiegos: LogRiego[] = [];

  constructor(
    private backendSrv: BackendSrvService,
    private activatedRouteSrv: ActivatedRoute,
    private router: Router,
    private routerBuilderSrv: RouteBuilderSrvService) { }

    ngOnInit() {
      const f = this.ngOnInit.name;

      // Recuperar de la ruta con la cual se llego hasta aqui el deviceId. Si no se puede,
      // entonces volver al /home
      this.activatedRouteSrv.paramMap.subscribe(paramMap => {
        // Extraer el deviceId de la ruta
        if(!paramMap.has('deviceId')) {
          logError(f, `Routing error`);
          return this.router.navigate([this.routerBuilderSrv.buildRoute()]);
        }
        // Recuperar del arreglo de dispositivos el dispositivo cuyo id coincide
        // con el recibido
        const deviceId = Number.parseInt(paramMap.get('deviceId'), 10);
        this.device = this.backendSrv.getDevice(deviceId);
        if(this.device === undefined) {
          logError(f, `No device with deviceId = ${deviceId} found`);
          return this.router.navigate([this.routerBuilderSrv.buildRoute()]);
        }
        // Recuperar las mediciones del dispositivo
        this.backendSrv.getDeviceLogRiegos(deviceId).then((logRiegos) => {
          this.logRiegos = logRiegos;
        }).catch(reason => {
          logDebug(f, `Fail to get all wattering logs`);
          this.logRiegos = [];
        });
      });
    }

}
