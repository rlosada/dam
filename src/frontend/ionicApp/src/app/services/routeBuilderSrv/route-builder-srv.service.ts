import { Injectable } from '@angular/core';

export const ROUTE_TYPES = {
  lastMeas : 0,
  allMeas : 1,
  logRiegos : 2,
  root : 3,
  device : 4
};

@Injectable({
  providedIn: 'root'
})
export class RouteBuilderSrvService {

  constructor() { }

  buildRoute(routeType: number=ROUTE_TYPES.root, deviceId: number = 0) {
    let route = '/devices';
    switch(routeType) {
        case ROUTE_TYPES.allMeas:
          route += `/${deviceId}/allmeasurements`;
          break;
        case ROUTE_TYPES.lastMeas:
          route += `/${deviceId}/lastmeasurement`;
          break;
        case ROUTE_TYPES.logRiegos:
          route += `/${deviceId}/logriegos`;
          break;
        case ROUTE_TYPES.device:
            route += `/${deviceId}`;
            break;
    }
    return route;
  }

}
