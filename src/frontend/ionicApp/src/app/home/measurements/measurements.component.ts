import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BackendSrvService } from 'src/app/services/backendSrv/backend-srv.service';
import { RouteBuilderSrvService } from 'src/app/services/routeBuilderSrv/route-builder-srv.service';
import { Device } from 'src/misc/device';
import { logDebug, logError } from 'src/misc/logger';
import { Measurement } from 'src/misc/measurement';

@Component({
  selector: 'app-measurements',
  templateUrl: './measurements.component.html',
  styleUrls: ['./measurements.component.scss'],
})
export class MeasurementsComponent implements OnInit {

  device?: Device;
  measurements: Measurement[] = [];

  constructor(
    private backendSrv: BackendSrvService,
    private activatedRouteSrv: ActivatedRoute,
    private router: Router,
    private routerBuilderSrv: RouteBuilderSrvService,
    private alertCtrl: AlertController) { }

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
        this.backendSrv.getDeviceAllMesurement(deviceId).then((measurements) => {
          this.measurements = measurements;
        }).catch(reason => {
          logDebug(f, `Fail to get all measurements`);
          this.measurements = [];
        });
      });
    }
}


