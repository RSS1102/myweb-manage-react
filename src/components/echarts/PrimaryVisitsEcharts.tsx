import React, { useLayoutEffect } from "react"
import * as echarts from 'echarts/core';
import { GridComponent, GridComponentOption } from 'echarts/components';
import { LineChart, LineSeriesOption } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { operationType } from "@/types/operation";
import { VisualMapComponent } from 'echarts/components';
import { TitleComponent } from 'echarts/components';
import { LegendComponent } from 'echarts/components';
function PrimaryVisitsEcharts(props: { operationSucceed: Array<operationType> }) {
    console.log('PrimaryVisitsEcharts props', props)
    let { operationSucceed } = props
    useLayoutEffect(() => {
        setTimeout(() => {
            echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition, VisualMapComponent, TitleComponent, LegendComponent]);
            type EChartsOption = echarts.ComposeOption<
                GridComponentOption | LineSeriesOption
            >;
            let chartDom = document.getElementById('main')!;
            let myChart = echarts.init(chartDom);
            let option: EChartsOption;
            option = {
                xAxis: {
                    name: '运行状况',
                    type: 'category',
                    data: operationSucceed.map(item => item.getGitWareDate),
                    axisTick: {
                        show: true,
                        alignWithLabel: true,
                        interval: 0,
                        lineStyle: {
                            color: '#fff',
                            width: 1,
                            type: 'solid'
                        },
                    }
                },
                yAxis: {
                    type: 'value',
                    name: '运行状态',
                    min: -2,
                    max: 2,
                },
                visualMap: {
                    show: false,
                    type: 'piecewise',
                    seriesIndex: 0,
                    pieces: [
                        { min: -1, max: 0, color: '#ff0000' },
                        { min: 0, max: 1, color: '#0037ff' },

                    ],
                },
                title: {
                    text: '最近一周的运行状况',
                    left: 'center',
                },
                legend: {
                    show: true,
                    top: 'top',
                    left: 'right',
                    data: ['运行状态'],
                },
                series: [
                    {
                        name: '运行状态',
                        data: operationSucceed.map(item => item.getGitWareStatus),
                        type: 'line'
                    },
                ],
                grid: {
                    right: '10%',

                },
            };

            option && myChart.setOption(option);
        }, 0)

    }, [operationSucceed])

    return (
        <>
            {/* <div style={{ fontWeight: 'bold' }} >最近一周的运行状况:</div> */}
            <div style={{ width: "100%", height: 350, }} id="main"></div>
        </>
    )
}
export default PrimaryVisitsEcharts

