import { Component, OnInit, Input } from '@angular/core';
import { Host } from '../../../models';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-host',
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.5,
        backgroundColor: 'green'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.scss']
})

export class HostComponent implements OnInit {
  isOpen = false;
  currentHost = <Host>{};

  @Input() set host(host: Host) {
    this.currentHost = host;
  }

  constructor() { }

  ngOnInit() {
  }

  showDetails(host: Host) {
    host.showDetails = !host.showDetails;
    // this.isOpen = !this.isOpen;
  }
}
