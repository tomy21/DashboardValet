import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const ChartLineDash = () => {
  // Data untuk chart
  const options = {
    chart: {
      type: "spline",
    },
    title: {
      text: "Contoh Chart Highcharts di React",
    },
    xAxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May"],
    },
    yAxis: {
      title: {
        text: "Nilai",
      },
    },
    series: [
      {
        name: "Data 1",
        data: [1, 3, 2, 4, 5],
      },
      {
        name: "Data 2",
        data: [5, 3, 4, 2, 1],
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default ChartLineDash;
