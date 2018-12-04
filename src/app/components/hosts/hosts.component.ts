import { Component, OnInit } from '@angular/core';
import { NagiosService } from 'src/app/services';
import { HostList, Host } from 'src/app/models';
import { HOST } from '@angular/core/src/render3/interfaces/view';
import { isNgTemplate } from '@angular/compiler';
import { Count } from 'src/app/models/count';

@Component({
  selector: 'app-hosts',
  templateUrl: './hosts.component.html',
  styleUrls: ['./hosts.component.scss']
})
export class HostsComponent implements OnInit {

  constructor(private nagios: NagiosService) { }
  hosts: any;
  services: any[] = [];
  host: Host;
  counts: Count;
  showAddNew = false;
  ngOnInit() {

    this.getServices();
    this.getCounts();

  }

  getCounts(): any {
    this.nagios.getServiceCount().subscribe((counts: any) => this.processCounts(counts));
  }

  processCounts(counts: any): void {
    this.counts = counts.data.count;
  }

  getServices() {
    this.nagios.getServices().subscribe((services: any) => this.processServices(services));
  }

  processServices(services: any): void {
    if (services) {
      const entries = Object.entries(services.data.servicelist);
      const values = Object.values(services.data.servicelist);
      const serviceList = values;
      serviceList.forEach((item, index) => {
       Object.entries(item).forEach((subitem, subindex) => {
        this.services.push(subitem[1]);
        });
      });
     this.getHosts();
    }
  }

  getHostServices(hostname: string) {
    const services = this.services.filter(x => x.host_name === hostname);
    return services;
  }

  submitNewHost() {
    this.nagios.addHost(this.host).subscribe((result: any) => this.processAddHost(result));
  }

  processAddHost(result: any): void {
    console.log(result);
  }

  getHosts() {
    this.nagios.getHosts().subscribe((hosts: any) => this.processHosts(hosts));
  }

  processHosts(hosts: any): void {
    if (hosts) {
      // const entries = Object.entries(hosts.data.hostlist);
      const values = Object.values(hosts.data.hostlist);
      this.hosts = values;
      this.hosts.forEach((item, index) => {
        item.txtStatus = item.status === 2 ? 'Up' : 'Down';
        item.services = this.getHostServices(item.name);
        item.servicePassCount = item.services.filter(x => x.status === 2).length;
        item.serviceFailCount = item.services.filter(x => x.status === 4).length;
        item.showDetails = false;
      });
    }
  }
  showDetails(host: any) {
    host.showDetails = !host.showDetails;
  }
  getStatus(status: number) {
    return status === 2 ? 'Up' : 'Down';
  }
}
