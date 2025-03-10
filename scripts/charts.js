const barChart = document.getElementById('bar-chart')

const getOrCreateLegendList = (chart, id) => {
  const legendContainer = document.getElementById(id);
  let listContainer = legendContainer.querySelector('ul');

  if (!listContainer) {
    listContainer = document.createElement('ul');
    listContainer.style.display = 'flex';
    listContainer.style.flexDirection = 'row';
    listContainer.style.margin = 0;
    listContainer.style.padding = 0;

    legendContainer.appendChild(listContainer);
  }

  return listContainer;
};

const htmlLegendPlugin = {
  id: 'htmlLegend',
  afterUpdate(chart, args, options) {
    const ul = getOrCreateLegendList(chart, options.containerID);
    ul.classList.add('chart__legend')

    while (ul.firstChild) {
      ul.firstChild.remove();
    }

    const items = chart.options.plugins.legend.labels.generateLabels(chart);

    items.forEach(item => {
      const li = document.createElement('li');
      li.classList.add('legend__list-item');

      li.onclick = () => {
        const {type} = chart.config;
        if (type === 'pie' || type === 'doughnut') {
          chart.toggleDataVisibility(item.index);
        } else {
          chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
        }
        chart.update();
      };

      const boxSpan = document.createElement('span');
      boxSpan.classList.add('legend-item__icon')
      boxSpan.style.background = item.fillStyle;

      const textContainer = document.createElement('p');
      textContainer.classList.add('legend-item__text')
      textContainer.style.textDecoration = item.hidden ? 'line-through' : '';

      const text = document.createTextNode(item.text);
      textContainer.appendChild(text);

      li.appendChild(boxSpan);
      li.appendChild(textContainer);
      ul.appendChild(li);
    });
  }
};

new Chart(barChart, {
  type: 'bar',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Dogs',
      data: [2, 4, 1.5, 5.5, 7, 6, 3, 2.5, 4, 5, 7.5, 6],
      backgroundColor: 'rgba(120, 40, 40, 0.9)',
    },
    {
      label: 'Cats',
      data: [4, 3, 2, 5, 2.5, 3, 6, 4, 2, 1, 5, 6],
      backgroundColor: 'rgba(40, 120, 200, 0.9)',
    },
    {
      label: 'Birds',
      data: [3, 2, 5, 2.5, 4, 4.5, 6, 5, 5.5, 5, 2, 3],
      backgroundColor: 'rgba(90, 170, 200, 0.9)',
    }
  ],
  },
  options: {
    animations: false,
    scales: {
      y: {
        ticks: {
          callback: function(value) {
            if (value > 0)
              return value + 'k'
            else return value;
          }
        },
        beginAtZero: true,
      },
      x: {
        grid: {
          display: false,
        }
      }
    },
    plugins: {
      htmlLegend: {
        containerID: 'chart__legend',
      },
      legend: {
        display: false,
      }
    }
  },
  plugins: [htmlLegendPlugin]
})