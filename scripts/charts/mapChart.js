const mapChartContainer = document.getElementById('map-chart');
const mapChart = echarts.init(mapChartContainer);

// Показываем загрузку, пока получаем карту
mapChart.showLoading();

// Загружаем карту мира (geoJSON)
fetch('https://geo.datav.aliyun.com/areas/bound/geojson/world.json')
  .then(response => response.json())
  .then(worldGeoJSON => {
    // Скрываем лоадер и регистрируем карту
    mapChart.hideLoading();
    echarts.registerMap('world', worldGeoJSON);

    // Опции графика
    const option = {
      title: {
        text: 'Population by Country',
        subtext: 'Example data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          return `${params.name}<br/>Population: ${params.value?.toLocaleString() ?? 'N/A'}`;
        }
      },
      visualMap: {
        min: 0,
        max: 1400000000,
        text: ['High', 'Low'],
        realtime: false,
        calculable: true,
        inRange: {
          color: ['#e0f3f8', '#abd9e9', '#74add1', '#4575b4', '#313695']
        }
      },
      series: [
        {
          name: 'Population',
          type: 'map',
          map: 'world',
          roam: true,
          emphasis: {
            label: {
              show: true
            }
          },
          data: [
            { name: 'China', value: 1412600000 },
            { name: 'India', value: 1393409038 },
            { name: 'United States', value: 331893745 },
            { name: 'Indonesia', value: 273523621 },
            { name: 'Pakistan', value: 220892331 },
            { name: 'Brazil', value: 212559409 },
            { name: 'Nigeria', value: 206139587 },
            { name: 'Bangladesh', value: 164689383 },
            { name: 'Russia', value: 145934460 },
            { name: 'Mexico', value: 128932753 }
          ]
        }
      ]
    };

    // Устанавливаем опции
    mapChart.setOption(option);
  })
  .catch(error => {
    console.error('Ошибка загрузки карты мира:', error);
    mapChart.hideLoading();
  });

