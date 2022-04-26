
import { logError, logInfo, logDebug, logWarn } from './logger';

const measAttrId      = 'medicionId';
const measAttrValue   = 'valor';
const measAttrDate    = 'fecha';


export class Measurement {
  measurementId: number;
  value: number;
  date: Date;

  // eslint-disable-next-line @typescript-eslint/ban-types
  constructor(obj: Object) {

    logDebug('Measurement', `${JSON.stringify(obj)}`);

    const measurementId: number = Number.parseInt(obj[measAttrId], 10);
    if(isNaN(measurementId)) {
      throw new Error(`Device creation failed. Attribute ${measAttrId} was not found`);
    }
    const value: number = Number.parseFloat(obj[measAttrValue]);
    if(isNaN(value)) {
      throw new Error(`Device creation failed. Attribute ${measAttrValue} was not found` );
    }
    const date: Date = new Date(obj[measAttrDate]);
    if(date === undefined) {
      throw new Error(`Device creation failed. Attribute ${measAttrDate} was not found` );
    }
    this.measurementId = measurementId;
    this.value = value;
    this.date = date;

    logDebug('Measurement', `New measurement object created, ${JSON.stringify(this)}`);
  }
}
