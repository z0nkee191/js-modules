const chartData = {
  labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"],
  datasets: [
    {
      label: "Продажі за останній місяць",
      data: [150, 220, 180, 200, 250, 300, 280, 350, 400, 380, 420, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350],
      backgroundColor: "#2196f3",
      borderColor: "#2196f3",
      borderWidth: 1,
    },
  ],
};

const canvas = document.getElementById("sales-chart");
if (canvas) {
  const ctx = canvas.getContext("2d");

  const chartConfig = {
    type: "line",
    data: chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index",
        intersect: false,
      },
      plugins: {
        legend: {
          display: true,
          position: "top",
          labels: {
            boxWidth: 14,
            boxHeight: 14,
            font: {
              size: 13,
              weight: "600",
              family: "'Segoe UI', system-ui, sans-serif"
            }
          }
        },
        tooltip: {
          backgroundColor: "rgba(15, 23, 42, 0.9)",
          padding: 10,
          cornerRadius: 8
        }
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: "День місяця",
            font: { size: 12, weight: "600" },
            color: "#64748b"
          },
          grid: {
            color: "#f1f5f9"
          }
        },
        y: {
          display: true,
          beginAtZero: true,
          title: {
            display: true,
            text: "Кількість продажів (од.)",
            font: { size: 12, weight: "600" },
            color: "#64748b"
          },
          grid: {
            color: "#f1f5f9"
          }
        }
      }
    }
  };

  new Chart(ctx, chartConfig);
}
