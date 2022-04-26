import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
})
export class TitleComponent implements OnInit {

  @Input() title: string; // titulo mostrar
  @Input() home = false; // true si es la home. Se usa luego p/saber si poner un back-button

  constructor() { }

  ngOnInit() { }

}
