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

  // @Input() set _chartModel(chart: IChartModel){
  //   this.createChart(chart)
  // }

  @Input() chartModel : any;

  // createChart(chart: IChartModel){
  //   console.log('chartModel --> ', chart)

  //   Highcharts.chart(this.chartContainer.nativeElement, {
  //     chart: {
  //       type: 'line'
  //     },
  //     title: {
  //       text: 'Temperature media mensile'
  //     },
  //     subtitle: {
  //       text: 'Fonte: <a href="https://open-meteo.com/en/docs/historical-forecast-api" target="_blank">Open Meteo</a>',
  //       useHTML: true
  //     },
  //     // xAxis: 
  //     // {
  //     //   categories: [
  //     //     'Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set',
  //     //     'Ott', 'Nov', 'Dic'
  //     //   ]
  //     // },
  //     xAxis: chart?.xAxis as any,
  //     // yAxis: {
  //     //   title: {
  //     //     text: 'Temperatura (°C)'
  //     //   }
  //     // },
  //     yAxis: chart?.yAxis as any,
  //     plotOptions: {
  //       line: {
  //         dataLabels: {
  //           enabled: true
  //         },
  //         enableMouseTracking: true
  //       }
  //     },
  //     series: chart?.series as any
  //     // series: [{
  //     //   name: 'Reggane',
  //     //   type: 'line',
  //     //   data: [
  //     //     16.0, 18.2, 23.1, 27.9, 32.2, 36.4, 39.8, 38.4, 35.5, 29.2,
  //     //     22.0, 17.8
  //     //   ]
  //     // }, {
  //     //   name: 'Tallinn',
  //     //   type: 'line',
  //     //   data: [
  //     //     -2.9, -3.6, -0.6, 4.8, 10.2, 14.5, 17.6, 16.5, 12.0, 6.5,
  //     //     2.0, -0.9
  //     //   ]
  //     // }]
  //   });
  // }

  ngAfterViewInit(): void {

    console.log('chartModel --> ', this.chartModel)

    Highcharts.chart(this.chartContainer.nativeElement, {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Temperature media mensile'
      },
      subtitle: {
        text: 'Fonte: <a href="https://open-meteo.com/en/docs/historical-forecast-api" target="_blank">Open Meteo</a>',
        useHTML: true
      },
      // xAxis: 
      // {
      //   categories: [
      //     'Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set',
      //     'Ott', 'Nov', 'Dic'
      //   ]
      // },
      xAxis: this.chartModel?.xAxis as any,
      // yAxis: {
      //   title: {
      //     text: 'Temperatura (°C)'
      //   }
      // },
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
      // series: [{
      //   name: 'Reggane',
      //   type: 'line',
      //   data: [
      //     16.0, 18.2, 23.1, 27.9, 32.2, 36.4, 39.8, 38.4, 35.5, 29.2,
      //     22.0, 17.8
      //   ]
      // }, {
      //   name: 'Tallinn',
      //   type: 'line',
      //   data: [
      //     -2.9, -3.6, -0.6, 4.8, 10.2, 14.5, 17.6, 16.5, 12.0, 6.5,
      //     2.0, -0.9
      //   ]
      // }]
    });
  }
}