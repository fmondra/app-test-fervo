export interface IChartModel {
  xAxis?: IChartAxis;
  yAxis?: IChartAxis;
  series?: IChartSeries[];

//   constructor(data?: ChartModel) {
//     if (data) {
//       this.xAxis = data.xAxis;
//       this.yAxis = data.yAxis;
//       this.series = data.series;
//     }
//   }
}

export interface IChartAxis {
  title?: IAxisTitle;
  categories?: string[];

//   constructor(data?: ChartAxis) {
//     if (data) {
//       this.title = data.title;
//       this.categories = data.categories;
//     }
//   }
}

export interface IAxisTitle {
  text?: string;

//   constructor(data?: AxisTitle) {
//     if (data) {
//       this.text = data.text;
//     }
//   }
}

export interface IChartSeries {
  name?: string;
  type?: string;
  data?: number[] | string[];

//   constructor(data?: ChartSeries) {
//     if (data) {
//       this.name = data.name;
//       this.type = data.type;
//       this.data = data.data;
//     }
//   }
}
