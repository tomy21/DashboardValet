import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  defaults,
} from "chart.js";
import {
  reportDaily,
  reportMonthly,
  reportYearly,
} from "../../utils/generalApi";
import { DateTime } from "luxon";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);
defaults.maintainAspectRatio = false;
defaults.responsive = true;

const LineChart = ({ width, height, activeButton, dateFilter }) => {
  const [report, setReport] = useState();
  const [loading, setLoading] = useState(true);
  const [maxY, setMaxY] = useState(200); // Nilai awal maksimum sumbu Y

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        let formattedDate =
          DateTime.fromJSDate(dateFilter).toFormat("yyyy-MM-dd");
        let reportData;
        if (activeButton === "monthly") {
          const selectedDate = DateTime.fromJSDate(dateFilter);
          const month = selectedDate.month;
          reportData = await reportMonthly(month);
        } else if (activeButton === "yearly") {
          const selectedDate = DateTime.fromJSDate(dateFilter);
          const year = selectedDate.year;
          reportData = await reportYearly(year);
        } else {
          reportData = await reportDaily(formattedDate);
        }
        setReport(reportData.summary[1]);

        // Hitung nilai maksimum sumbu Y
        const maxTrx = reportData.summary[1].reduce(
          (max, item) => Math.max(max, item.TotalTrx),
          0
        );
        let newMaxY;
        if (maxTrx >= 100) {
          newMaxY = Math.ceil(maxTrx / 100) * 100;
        } else {
          newMaxY = maxTrx + 5;
        }
        setMaxY(newMaxY);

        setLoading(false);
      } catch (e) {
        console.error("Failed to fetch daily report:", e);
      }
    };

    fetchReport();
  }, [activeButton, dateFilter]);

  const generateChartData = () => {
    if (!report || report.length === 0) return null;

    let labels, totalIncomeData;
    if (activeButton === "yearly") {
      labels = report.map((item) => {
        // Mapping nilai bulan ke nama bulan
        const month = item.Bulan;
        const monthNames = [
          "",
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        return monthNames[month];
      });
      totalIncomeData = report.map((item) => item.TotalTrx);
    } else if (activeButton === "monthly") {
      labels = report.map((item) => item.Hari ?? item.Jam);
      totalIncomeData = report.map((item) => item.TotalTrx);
    } else {
      labels = report.map((item) => item.Jam);
      totalIncomeData = report.map((item) => item.TotalTrx);
    }
    return {
      labels: labels,
      datasets: [
        {
          label: "Total Income",
          data: totalIncomeData,
          backgroundColor: "transparent",
          borderColor: "#F26C5D",
          pointBorderColor: "transparent",
          pointBorderWidth: 4,
          tension: 0.5,
        },
      ],
    };
  };
  const options = {
    plugins: {
      legend: false,
      tooltip: {
        callbacks: {
          label: (context) => context.parsed.y + "K",
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        min: 0,
        max: maxY,
        ticks: {
          stepSize: 0,
          callback: (value) => value + "K",
        },
        grid: {
          borderDash: [20],
        },
      },
    },
  };

  const chartData = generateChartData();
  return (
    <div style={{ width: width, height: height }}>
      {loading ? ( // Tampilkan loading jika loading adalah true
        <div>Loading...</div>
      ) : chartData !== null ? (
        <Line data={chartData} options={options} />
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default LineChart;
