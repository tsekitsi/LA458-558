var colors = ['rgb(144,200,125)', 'rgb(200,60,40)', 'rgb(67,67,72)'];
Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'GDP sector composition'
    },
    subtitle: {
        text: 'Source: <a href="https://en.wikipedia.org/wiki/List_of_countries_by_GDP_sector_composition">Wikipedia</a>'
    },
    xAxis: {
        categories: ['United States', 'China', 'Japan', 'Germany', 'United Kingdom', 'France']
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Percent of GDP'
        }
    },
    tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: {point.percentage:.0f}%<br/>',
        shared: true
    },
    plotOptions: {
        column: {
            stacking: 'percent'
        }
    },
    colors:colors,
    series: [{
        name: 'Agriculture',
        data: [1.2, 6.9, 1.2, 0.8, 0.7, 1.9]
    }, {
        name: 'Industry',
        data: [19.1, 40.2, 27.4, 28.1, 21, 18.3]
    }, {
        name: 'Services',
        data: [79.7, 52.9, 71.4, 71.1, 78.3, 79.8]
    }
    ]
});