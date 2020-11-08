import { Component, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-what-we-do-main',
  templateUrl: './what-we-do-main.component.html',
  styleUrls: ['./what-we-do-main.component.scss', '../../../../../assets/icon/icofont/css/icofont.scss'],
    animations: [
        trigger('fadeInOutTranslate', [
            transition(':enter', [
                style({opacity: 0}),
                animate('400ms ease-in-out', style({opacity: 1}))
            ]),
            transition(':leave', [
                style({transform: 'translate(0)'}),
                animate('400ms ease-in-out', style({opacity: 0}))
            ])
        ])
    ]
})
export class WhatWeDoMainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
