import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { DeviceComponent } from './device/device/device.component';
import { HomePageRoutingModule } from './home-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { DeviceInfoComponent } from './device-info/device-info.component';
import { MeasurementsComponent } from './measurements/measurements.component';
import { LogriegosComponent } from './logriegos/logriegos.component';
import { MeasurementComponent } from './measurements/measurement/measurement/measurement.component';
import { ChButtonBckgDirective } from './common/directives/attr/ch-button-bckg.directive';
import { TitleCasePipe } from './common/pipes/title-case.pipe';
import { TitleComponent } from './common/components/title/title.component';
import { LogriegoComponent } from './logriegos/logriego/logriego/logriego.component';
import { DetalleSensorPage } from './device-info/sensor-detail/sensor-detail/sensor-detail.component';
import { BoolToStringPipe } from './common/pipes/bool-to-string.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HttpClientModule
  ],
  declarations: [
    HomePage,
    TitleComponent,
    DeviceComponent,
    DeviceInfoComponent,
    MeasurementsComponent,
    LogriegosComponent,
    LogriegoComponent,
    MeasurementComponent,
    ChButtonBckgDirective,
    TitleCasePipe,
    BoolToStringPipe,
    DetalleSensorPage,
    BoolToStringPipe]
})
export class HomePageModule {}
