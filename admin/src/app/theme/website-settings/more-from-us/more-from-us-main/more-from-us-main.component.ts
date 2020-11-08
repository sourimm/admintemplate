import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-more-from-us-main',
  templateUrl: './more-from-us-main.component.html',
  styleUrls: ['./more-from-us-main.component.scss', '../../../../../assets/icon/icofont/css/icofont.scss'],
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
export class MoreFromUsMainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
