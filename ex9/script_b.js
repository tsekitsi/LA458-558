Highcharts.mapChart('container', {
    chart: {
        map: 'custom/europe',
        spacingBottom: 20
    },
    title: {
        text: 'Eurozone countries'
    },
    legend: {
        enabled: true
    },
    plotOptions: {
        map: {
            allAreas: true,
            joinBy: ['iso-a2', 'code'],
            dataLabels: {
                enabled: true,
                color: '#FFFFFF',
                style: {
                    fontWeight: 'bold'
                },
                // Only show dataLabels for areas with high label rank
                format: null,
                formatter: function () {
                    if (this.point.properties && this.point.properties.labelrank.toString() < 5) {
                        console.log(this.point.properties);
                        return this.point.properties['name'];
                    }
                }
            },
            tooltip: {
                headerFormat: '',
                pointFormat: '{point.name}: <b>{series.name}</b>'
            }
        }
    },
    colors:['#00309a'],
    series: [{
        name: 'Uses the Euro',
        data: ['AT', 'BE', 'CY', 'EE', 'FI', 'FR', 'DE', 'GR', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PT', 'SK', 'SI', 'ES', ].map(function (code) {
            return { code: code };
        })
    }]
});
