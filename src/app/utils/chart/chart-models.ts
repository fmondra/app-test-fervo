export interface IChartModel {
  title?: ITitle;
  subtitle?: ITitle
  xAxis?: IChartAxis;
  yAxis?: IChartAxis;
  series?: IChartSeries[];
}

export interface IChartAxis {
  title?: ITitle;
  categories?: string[];
}

export interface ITitle {
  text?: string;
  useHTML?: boolean
}

export interface IChartSeries {
  name?: string;
  type?: string;
  data?: number[] | string[];
}
