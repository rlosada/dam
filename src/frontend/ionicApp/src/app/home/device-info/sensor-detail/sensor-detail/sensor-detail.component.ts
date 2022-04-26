import { Component, OnInit, Input } from '@angular/core';
import * as  Highcharts from 'highcharts';
import more from 'highcharts/highcharts-more';
import gauge from 'highcharts/modules/solid-gauge';
import { logDebug, logError } from 'src/misc/logger';

more(Highcharts);
gauge(Highcharts);

@Component({
  selector: 'app-sensor-detail',
  templateUrl: './sensor-detail.component.html',
  styleUrls: ['./sensor-detail.component.scss'],
})
export class DetalleSensorPage implements OnInit {

  @Input() value = 0;
  @Input() name:  string;
  public myChart: Highcharts.Chart;
  private chartOptions: Highcharts.Options ;

  constructor() {
    logDebug('constructor', 'DetalleSensorPage - constructor');
  }

  ngOnInit() {
    console.log('DetalleSensorPage - ngOnInit');
    this.generarChart();
  }

  ionViewDidEnter() {
    console.log('DetalleSensorPage - ionViewDidEnter');
    this.generarChart();
  }

  setChartOptions() {
    this.chartOptions = {
      chart: {
          type: 'gauge',
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false
      },
      title: {
          text: this.name
      },
      credits:{
          enabled: false
      },
      pane: {
          startAngle: -150,
          endAngle: 150
      },
      yAxis: {
        min: 0,
        max: 100,
        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',
        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 2,
            rotation: 0
        },
        title: {
            text: 'kPA'
        },
        plotBands: [{
            from: 0,
            to: 10,
            color: '#55BF3B' // green
        }, {
            from: 10,
            to: 30,
            color: '#DDDF0D' // yellow
        }, {
            from: 30,
            to: 100,
            color: '#DF5353' // red
        }]
    },
    series: [ { name: 'kPA', type : 'gauge', data: [ this.value ], tooltip: { valueSuffix: ' kPA' } } ]
    };
  }

  generarChart() {
    this.setChartOptions();
    this.myChart = Highcharts.chart('highcharts', this.chartOptions);
  }

}
