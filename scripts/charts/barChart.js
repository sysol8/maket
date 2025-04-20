const barChartContainer = document.getElementById('bar-chart');
const barChart = echarts.init(barChartContainer, null, {
    renderer: 'svg'
});

let option;

option = {
    xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
        type: 'value'
    },
    grid: {
        left: '7.5%',
        bottom: '10%',
        top: '15%',
        right: '5%'
    },
    series: [
        {
            name: 'New',
            data: [5, 6, 2, 4, 5, 1, 7, 8, 9, 10, 12, 11],
            type: 'bar'
        },
        {
            name: 'Renewals',
            data: [4, 3, 2, 5, 1, 8, 5, 6, 8, 10, 5, 2],
            type: 'bar'
        },
        {
            name: 'Churns',
            data: [2, 5, 6, 3, 7, 5, 7, 10, 12, 8, 9, 6],
            type: 'bar'
        }
    ]
};

window.addEventListener('resize', function() {
    barChart.resize();
});

option && barChart.setOption(option);