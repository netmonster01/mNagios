import { Component, OnInit, Input } from '@angular/core';
import { Service } from 'src/app/models';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  currentService = <Service>{};
  currentIndex = 0;

  @Input() set service(service: Service) {

    this.currentService = service;
  }
  @Input() set index(index: number) {

    this.currentIndex = index;
  }
  constructor() { }


  ngOnInit() {
  }

}
