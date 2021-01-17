import echarts from 'echarts'
const install = function (Vue) {
    Object.defineProperties(Vue.prototype, {
        $chart: {
            get() {
                return {
                    //画一条简单的线
                    line1: function (id) {
                        this.chart = echarts.init(document.getElementById(id));
                        this.chart.clear();

                        const optionData = {
                            legend: {},
                            tooltip: {
                                trigger: 'axis',
                                showContent: false
                            },
                            dataset: {
                                source: [
                                    ['年份', '2016', '2017', '2018', '2019', '2020', '2021'],
                                    ['用户人数', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
                                    ['订单数', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
                                    ['订单总额', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
                                    ['运输员数', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
                                ]
                            },
                            xAxis: {
                                type: 'category'
                            },
                            yAxis: {
                                gridIndex: 0
                            },
                            grid: {
                                top: '55%'
                            },
                            series: [{
                                    type: 'line',
                                    smooth: true,
                                    seriesLayoutBy: 'row'
                                },
                                {
                                    type: 'line',
                                    smooth: true,
                                    seriesLayoutBy: 'row'
                                },
                                {
                                    type: 'line',
                                    smooth: true,
                                    seriesLayoutBy: 'row'
                                },
                                {
                                    type: 'line',
                                    smooth: true,
                                    seriesLayoutBy: 'row'
                                },
                                {
                                    type: 'pie',
                                    id: 'pie',
                                    radius: '30%',
                                    center: ['50%', '25%'],
                                    label: {
                                        formatter: '{b}: {@2020} ({d}%)'
                                    },
                                    encode: {
                                        itemName: 'product',
                                        value: '2020',
                                        tooltip: '2020'
                                    }
                                }
                            ]
                        };

                        this.chart.setOption(optionData);
                    },
                }
            }
        }
    })
}

export default {
    install
}