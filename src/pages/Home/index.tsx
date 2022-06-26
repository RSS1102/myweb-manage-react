import React, { useEffect, useState } from "react"
import "./index.scss"
import PrimaryVisitsEcharts from '@/components/echarts/PrimaryVisitsEcharts'
import { PageHeader } from "antd"
import { CheckCircleOutlined } from "@ant-design/icons"
import { getOperation } from '@/utils/http/home/operation'
import { operationType } from '@/types/operation'
import { timeFormat } from '@/utils/format/timeFormat'
function Home() {
    const [operationSucceed, setOperationSucceed] = useState<Array<operationType>>([])
    const [operationSucceedType, setOperationSucceedType] = useState<operationType>()
    useEffect(() => {
        const getOperationFun = async () => {
            const res = await getOperation()
            let prams = res.data.map(item => {
                return {
                    ...item,
                    getGitWareDate: timeFormat(item.getGitWareDate),
                    getGitWareStatus: item.getGitWareStatus === 'success' ? 1 : -1
                }
            }).sort((a: operationType, b: operationType) => {
                return a.id - b.id
            })
            setOperationSucceed(prams)
            setOperationSucceedType(prams[prams.length - 1])
        };
        getOperationFun()

    }, [])
    return (
        <div style={{ display: 'flex', width: "100%", height: "100%", }}>
            <div style={{ width: "70%" }}>
                <PageHeader className="page-header" title={"Primary访问量"}></PageHeader>
                <PrimaryVisitsEcharts operationSucceed={operationSucceed}   ></PrimaryVisitsEcharts>
            </div>
            <div style={{ width: "30%" }} className="home-monitor">
                <PageHeader className="page-header" title={"进程监控"}></PageHeader>
                {/* 在cron启动的时候修改一个独立表记录 ，
                  * 根据当天的日期（年月日）去比较
                */}
                <div className="home-monitor-box">
                    <div>
                        <span>1,GitHub代码数据是否更新</span>
                        <span style={{
                            color: operationSucceedType?.getGitWareStatus === 1 ? 'green' : 'red'
                        }}><CheckCircleOutlined /></span>
                    </div>
                    <div>最后更新时间:{operationSucceedType?.getGitWareDate}</div>
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