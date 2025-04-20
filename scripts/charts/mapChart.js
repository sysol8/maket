const chartDom = document.getElementById("map-chart");
const myChart = echarts.init(chartDom);

myChart.showLoading();

const worldGeoJSONUrl =
  "https://raw.githubusercontent.com/apache/echarts-website/asf-site/examples/data/asset/geo/world.json";

fetch(worldGeoJSONUrl)
  .then((response) => response.json())
  .then((geoJson) => {
    echarts.registerMap("world", geoJson);
    myChart.hideLoading();

    const option = {
      tooltip: {
        trigger: "item",
        formatter: "{b}",
      },
      series: [
        {
          type: "map",
          map: "world",
          roam: true,
          scaleLimit: {
            min: 1,
            max: 5
          },
          layoutCenter: ['50%', '50%'],
          layoutSize: '175%',
          boundingCoords: [
            [-180, 90],
            [180, -90]
          ],
          label: {
            show: false,
          },
          emphasis: {
            label: {
              show: true,
            },
          },
        },
      ],
    };

    myChart.setOption(option);
  });
