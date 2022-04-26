import { Component } from '@angular/core';
import { BackendSrvService } from './../services/backendSrv/backend-srv.service';
import { Device } from '../../misc/device';
import { AlertController } from '@ionic/angular';
import { logError, logInfo, logDebug, logWarn } from '../../misc/logger';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  devices: Device[] = [];

  constructor(private backendSrv: BackendSrvService, private alertCtrl: AlertController) {}

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit() {
    this.reload();
  }

  createAlert(hdr: string, msg: string, btns: string[]) {
    const f = this.createAlert.name;
    logDebug(f, 'Creating alert');
    this.alertCtrl.create({
        header : hdr,
        message : msg,
        buttons : btns
    }).then(res => res.present());
  }

  reload() {
    this.backendSrv.updateDeviceList().then( rc =>
      {
        if(rc === false) {
          return this.createAlert('Error', 'Error durante la recuperacion de la lista de dispositivos', ['OK']);
        }
        this.devices = this.backendSrv.getDeviceList();
        if(this.devices.length === 0) {
          return this.createAlert('Error', 'No hay dispositivos en la base', ['OK']);
        }
    }
    );
  }
}
