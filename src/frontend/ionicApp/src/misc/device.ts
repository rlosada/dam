import { logError, logInfo, logDebug, logWarn } from './logger';

const devAttrDeviceId = 'dispositivoId';
const devAttrName     = 'nombre';
const devAttrLocation = 'ubicacion';
const devAttrValveId  = 'electrovalvulaId';

export interface DeviceInterface {
  deviceId: number;
  name: string;
  location: string;
  valveId: number;
}


export class Device {

    deviceId: number;
    name: string;
    location: string;
    valveId: number;

    private constructor(deviceId: number, name: string, location: string, valveId: number) {
        this.deviceId = deviceId;
        this.name = name;
        this.location = location;
        this.valveId = valveId;
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    static deviceFromObject(obj: Object) {
        const f = this.deviceFromObject.name;

        const deviceId: number = Number.parseInt(obj[devAttrDeviceId], 10);
        if(deviceId === undefined) {
            logError(f, `Device creation failed. Attribute ${devAttrDeviceId} was not found` );
            return null;
        }
        const name: string = obj[devAttrName];
        if(name === undefined) {
            logError(f, `Device creation failed. Attribute ${devAttrName} was not found` );
            return null;
        }
        const location: string = obj[devAttrLocation];
        if(location === undefined) {
            logError(f, `Device creation failed. Attribute ${devAttrLocation} was not found` );
            return null;
        }
        const valveId: number = Number.parseInt(obj[devAttrValveId], 10);
        if(valveId === undefined) {
            logError(f, `Device creation failed. Attribute ${devAttrValveId} was not found` );
            return null;
        }
        logDebug(f, `Device creation succeded. {deviceId : ${deviceId}}, name : ${name}, location : ${location}, valveId : ${valveId}` );
        return new Device(deviceId, name, location, valveId);
    }
}
