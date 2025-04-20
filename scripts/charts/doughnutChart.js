const doughnutChartContainer = document.getElementById('doughnut-chart');
const doughnutChart = echarts.init(doughnutChartContainer, null, {
    renderer: 'canvas'
});

let option;

option = {
  title: {
    text: 'Sales',
    padding: 0,
    top: '52.5%',
    left: 'center'
  },
  color: ['#ff7373', '#fa0', '#d22828', '#689ad3'],
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: 'bottom',
    left: 'center',
    padding: 0,
    
  },
  radius: ['70%', '80%'],
  series: [
    {
      name: 'Sales',
      type: 'pie',
      radius: ['80%', '50%'],
      center: ['50%', '45%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold',
          formatter: '{c}'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: 'Base Plan' },
        { value: 735, name: 'Advanced Plan' },
        { value: 580, name: 'Pro Plan' },
        { value: 484, name: 'Enterprise Plan' },
      ]
    }
  ]
};

window.addEventListener('resize', function() {
    doughnutChart.resize();
});

option && doughnutChart.setOption(option);