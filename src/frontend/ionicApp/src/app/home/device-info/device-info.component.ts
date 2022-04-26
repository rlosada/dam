import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendSrvService } from 'src/app/services/backendSrv/backend-srv.service';
import { RouteBuilderSrvService, ROUTE_TYPES } from 'src/app/services/routeBuilderSrv/route-builder-srv.service';
import { Device } from 'src/misc/device';
import { logDebug, logError } from 'src/misc/logger';
import { Measurement } from 'src/misc/measurement';

@Component({
  selector: 'app-device-info',
  templateUrl: './device-info.component.html',
  styleUrls: ['./device-info.component.scss'],
})
export class DeviceInfoComponent implements OnInit {

  device?: Device;
  measurement?: Measurement;
  valveOpen?: boolean;

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
      this.getInfo(deviceId).catch(reason => {
        logError(f, `Fail to get info from device with id ${deviceId} found`);
        return this.router.navigate([this.routerBuilderSrv.buildRoute()]);
      });
    });
  }

  async getInfo(deviceId: number) {
    const f = this.getInfo.name;
    // Ultima medicion
    try {
      this.measurement = await this.backendSrv.getDeviceLastMesurement(deviceId);
    } catch(e) {
      return false;
    }
    // Estado de la valvula
    try {
      const apertura = await this.backendSrv.getDeviceLastLog(deviceId);
      this.valveOpen = (apertura === 0) ? false : true;
    } catch(e) {
      return false;
    }
    return true;
  }

  routeAllMeas() {
    return this.routerBuilderSrv.buildRoute(ROUTE_TYPES.allMeas, this.device.deviceId);
  }
  routeAllRiegos() {
    return this.routerBuilderSrv.buildRoute(ROUTE_TYPES.logRiegos, this.device.deviceId);
  }

  routeDefault() {
    return this.routerBuilderSrv.buildRoute();
  }

  changeStatus() {
    this.backendSrv.changeDeviceValveStatus(this.device.deviceId);
    return this.router.navigate([this.routerBuilderSrv.buildRoute()]);
  }

}
