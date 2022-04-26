import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RouteBuilderSrvService, ROUTE_TYPES } from 'src/app/services/routeBuilderSrv/route-builder-srv.service';
import { Device, DeviceInterface } from 'src/misc/device';
import { logError, logInfo, logDebug, logWarn } from './../../../../misc/logger';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
})
export class DeviceComponent implements OnInit {

  @Input() device?: DeviceInterface;

  constructor(private router: Router, private routerBuilderSrv: RouteBuilderSrvService) { }

  ngOnInit() {}

  showMoreInfo() {
    return this.router.navigate([this.routerBuilderSrv.buildRoute(ROUTE_TYPES.device, this.device.deviceId)]);
  }
}
