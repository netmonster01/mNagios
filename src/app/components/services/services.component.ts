import { Component, OnInit } from '@angular/core';
import { NagiosService } from 'src/app/services';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  constructor(private nagios: NagiosService) { }
  services: any;

  ngOnInit() {
    this.getServices();
  }
  getServices() {
    this.nagios.getServices().subscribe((services: any) => this.processServices(services));
  }

  processServices(services: any): void {
    if (services) {
      const entries = Object.entries(services.data.servicelist);
      const values = Object.values(services.data.servicelist);
      this.services = values;
      this.services.forEach((item, index) => {
       Object.values(item).forEach((subitem, subindex) => {
          console.log(subitem);
        });
      });
      console.log(values);
    }
  }
}
