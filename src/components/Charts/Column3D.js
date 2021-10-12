import React from "react"
import ReactFC from "react-fusioncharts"
import FusionCharts from "fusioncharts"
import Chart from "fusioncharts/fusioncharts.charts"
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion"

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme)

const ChartComponent = ({ data }) => {
  const chartConfigs = {
    type: "column3d",
    width: "100%",
    height: "400",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Most Popular",
        yAxisName: "Stars",
        yAxisNameFontSize: "14px",
        xAxisName: "Repos",
        xAxisNameFontSize: "16px",
      },
      data,
    },
  }
  return <ReactFC {...chartConfigs} />
}

// STEP 4 - Creating the DOM element to pass the react-fusioncharts component

export default ChartComponent
