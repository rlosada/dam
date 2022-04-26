import { logError, logInfo, logDebug, logWarn } from './logger';

const measAttrId      = 'logRiegoId';
const measAttrValue   = 'apertura';
const measAttrDate    = 'fecha';


export class LogRiego {
  measurementId: number;
  open: boolean;
  date: Date;

  // eslint-disable-next-line @typescript-eslint/ban-types
  constructor(obj: Object) {

    logDebug('LogRiego', `${JSON.stringify(obj)}`);

    const measurementId: number = Number.parseInt(obj[measAttrId], 10);
    if(isNaN(measurementId)) {
      throw new Error(`WateringLog creation failed. Attribute ${measAttrId} was not found`);
    }
    const value: number = Number.parseFloat(obj[measAttrValue]);
    if(isNaN(value)) {
      throw new Error(`WateringLog creation failed. Attribute ${measAttrValue} was not found` );
    }
    const date: Date = new Date(obj[measAttrDate]);
    if(date === undefined) {
      throw new Error(`WateringLog creation failed. Attribute ${measAttrDate} was not found` );
    }
    this.measurementId = measurementId;
    this.open = (value !== 0) ? true : false;
    this.date = date;

    logDebug('LogRiego', `New WateringLog object created, ${JSON.stringify(this)}`);
  }
}
