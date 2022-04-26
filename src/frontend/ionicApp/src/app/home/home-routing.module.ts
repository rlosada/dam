import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceInfoComponent } from './device-info/device-info.component';
import { HomePage } from './home.page';
import { LogriegosComponent } from './logriegos/logriegos.component';
import { MeasurementsComponent } from './measurements/measurements.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: ':deviceId',
    component: DeviceInfoComponent,
  },
  {
    path: ':deviceId/allmeasurements',
    component: MeasurementsComponent
  },
  {
    path: ':deviceId/logriegos',
    component: LogriegosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
