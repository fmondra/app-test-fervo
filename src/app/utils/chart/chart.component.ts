import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import { IChartModel } from './chart-models';

@Component({
  selector: 'app-chart',
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements AfterViewInit {
  @ViewChild('chartContainer', { static: false }) chartContainer!: ElementRef;
  @Input() chartModel : IChartModel | undefined;

 

  ngAfterViewInit(): void {
    if(this.chartModel)
    Highcharts.chart(this.chartContainer.nativeElement, {
      chart: {
        type: 'line'
      },
      title: this.chartModel.title,
      subtitle: this.chartModel.subtitle,
      xAxis: this.chartModel?.xAxis as any,
      yAxis: this.chartModel?.yAxis as any,
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true
          },
          enableMouseTracking: true
        }
      },
      series: this.chartModel?.series as any
    });
  }
}