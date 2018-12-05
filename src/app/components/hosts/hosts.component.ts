import { Component, OnInit } from '@angular/core';
import { NagiosService } from 'src/app/services';
import { Host, Service, HostCount, Count } from '../../models';

@Component({
  selector: 'app-hosts',
  templateUrl: './hosts.component.html',
  styleUrls: ['./hosts.component.scss'],
})

export class HostsComponent implements OnInit {

  constructor(private nagios: NagiosService) { }

  hostsList: Host [] = [];
  hosts: any;
  servicesList: Service [] = [];
  host: Host;
  counts: Count;
  hostCounts: HostCount;
  showAddNew = false;

  ngOnInit() {

    this.getServices();
    this.getServiceCounts();
    this.getHostCounts();
  }

  getServiceCounts(): any {
    this.nagios.getServiceCount().subscribe((counts: any) => this.processCounts(counts));
  }

  getHostCounts(): any {
    this.nagios.getHostCount().subscribe((counts: any) => this.processHostCounts(counts));
  }

  processHostCounts(counts: any): void {
    this.hostCounts = counts.data.count;
  }

  processCounts(counts: any): void {
    this.counts = counts.data.count;
  }

  getServices() {
    this.nagios.getServices().subscribe((services: any) => this.processServices(services));
  }

  processServices(result: any): void {
    if (result) {
      const values = Object.values(result.data.servicelist);
      const serviceList = values;
      serviceList.forEach((item, index) => {
       Object.entries(item).forEach((subitem, subindex) => {
        // convert to service
        const service  = <Service> {
          last_check: subitem[1].last_check,
          plugin_output: subitem[1].plugin_output,
          status: subitem[1].status,
          host_name: subitem[1].host_name,
          description: subitem[1].description
        };
        // push into our service list
        this.servicesList.push(service);
        });
      });
     this.getHosts();
    }
  }

  getHostServices(hostname: string): Service [] {
    const services = this.servicesList.filter(x => x.host_name === hostname);
    return services;
  }

  submitNewHost(): void {
    this.nagios.addHost(this.host).subscribe((result: any) => this.processAddHost(result));
  }

  processAddHost(result: any): void {
    console.log(result);
  }

  getHosts(): void {
    this.nagios.getHosts().subscribe((hosts: any) => this.processHosts(hosts));
  }

  processHosts(result: any): void {

    if (result) {

      this.hosts = Object.values(result.data.hostlist);
      this.hosts.forEach((item, index) => {
        // get a list of services and attach them to the host object
        item.services = this.getHostServices(item.name);
        // convert to host
        const host  = <Host>{
          name: item.name,
          services: [] = item.services,
          servicePassCount: item.services.filter(x => x.status === 2).length,
          serviceFailCount: item.services.filter(x => x.status === 4).length,
          showDetails: false,
          last_check: item.last_check,
          plugin_output: item.plugin_output,
          status: item.status
        };
        // console.log(host);
        this.hostsList.push(host);
      });
    }
  }
}
