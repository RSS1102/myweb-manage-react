import React, { useLayoutEffect } from "react"
import * as echarts from 'echarts/core';
import { GridComponent, GridComponentOption } from 'echarts/components';
import { LineChart, LineSeriesOption } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

function PrimaryVisitsEcharts() {

    useLayoutEffect(() => {
        setTimeout(() => {
            echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);
            type EChartsOption = echarts.ComposeOption<
                GridComponentOption | LineSeriesOption
            >;
            let chartDom = document.getElementById('main')!;
            let myChart = echarts.init(chartDom);
            let option: EChartsOption;

            option = {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [150, 230, 224, 218, 135, 147, 260],
                        type: 'line'
                    },
                    {
                        data: [120, 210, 214, 211, 131, 117, 210],
                        type: 'line'
                    }
                ]
            };

            option && myChart.setOption(option);
        }, 0)
    }, [])

    return (
        <div style={{ width: "100%", height: 350, }} id="main"></div>
    )
}
export default PrimaryVisitsEcharts

