const getOrCreateLegendList = (chart, id) => {
  const legendContainer = document.getElementById(id);
  let listContainer = legendContainer.querySelector("ul");

  if (!listContainer) {
    listContainer = document.createElement("ul");
    listContainer.classList.add('legend__list');

    legendContainer.appendChild(listContainer);
  }

  return listContainer;
};

const htmlLegendPlugin = {
  id: "htmlLegend",
  afterUpdate(chart, args, options) {
    const ul = getOrCreateLegendList(chart, options.containerID);

    while (ul.firstChild) {
      ul.firstChild.remove();
    }

    const items = chart.options.plugins.legend.labels.generateLabels(chart);

    items.forEach((item) => {
      const li = document.createElement("li");
      li.classList.add('legend__list-item');

      li.onclick = () => {
        const { type } = chart.config;
        if (type === "pie" || type === "doughnut") {
          chart.toggleDataVisibility(item.index);
        } else {
          chart.setDatasetVisibility(
            item.datasetIndex,
            !chart.isDatasetVisible(item.datasetIndex)
          );
        }
        chart.update();
      };

      const boxSpan = document.createElement("span");
      boxSpan.classList.add('legend__marker');
      boxSpan.style.background = item.fillStyle;
      boxSpan.style.inlineSize = "16px";
      boxSpan.style.blockSize = "16px";

      const textContainer = document.createElement("p");
      textContainer.classList.add('list-item__text')
      textContainer.style.textDecoration = item.hidden ? "line-through" : "";

      const text = document.createTextNode(item.text);
      textContainer.appendChild(text);

      li.appendChild(boxSpan);
      li.appendChild(textContainer);
      ul.appendChild(li);
    });
  },
};

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const barChart = document.getElementById("bar-chart");

new Chart(barChart, {
  type: "bar",
  data: {
    /* labels: months, */
    datasets: [
      {
        label: "New",
        data: [12, 13, 6, 4, 4.5, 12, 10, 7, 8.5, 9, 11, 8],
        backgroundColor: [
          '#04356c'
        ]
      },
      {
        label: "IDK",
        data: [9, 3, 6, 4, 5.5, 6.5, 10, 9, 10, 12, 11, 7],
        backgroundColor: [
          '#689ad3'
        ]
      },
      {
        label: "Churns",
        data: [4, 5, 6, 6.5, 3, 2, 5, 6, 7.5, 8, 10, 11],
        backgroundColor: [
          '#0d56a6'
        ]
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        grid: {
          display: false,
        }
      },
    },
    plugins: {
      htmlLegend: {
        containerID: 'chart__legend-bar'
      },
      legend: {
        display: false,
      }
    },
  },
  plugins: [htmlLegendPlugin],
});

const doughnutChart = document.getElementById("doughnut-chart").getContext('2d');

new Chart(doughnutChart, {
  type: 'doughnut',
  data: {
    labels: [
      'Base Plan',
      'Advanced Plan',
      'Pro Plan',
      'Enterprise Plan'
    ],
    datasets: [{
      label: 'Bebra',
      data: [250, 119, 35, 56],
      backgroundColor: [
        '#4186d3',
        '#0d56a6',
        '#274f7d',
        '#04356c'
      ]
    }]
  },
  options: {
    plugins: {
      htmlLegend: {
        containerID: 'chart__legend-doughnut'
      },
      legend: {
        display: false,
      }
    }
  },
  plugins: [htmlLegendPlugin],
});
