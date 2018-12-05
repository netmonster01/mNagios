import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Host } from '../models';

@Injectable({
  providedIn: 'root'
})

export class NagiosService {

  constructor(private http: HttpClient) { }
  hostBase = 'https://monitor.cavitt.net';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        
    })
  };

  getHosts() {
    return this.http.get<any>('/nagios/cgi-bin/statusjson.cgi?query=hostlist&details=true',
    this.httpOptions).catch(this.handleError);
  }

  // getHosts() {
  //   return this.http.get<any>('/nagios/cgi-bin/statusjson.cgi?query=hostlist&details=true',
  //   this.httpOptions).catch(this.handleError).map(function(res) {
  //     return <Host> res.json();
  //   });
  // }

  getServices() {
    return this.http.get<any>('/nagios/cgi-bin/statusjson.cgi?query=servicelist&details=true',
    this.httpOptions).catch(this.handleError);
  }

  getHost(host: string) {
    return this.http.get<any>('/nagios/cgi-bin/statusjson.cgi?query=host&hostname=' + host,
    this.httpOptions).catch(this.handleError);
  }

  getHostCount() {
    return this.http.get<any>('/nagios/cgi-bin/statusjson.cgi?query=hostcount',
    this.httpOptions).catch(this.handleError);
  }

  getServiceCount() {
    return this.http.get<any>('/nagios/cgi-bin/statusjson.cgi?query=servicecount',
    this.httpOptions).catch(this.handleError);
  }

  getPerformanceData() {
    return this.http.get<any>('/nagios/cgi-bin/statusjson.cgi?query=performancedata',
    this.httpOptions).catch(this.handleError);
  }

  getProgramStatus() {
    return this.http.get<any>('/nagios/cgi-bin/statusjson.cgi?query=programstatus',
    this.httpOptions).catch(this.handleError);
  }

  getDowntimeList() {
    return this.http.get<any>('/nagios/cgi-bin/statusjson.cgi?query=downtimelist&details=true',
    this.httpOptions).catch(this.handleError);
  }

  addHost(host: Host) {
    return this.http.get<any>('/nagios/cgi-bin/addHost1.py?host_name=' + host.hostName + '&ip_address=' + host.ipAddress,
    this.httpOptions).catch(this.handleError);
  }

  handleError(handleError: any): any {
    console.log(handleError);
  }
}
