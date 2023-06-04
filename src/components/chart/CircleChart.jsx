import React, { useCallback, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, CategoryScale, Decimation, Filler, Legend, Title } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Box, Card, CardContent } from "@mui/material";
import useGetMonthlyTransaction from "../../store/useGetMonthlyTransaction";
import { useEffect } from "react";

ChartJS.register(ArcElement, CategoryScale, Decimation, Filler, Legend, Title, ChartDataLabels);

const CircleChart = () => {
  const { monthlyTx } = useGetMonthlyTransaction();
  const [dummy, setDummy] = useState([]);

  const getRandomRgb = useCallback(() => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return {
      backgroundColor: `rgb(${r}, ${g}, ${b}, 0.2)`,
      borderColot: `rgb(${r}, ${g}, ${b}, 1)`,
    };
  }, []);

  const removeZeroValues = useCallback((obj) => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] === 0) {
        delete obj[key];
      }
    }
    return obj;
  }, []);

  useEffect(() => {
    if (monthlyTx) {
      const { Diagram } = monthlyTx;
      const result = removeZeroValues(Diagram);

      setDummy(result);
    }
  }, [monthlyTx]);

  const backgroundColors = [];
  const borderColors = [];

  for (let i = 0; i < Object.keys(dummy).length; i++) {
    const { backgroundColor, boderColor } = getRandomRgb();
    backgroundColors.push(backgroundColor);
    borderColors.push(boderColor);
  }

  const data = {
    labels: Object.keys(dummy),
    datasets: [
      {
        data: Object.values(dummy),
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map((data) => {
            sum += data;
          });
          let percentage = ((value * 100) / sum).toFixed(2) + "%";
          let label = ctx.chart.data.labels[ctx.dataIndex];
          if (label.length > 10) {
            label = label.substring(0, 10) + "...";
          }
          return label + " " + percentage;
        },
        color: "#000",
      },
    },
    responsive: true,
    aspectRatio: 2, // Change this to change the size of the chart
  };

  return (
    <Card sx={{ width: "100%", overflow: "hidden" }}>
      <CardContent>
        <Box sx={{ margin: "15px" }}>
          <Pie data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default CircleChart;
