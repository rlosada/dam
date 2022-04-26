import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { logError, logInfo, logDebug, logWarn } from '../../../misc/logger';
import { HttpClient } from '@angular/common/http';
import { Device } from '../../../misc/device';
import { Measurement } from 'src/misc/measurement';
import { LogRiego } from 'src/misc/logriego';

@Injectable({
  providedIn: 'root'
})
export class BackendSrvService {

  private backendUrl: string = environment.backendUrl;
  private backendPort: number = environment.backendPort;
  private deviceList: Device [] = [];

  constructor(private httpClient: HttpClient) { }


  async updateDeviceList() {
    const url = this.getUrl(`${environment.ruriDevices}`);
    const f   = this.updateDeviceList.name;
    let rc: boolean;

    logDebug(f, `Trying to get device list. Executing GET ${url}`);
    try {
        const idl = await this.httpClient.get(url).toPromise();
        rc        = this.upInternalDevlist(idl);
    } catch(e) {
        logError(f, `Fail to get device list from ${url}. Error : ${e}`);
        return false;
    }
    return rc;
  }

  async getDeviceLastMesurement(deviceId:  number) {
    const url = this.getUrl(`${environment.ruriDevices}/${deviceId}/lastmeasurement`);
    const f   = this.getDeviceLastMesurement.name;

    logDebug(f, `Trying to get device with deviceId =${deviceId} last measurement. Executing GET ${url}`);

    // eslint-disable-next-line @typescript-eslint/ban-types
    const obj: Object = await this.httpClient.get(url).toPromise();
    // eslint-disable-next-line @typescript-eslint/ban-types
    const objs: Object[] = obj as Object[];

    if(objs.length === 0) {
      throw new Error(`No measurements found for the device which id is ${deviceId}`);
    }

    return new Measurement(objs[0]);
  }

  async getDeviceLastLog(deviceId:  number) {
    const url = this.getUrl(`${environment.ruriDevices}/${deviceId}/lastlogriego`);
    const f   = this.getDeviceLastLog.name;

    logDebug(f, `Trying to get device with deviceId =${deviceId} last log. Executing GET ${url}`);

    // eslint-disable-next-line @typescript-eslint/ban-types
    const obj: Object = await this.httpClient.get(url).toPromise();
    // eslint-disable-next-line @typescript-eslint/ban-types
    const objs: Object[] = obj as Object[];

    if(objs.length === 0) {
      throw new Error(`No log found for the device which id is ${deviceId}`);
    }
    const o = objs[0];
    const apertura = Number.parseInt(o["apertura"], 10);
    if(isNaN(apertura)) {
      throw new Error(`Error when reading last log for device which id is ${deviceId}`);
    }
    return apertura;
  }

  async changeDeviceValveStatus(deviceId: number) {
    const f      = this.getDeviceLastLog.name;
    const device = this.getDevice(deviceId);
    if(device === undefined) {
      return;
    }
    const url    = this.getUrl(`valves/${device.valveId}`);

    logDebug(f, `Trying to change status of valve for device with id ${deviceId}. Executing PATCH ${url}`);

    this.httpClient.patch(url, '').toPromise().catch( reason => {
      logError(f, `Fail to change status of valve of device with id ${deviceId}`);
    });
  }

  async getDeviceAllMesurement(deviceId:  number) {

    const url = this.getUrl(`${environment.ruriDevices}/${deviceId}/allmeasurements`);
    const f   = this.getDeviceAllMesurement.name;
    const measurement: Measurement[] = [];

    logDebug(f, `Trying to get device with deviceId =${deviceId} all measurement. Executing GET ${url}`);

    // eslint-disable-next-line @typescript-eslint/ban-types
    const obj: Object = await this.httpClient.get(url).toPromise();
    // eslint-disable-next-line @typescript-eslint/ban-types
    const elems: Object[] = obj as Object[];

    elems.forEach(elem => measurement.push(new Measurement(elem)));

    return measurement;
  }

  async getDeviceLogRiegos(deviceId:  number) {

    const url = this.getUrl(`${environment.ruriDevices}/${deviceId}/logsriego`);
    const f   = this.getDeviceAllMesurement.name;
    const logRiegos: LogRiego[] = [];

    logDebug(f, `Trying to get device with deviceId =${deviceId} log riegos. Executing GET ${url}`);

    // eslint-disable-next-line @typescript-eslint/ban-types
    const obj: Object = await this.httpClient.get(url).toPromise();
    // eslint-disable-next-line @typescript-eslint/ban-types
    const elems: Object[] = obj as Object[];

    elems.forEach(elem => logRiegos.push(new LogRiego(elem)));

    return logRiegos;
  }

  getDeviceList() {
    return [...this.deviceList];
  }

  getDevice(deviceId: number) {
    return this.deviceList.find((device) => device.deviceId === deviceId);
  }

  private getUrl(ruri: string) {
    return `http://${this.backendUrl}:${this.backendPort}/${ruri}`;
  }

  private upInternalDevlist(object: Object) {

        const f: string = this.upInternalDevlist.name;
        let rc = true;
        const objects:  Object[] = <Object[]> object;

        // Limpiar listado de dispositivos
        this.deviceList = [];

        logDebug(f, `Received deviceList of size ${objects.length}`);
        objects.forEach( (o,i) => logDebug(f, `Object[${i}] = ${JSON.stringify(o)}`));

        // Crear un nuevo listado
        for(let i = 0; i < objects.length; i++) {
            const device = Device.deviceFromObject(objects[i]);
            if(device === null) {
                rc = false;
                logError(f, `Fail to parse device[${i}]`);
            }
            else {
                this.deviceList.push(device);
            }
        }
        return rc;
  }
}
