import React from "react"
import "./index.scss"
import PrimaryVisitsEcharts from '@/components/echarts/PrimaryVisitsEcharts'
import { PageHeader } from "antd"
import { CheckCircleOutlined } from "@ant-design/icons"
function Home() {

    return (
        <div style={{ display: 'flex', width: "100%", height: "100%", }}>
            <div style={{ width: "70%" }}>
                <PageHeader className="page-header" title={"Primary访问量"}></PageHeader>
                <PrimaryVisitsEcharts></PrimaryVisitsEcharts>
            </div>
            <div style={{ width: "30%" }} className="home-monitor">
                <PageHeader className="page-header" title={"进程监控"}></PageHeader>
                {/* 在cron启动的时候修改一个独立表记录 ，
                  * 根据当天的日期（年月日）去比较
                */}
                <div className="home-monitor-box">
                    <div>
                        <span>1,GitHub代码数据是否更新 </span>
                        <span style={{ color: true ? 'green' : 'balck' }}><CheckCircleOutlined /></span>
                    </div>
                    <div>最后更新时间</div>
                </div>
                {/* web最后留言时间、用户信息，留言内容 */}
                <div className="home-monitor-box">
                    <div>
                        <span>2,最后留言:</span>
                        <span >留言者</span>
                    </div>
                    <div>留言内容</div>
                    <div>最后更新时间</div>
                </div>


            </div>
        </div>
    )
}

export default Home