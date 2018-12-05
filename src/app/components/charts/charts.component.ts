import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Count, HostCount } from '../../models';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  chart = [];
  currentServiceCount: Count;
  currentHostCount: HostCount;

  @Input() set counts(counts: Count) {
    if (counts) {
      this.currentServiceCount = counts;
      this.initChart();
    }
  }

  @Input() set hostcounts(counts: HostCount) {
    if (counts) {
      this.currentHostCount = counts;
      this.initHostsChart();
    }
  }

  @ViewChild('servicesCanvas') serviceCanvasRef: ElementRef;
  @ViewChild('hostsCanvas') hostsCanvasRef: ElementRef;

  constructor() { }

  ngOnInit() {

  }

  initChart(): any {
    const ctx = this.serviceCanvasRef.nativeElement.getContext('2d');
    const data = {
      datasets: [{
          data: Object.values(this.currentServiceCount),
          backgroundColor: ['#2fd132', '#f36d33', '#bd2130', '#bebaba', '#3d3c3c'],
      }],

      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: Object.keys(this.currentServiceCount)
    };

    this.chart = new Chart(ctx, {
      type: 'pie',
      data: data,
      options: {
        legend: {
          display: true
        },
      }
    });
  }

  initHostsChart(): void {

    const ctx = this.hostsCanvasRef.nativeElement.getContext('2d');
    const data = {
      datasets: [{
          data: Object.values(this.currentHostCount),
          backgroundColor: ['#2fd132', '#bd2130', '#bebaba', '#3d3c3c'],
      }],

      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: Object.keys(this.currentHostCount)
    };

    this.chart = new Chart(ctx, {
      type: 'pie',
      data: data,
      options: {
        legend: {
          display: true
        },
      }
    });
  }

}
