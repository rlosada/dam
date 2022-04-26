import { Component, Input, OnInit } from '@angular/core';
import { LogRiego } from 'src/misc/logriego';

@Component({
  selector: 'app-logriego',
  templateUrl: './logriego.component.html',
  styleUrls: ['./logriego.component.scss'],
})
export class LogriegoComponent implements OnInit {


  @Input() logRiego: LogRiego;

  @Input()  index: number;

  constructor() { }

  ngOnInit() {}

}
